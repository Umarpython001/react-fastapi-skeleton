# Skeleton Stack: FastAPI + React

A professional, reusable skeleton for rapid project development.

## Architecture
- **Backend**: FastAPI (Python)
- **Frontend**: React + TypeScript + Vite
- **Database**: SQLite (demo.db)

## Project Structure
- `/backend`: FastAPI application logic, models, and routes.
- `/frontend`: React frontend application.

## Setup

### Backend
1. Create a virtual environment: `python -m venv venv`
2. Activate environment: `venv\Scripts\activate` (Windows) or `source venv/bin/activate` (Unix)
3. Install dependencies: `pip install -r requirements.txt`
4. Run server: `uvicorn main:app --reload`

### Frontend
1. Navigate to frontend: `cd frontend`
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
