@echo off
echo === Activating virtual environment ===
call venv\Scripts\activate

echo === Starting FastAPI server ===
python -m uvicorn main:app --reload

pause