import uuid
from pydantic import BaseModel



class StudentModel(BaseModel):
    id:int
    first_name : str
    last_name : str
    age : int 
    department : str
    level : int
    email : str 
    matric_no : str
    unique_user_id:str


    model_config = {
        "from_attributes": True
    }


class LoginDetails(BaseModel):
    password: str
    matricNumberOrEmail :str


class StudentModelCreate(BaseModel):
    first_name : str
    last_name : str
    age : int 
    department : str
    level : int
    email : str 
    password : str

    model_config = {
        "from_attributes": True
    }


class CourseModel(BaseModel):
    name : str
    code : str
    unit : int
    lecturer : str
    

class EnrollmentModel(BaseModel):
    semester : int
    score : int

    model_config = {
        "from_attributes": True
    }