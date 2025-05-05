# Sustainable Intelligence Platform

This intelligent web platform predicts carbon footprint and renewable energy usage in the agri-food sector. It integrates machine learning and deep learning models with a modern Angular-based user interface.


## Technologies Used

| Component        | Technology                  |
| ---------------- | --------------------------- |
| Frontend         | Angular                     |
| Backend (ML)     | Flask                       |
| Authentication   | FastAPI                     |
| Machine Learning | Random Forest, Scikit-learn |
| Deep Learning    | Keras / TensorFlow          |
| Chatbot API      | Gemini (Google AI)          |
| Database         | PostgreSQL                  |


## Features

- Secure authentication using FastAPI
- Carbon footprint prediction via a user-friendly form
- Renewable energy percentage prediction
- Image-based prediction using deep learning
- Interactive dashboards
- Chatbot integration with Gemini API

## Local Installation Guide

## Clone the repository

git clone https://github.com/ton-utilisateur/ton-projet.git

## Backend (Flask - Model Deployment)

cd Backend
pip install -r requirements.txt
python app.py

http://localhost:5000

## Backend (FastAPI - User Authentication)

cd Backend
uvicorn main:app --reload

http://127.0.0.1:8000

##Frontend (Angular)

cd Frontend
npm install
ng serve

http://localhost:4200
