from fastapi import APIRouter, Path, Query, Depends 
from .api_models import StudentSchema, CourseSchema, EnrollmentSchema
from .database_models import StudentDB, CourseDB
from database import get_db
from sqlalchemy.orm import Session
from typing import List


studentRouter = APIRouter(prefix="/api/students", tags=["students"])

#Getting students from the database
@studentRouter.get("/all_students", response_model=List[StudentSchema]) # Should it return a list of StudentDB or StudentSchema!? I think it should be the schema because this is an API thing and the API should return student based on pydantic models
def all_students(db: Session = Depends(get_db)):

    all_students = db.query(StudentDB).all() 

    return all_students

@studentRouter.get("/students/{student_id}", response_model=StudentSchema) 
def specific_student(student_id:int, db: Session = Depends(get_db)):
    student = db.query(StudentDB).filter(StudentDB.id == student_id).first()
    return student


#Creating a new student
@studentRouter.post("/create_student")
def create_student(student: StudentSchema, db: Session = Depends(get_db)):

    # Validating input again and making custom error messages for each field
    if not student.name or not isinstance(student.name, str):
        return {"error": "Invalid name. Name must be a non-empty string."}

    if not student.email or not isinstance(student.email, str):
        return {"error": "Invalid email. Email must be a non-empty string."}

    if not student.age or not isinstance(student.age, int) or student.age <= 0:
        return {"error": "Invalid age. Age must be a positive integer."}

    if not student.department or not isinstance(student.department, str):
        return {"error": "Invalid department. Department must be a non-empty string."}

    if not student.level or not isinstance(student.level, int) or student.level <= 0:
        return {"error": "Invalid level. Level must be a positive integer."}

    if db.query(StudentDB).filter(StudentDB.email == student.email).first():
        return {"error": "Email already exists. Please use a different email."}

    new_student = StudentDB(
        name=student.name,
        age=student.age,
        department=student.department,
        level=student.level,
        email=student.email
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {"id": new_student.id, #Returns data that was generated automatically by the database and not provided by the user. This is important because the user might want to know what the unique_user_id and matric_no are for the student they just created.
            "unique_user_id": new_student.unique_user_id,
            "matric_no": new_student.matric_no,}