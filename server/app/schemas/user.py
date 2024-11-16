from pydantic import BaseModel, EmailStr
from typing import Optional

class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None
  

class UserCreate(UserBase):
    password: str 

class UserInDB(UserBase):
    id: str
    password: str 

    class Config:
        
        json_encoders = {
            str: str  
        }

