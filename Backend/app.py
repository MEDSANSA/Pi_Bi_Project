#!C:\Python311
import requests
from flask import Flask, jsonify, request
import joblib
import numpy as np
from tensorflow.keras.models import load_model
from PIL import Image
import io
from flask_cors import CORS
import pickle
import traceback
import pandas as pd

app = Flask(__name__)
CORS(app)

DL_Model = load_model('models/best_model.h5')
Regression_Model = load_model('models/best_model_regression.h5', compile=False)

with open('models/Randomforest_Model.pkl', 'rb') as f:
    Randomforest_model = pickle.load(f)

with open('models/Randomforest_scaler.pkl', 'rb') as f:
    Randomforest_scaler = pickle.load(f)
    
with open('models/RandomForestRegressor.pkl', 'rb') as f:
    RandomForestRegressor = pickle.load(f)
    
with open('models/RandomForestEncoder.pkl', 'rb') as f:
    RandomForestEncoder = pickle.load(f)

product_names = [
'amidon','aromes','beurre','beurre de cacao','chocolat en poudre','concentre de fraise','colorant alimentaire','creme pasteurisee','eaux demineralisee','extrait de vanille',
'ferments lactique','fromage rape','fruits melange','lait frais entier','levure seche','poudre de lait ecreme','sel iode','sirop de glucose','stabilisants','sucre',]

@app.route("/")
def home():
    return "Hello world 🚀"

def preprocess_image(image_bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert('RGB')
    image = image.resize((224, 224))
    image = np.array(image) / 255.0  # Normaliser [0,1]
    image = np.expand_dims(image, axis=0)  # (1, 224, 224, 3)
    return image

@app.route('/predict_image', methods=['POST'])
def predict_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    image_bytes = file.read()
    processed_image = preprocess_image(image_bytes)

    prediction = DL_Model.predict(processed_image)
    predicted_index = int(np.argmax(prediction))
    predicted_class_name = product_names[predicted_index]
    carbon_footprint = Regression_Model.predict(processed_image)[0][0]

    return jsonify({
        'prediction': predicted_class_name,
        'carbon_footprint': round(float(carbon_footprint), 3)
    })

@app.route('/predict_carbon_footprint', methods=['POST'])
def predict():
    data = request.json
    features = np.array(data['features']).reshape(1, -1)
    features_scaled = Randomforest_scaler.transform(features)
    prediction = Randomforest_model.predict(features_scaled)
    return jsonify({'prediction': prediction[0]})

@app.route('/predict_energy', methods=['POST'])
def predict_energy():
    data = request.json
    
    try:
        transport = data['Transport_Type']
        certif = data['Environmental_Certifications']
        state = data['State']
        region = data['Region']
        country = data['Country']
        co2 = float(data['Carbon_Footprint_per_Unit_kgCO2e'])
        water = float(data['Water_Consumption_per_Unit_liters'])
        program = int(data['Sustainability_Program'])

        categorical_input = pd.DataFrame([{
            'Transport_Type': transport,
            'Environmental_Certifications': certif,
            'State': state,
            'Region': region,
            'Country': country
        }])
        encoded = RandomForestEncoder.transform(categorical_input)

        numeric_input = np.array([[co2, water, program]])
        X_input = np.hstack((encoded, numeric_input))
        prediction = RandomForestRegressor.predict(X_input)[0]

        return jsonify({'renewable_energy_percentage': round(float(prediction), 2)})

    except Exception as e:
        print("Error:", traceback.format_exc())
        return jsonify({'error': str(e)}), 400
    
    
@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    gemini_response = get_gemini_response(user_message)
    return jsonify({'response': gemini_response})

import requests

def get_gemini_response(user_message):
    gemini_api_url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyCyMyHJLwMyRp3qmyO8jpt4VJhRNBToxUw"
    
    payload = {
        "contents": [
            {
                "parts": [
                    {"text": user_message}
                ]
            }
        ]
    }

    try:
        response = requests.post(gemini_api_url, json=payload)
        if response.status_code != 200:
            return "Une erreur s'est produite avec l'API Gemini."
        
        response_data = response.json()

        if 'candidates' in response_data and len(response_data['candidates']) > 0:
            response_text = response_data['candidates'][0]['content']['parts'][0].get('text', '')
            if response_text:
                return response_text
            else:
                return "Je ne peux pas répondre à cette question pour l'instant."
        else:
            return "Je ne peux pas répondre à cette question pour l'instant."

    except Exception as e:
        print(f"Erreur lors de l'appel à l'API : {e}")
        return "Une erreur s'est produite lors de l'appel à l'API Gemini."


if __name__ == "__main__":
    app.run(debug=True)
