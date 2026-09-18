from fastapi import FastAPI, Path, Query
from fastapi.middleware.cors import CORSMiddleware
from typing import Optional
from enum import Enum
from backend.students.routes import studentRouter
from backend.students.database_models import StudentSchema, CourseSchema
from database import Base, engine



app = FastAPI() 

app.include_router(studentRouter)


origins = [
    "http://localhost:5173/"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
#Create tables in the database if they don't exist
Base.metadata.create_all(bind=engine)