# auth/schemas.py
from ninja import Schema
from typing import Optional
from datetime import datetime

class UserSchema(Schema):
    id: int
    email: str
    full_name: str
    username: str


    class Config:
        from_attributes = True  # Enables ORM mode for Pydantic v2 (equivalent to `orm_mode = True` in Pydantic v1)
        
class UserSignInSchema(Schema):
    email: str
    password: str



class UserSignUpSchema(Schema):
    email: str
    password: str
    full_name: str

class TokenSchema(Schema):
    access_token: str
    token_type: str
    
    
class ErrorSchema(Schema):
    detail: str
    

class CourseSchema(Schema):
    id: int
    name: str
    slug: str
    description: str
    status: str
    created_at: str
    updated_at: str

    class Config:
        from_attributes = True

    @classmethod
    def from_orm(cls, obj):
        # Create a new dict that will be used to create the model instance
        data = {}
        for field in cls.__fields__.values():
            name = field.alias
            value = getattr(obj, name)
            
            # Convert datetime objects to string
            if name in ["created_at", "updated_at"] and isinstance(value, datetime):
                value = value.isoformat()
                
            data[name] = value
        return cls(**data)
