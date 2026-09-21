from fastapi import APIRouter, Path, Query, Depends
import re
from .api_models import StudentModel, StudentModelCreate, CourseModel, EnrollmentModel, LoginDetails
from .database_models import StudentSchema, CourseSchema
from database import get_db
from sqlalchemy.orm import Session
from typing import List
from .supabase_client import supabase_client


studentRouter = APIRouter(prefix="/api/students", tags=["students"])

#Getting students from the database
@studentRouter.get("/all_students", response_model=List[StudentModel]) # Should it return a list of StudentSchema as it is modeled in the database.
def all_students(db: Session = Depends(get_db)):

    # Get all students from the postgresdb
    all_students = db.query(StudentSchema).all() #I am testing getting students with supabase

    # response = (

    #             supabase_client.table("students")
    #             .select("*")
    #             .execute()

    #         )

    return all_students

@studentRouter.get("/students/{student_id}", response_model=StudentModel)
def specific_student(student_id:int, db: Session = Depends(get_db)):
    student = db.query(StudentSchema).filter(StudentSchema.id == student_id).first()
    return student


#Creating a new student
@studentRouter.post("/create_student")
def create_student(student: StudentModelCreate, db: Session = Depends(get_db)):

    # Validating input again and making custom error messages for each field
    if not student.first_name or not isinstance(student.first_name, str):
        return {"status":"error", "message": "Invalid first name. Name must be a non-empty string."}

    if not student.last_name or not isinstance(student.last_name, str):
            return {"status":"error", "message": "Invalid last name. Name must be a non-empty string."}

    if not student.email or not isinstance(student.email, str):
        return {"status":"error", "message": "Invalid email. Email must be a non-empty string."}

    if not student.age or not isinstance(student.age, int) or student.age <= 0:
        return {"status":"error", "message": "Invalid age. Age must be a positive integer."}

    if not student.department or not isinstance(student.department, str):
        return {"status":"error", "message": "Invalid department. Department must be a non-empty string."}

    if not student.level or not isinstance(student.level, int) or student.level <= 0:
        return {"status":"error", "message": "Invalid level. Level must be a positive integer."}

    if db.query(StudentSchema).filter(StudentSchema.email == student.email).first():
        return {"status":"error", "message": "Email already exists. Please use a different email."}

    new_student = StudentSchema(
        first_name=student.first_name,
        last_name=student.last_name,
        age=student.age,
        department=student.department,
        level=student.level,
        email=student.email,
        password_hashed=student.password
    )

    db.add(new_student)
    db.commit()
    db.refresh(new_student)

    return {"status": "successful",
            "message":"Student created successfully",
        "id": new_student.id, #Returns data that was generated automatically by the database and not provided by the user. This is important because the user might want to know what the unique_user_id and matric_no are for the student they just created.
        "unique_user_id": new_student.unique_user_id,
        "matric_no": new_student.matric_no,}

@studentRouter.post("/login")
def login_student(login_details: LoginDetails, db: Session = Depends(get_db)):
    identifier = login_details.matricNumberOrEmail
    password = login_details.password

    if not identifier or not password:
        return {"status": "error", "message": "Please provide both login identifier and password"}

    # Regex to check if the identifier is an email
    email_regex = r'^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$'

    if re.match(email_regex, identifier):
        # Search by email
        user = db.query(StudentSchema).filter(StudentSchema.email == identifier).first()
        id_type = "email"
    else:
        # Search by matric number
        user = db.query(StudentSchema).filter(StudentSchema.matric_no == identifier).first()
        id_type = "matric_no"

    if not user:
        return {"status": "error", "message": f"No student found with the provided {id_type}"}

    # In a real app, you would use pwd_context.verify(password, user.password_hashed)
    # For now, we compare plain text for your testing phase
    if user.password_hashed != password:
        return {"status": "error", "message": "Incorrect password"}

    return {
        "status": "successful",
        "message": "Login successful",
        "user": {
            "id": user.id,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "department": user.department,
            "level": user.level,
            "age": user.age,
            "matric_no": user.matric_no,
            "unique_user_id":user.unique_user_id
        }
    }
