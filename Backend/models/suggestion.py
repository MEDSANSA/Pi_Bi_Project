import pickle
from flask import Flask, jsonify, request
import numpy as np

app = Flask(__name__)

#with open("model/model.pkl", "rb") as f:
    #model = pickle.load(f)

@app.route('/predict', methods=['POST'])
def predict():
    file = request.files['file']
    image = Image.open(file)
    
    # Prétraitement (adapter à ton modèle)
    img_array = np.array(image.resize((224, 224))) / 255.0
    img_array = np.expand_dims(img_array, axis=0)

    prediction = model.predict(img_array)
    return jsonify({'prediction': prediction.tolist()})
