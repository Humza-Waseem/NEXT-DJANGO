# auth/schemas.py
from ninja import Schema
from typing import Optional

class UserSchema(Schema):
    id: int
    email: str
    full_name: str
    username: str

    class Config:
        from_attributes = True  # Enables ORM mode for Pydantic v2 (equivalent to `orm_mode = True` in Pydantic v1)
        
class UserSignIn(Schema):
    email: str
    password: str

class UserSignUp(Schema):
    email: str
    password: str
    full_name: str

class TokenSchema(Schema):
    access_token: str
    token_type: str
    
    
class ErrorSchema(Schema):
    detail: str
    
