from sqlalchemy import create_engine, text
from sqlalchemy.orm import sessionmaker
from config import DATABASE_URL

engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
session = SessionLocal()

result = session.execute(text('SELECT 1'))
print(result.fetchone())

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
