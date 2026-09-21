# 🚀 Full-Stack Skeleton: React + FastAPI + Supabase

A high-performance, reusable boilerplate designed for rapid prototyping. This skeleton eliminates the "setup fatigue" by providing a pre-configured authentication flow, global state management, and a cloud-database integration.

## 🛠️ Tech Stack
- **Frontend**: React 18 + TypeScript + Vite + Tailwind CSS/Bootstrap
- **Backend**: FastAPI (Python 3.10+)
- **Database & Auth**: Supabase (PostgreSQL + Supabase Auth)
- **State Management**: React Context API

## 🏗️ Architecture
- **Frontend**: Handles UI and interacts with Supabase Auth for session management and FastAPI for business logic.
- **Backend**: Acts as a secure middleware for data processing and custom API endpoints.
- **Database**: Supabase provides a managed PostgreSQL instance with real-time capabilities.

## 📂 Project Structure
- `/backend`: FastAPI application logic, Pydantic models, and API routes.
- `/frontend`: React application, including global context for Auth and API services.

## 🚀 Quick Start

### 1. Supabase Setup
1. Create a project at [supabase.com](https://supabase.com).
2. Copy your `SUPABASE_URL` and `SUPABASE_ANON_KEY` from the project settings.
3. Create your database tables (e.g., `students`) in the Supabase SQL Editor.

### 2. Backend Setup
```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate 
# Unix:
source venv/bin/activate

pip install -r requirements.txt
# Create a .env file and add:
# SUPABASE_URL=your_url
# SUPABASE_KEY=your_key

uvicorn main:app --reload
```

### 3. Frontend Setup
```bash
cd frontend
npm install
# Create a .env file and add:
# VITE_SUPABASE_URL=your_url
# VITE_SUPABASE_ANON_KEY=your_key

npm run dev
```

## 🔑 Key Features Included
- ✅ **Global Auth Context**: Persistent user sessions using Supabase Auth.
- ✅ **Protected Routes**: Logic to prevent unauthenticated access to dashboards.
- ✅ **API Wrapper**: Pre-configured Axios/Fetch instance for seamless backend communication.
- ✅ **Responsive UI**: Clean, professional layout ready for custom components.

---
*Built to be cloned, modified, and deployed. Just change the env variables and start building your logic.*
