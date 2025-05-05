from sqlalchemy import Column, Integer, String
from database import engine
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(150), unique=True, index=True)
    email = Column(String(150), unique=True, index=True)
    password = Column(String(150))
    role = Column(String(150))

# Base.metadata.drop_all(bind=engine)
Base.metadata.create_all(bind=engine)
