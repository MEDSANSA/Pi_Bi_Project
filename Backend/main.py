from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import auth_routes

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(auth_routes.router, prefix="/auth")

@app.get("/")
def home():
    return {"message": "FastAPI is running"}