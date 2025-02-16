# auth/api.py
from ninja import Router
from django.contrib.auth import get_user_model
from django.contrib.auth.hashers import make_password, check_password
from .schemas import UserSignIn, UserSignUp, TokenSchema, UserSchema, ErrorSchema, CourseSchema
from .utils import create_access_token
from datetime import timedelta
from .models import User, Course



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
def signup(request, user_data: UserSignUp):
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
    print("Returning Response:", response.model_dump())  # ✅ Debugging

    return response








@api.post("/signin", response=TokenSchema)
def signin(request, user_data: UserSignIn):
    try:
        user = User.objects.get(email=user_data.email)
    except User.DoesNotExist:
        return {"detail": "Invalid credentials"}
    
    if not check_password(user_data.password, user.password):
        return {"detail": "Invalid credentials"}
    
    access_token = create_access_token(
        data={"sub": user.email},
        expires_delta=timedelta(minutes=30)
    )
    
    return {"access_token": access_token, "token_type": "bearer"}

    

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



@api.get("/courses/", response=list[CourseSchema])
def get_courses(request):
    """
    Get a list of all courses.
    """
    courses = Course.objects.all()
    return courses