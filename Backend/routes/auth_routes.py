from fastapi import FastAPI, Depends, HTTPException, APIRouter, Response, Cookie
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from auth import hash_password, verify_password
from pydantic import BaseModel
from sqlalchemy import text
from fastapi.responses import JSONResponse
from typing import Optional

router = APIRouter()

class UserCreate(BaseModel):
    username: str
    email: str
    password: str
    role: str

class UserLogin(BaseModel):
    username: str
    password: str

@router.get("/test_db")
def test_db(db: Session = Depends(get_db)):
    result = db.execute(text('SELECT 1'))
    return {"result": result.fetchone()[0]}

def create_session_cookie(response: Response, username: str):
    response.set_cookie(
        key="session_id", 
        value=username, 
        httponly=True, 
        secure=True,
        samesite="Lax",
        max_age=3600)

def get_current_user(session_id: Optional[str] = Cookie(default=None), db: Session = Depends(get_db)):
    if not session_id:
        raise HTTPException(status_code=401, detail="Non authentifié")
    
    user = db.query(User).filter(User.username == session_id).first()
    if not user:
        raise HTTPException(status_code=401, detail="Utilisateur invalide")
    return user

@router.post("/register")
def register(user: UserCreate, db: Session = Depends(get_db)):
    existing = db.query(User).filter(User.email == user.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email déjà utilisé")

    hashed_pwd = hash_password(user.password)
    new_user = User(username=user.username, email=user.email, password=hashed_pwd, role=user.role)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "Utilisateur créé", "user_id": new_user.id}

@router.post("/login")
def login(user: UserLogin, response: Response, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.username == user.username).first()
    if not db_user or not verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Identifiants invalides")
    
    create_session_cookie(response, db_user.username)
    return {"message": "Connexion réussie", "username": db_user.username, "role": db_user.role}

@router.get("/logout")
def logout(response: Response):
    response.delete_cookie("session_id")
    return {"message": "Déconnexion réussie"}

@router.get("/users")
def list_users(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    users = db.query(User).all()
    return [{"id": u.id, "username": u.username, "email": u.email} for u in users]
