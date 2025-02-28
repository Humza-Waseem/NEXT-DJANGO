# auth/api.py
from ninja import Router
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password, check_password
from .schemas import UserSignInSchema, UserSignUpSchema, TokenSchema, UserSchema, ErrorSchema, CourseSchema
from .utils import create_access_token
from datetime import timedelta
from .models import User, Course
from datetime import datetime
import jwt
from django.conf import settings


from ninja_jwt.controller import NinjaJWTDefaultController # type: ignore
from ninja_extra import NinjaExtraAPI
from ninja_jwt.authentication import JWTAuth

#import ninja api
from ninja import NinjaAPI
from django.shortcuts import get_object_or_404


api = NinjaExtraAPI()

api.register_controllers(NinjaJWTDefaultController)



User = get_user_model()
@api.get("/me", response=UserSchema,auth=JWTAuth())
def me(request):
    return request.user



@api.post("/signup", response=TokenSchema)
def signup(request, user_data: UserSignUpSchema):
    user = User.objects.create(
        email=user_data.email,
        password=make_password(user_data.password),
        full_name=user_data.full_name,
        username=user_data.email
    )

    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=30)
    )

    response = TokenSchema(access_token=access_token, token_type="bearer")
    print("Returning Response:", response.dict())  # ✅ Debugging

    return response










# Token creation utility
def create_access_token(data: dict, expires_delta: timedelta):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, settings.SECRET_KEY, algorithm="HS256")
    return encoded_jwt


@api.post("/signin/", response={200: TokenSchema, 401: ErrorSchema}, url_name="signin")
def signin(request, user_data: UserSignInSchema):
    print("Received email:", user_data.email)  # Debug
    
    try:
        user = User.objects.get(email=user_data.email)
        print("User found:", user.email)  # Debug
        
        # Print the received password and stored hash for comparison
        print("Received password:", user_data.password)
        print("Stored password hash:", user.password)
        
        password_check = check_password(user_data.password, user.password)
        print("Password check result:", password_check)  # Debug
        
    except User.DoesNotExist:
        print("No user found with email:", user_data.email)  # Debug
        return api.create_response(
            request,
            {"detail": "Invalid credentials"},
            status=401
        )
    
    if not password_check:
        print("Password verification failed")  # Debug
        return api.create_response(
            request,
            {"detail": "Invalid credentials"},
            status=401
        )
    
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=30)
    )

    response = TokenSchema(access_token=access_token, token_type="bearer")
    print("Returning Response:", response.dict())  # ✅ Debugging

    return response
    



@api.get("/users/", response=list[UserSchema])
def get_users(request):
    """
    Get a list of all users.
    """
    users = User.objects.all()
    return users


@api.get("/users/{user_id}", response={200: UserSchema, 404:ErrorSchema})
def get_user(request, user_id: int):
    if User.objects.filter(id=user_id).exists():
        user = User.objects.get(id=user_id)
        return user
    else:
        return 404, {"detail": "User not found"}






# from django.http import JsonResponse

# @api.post("/signin", url_name="signin")  # Make sure the method is POST
# def signin(request, email: str, password: str):
#     return JsonResponse({"message": "Login successful!"})


