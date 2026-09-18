from sqlalchemy import Column, Integer, String
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import Mapped
from database import Base
import uuid
import random   

def generate_matric_no():
    ans = ""

    for i in range(10):
        ans += str(random.randint(0, 9))

    return ans

class StudentSchema(Base):
    __tablename__ = "students"

    id = Column(Integer, primary_key=True, index=True, unique=True)
    name = Column(String)
    age = Column(Integer)
    department = Column(String)
    level = Column(Integer)
    email = Column(String, unique=True, index=True)
    unique_user_id = Column(String, default=lambda: str(uuid.uuid4())) #Will be created automatically when a new student is created. This will be used to identify the student uniquely across the system. It will be a UUID string.
    matric_no = Column(String, unique=True, index=True, default=lambda: generate_matric_no()) #Will be created automatically when a new student is created. 
    password_hashed = Column(String, nullable=False, )


class CourseSchema(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    code = Column(String, unique=True, index=True)
    unit = Column(Integer)
    lecturer = Column(String)