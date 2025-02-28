from django.shortcuts import render
from django.http import HttpResponse as response


# Create your views here.


def Home(request):
    if request.user.is_authenticated:
         return response(f"Hello World{request.user.email} {request.user.full_name}")
    else:
        return response("Not Logged In")
    



# from django.http import JsonResponse
# from django.views.decorators.csrf import csrf_exempt
# import json
# from django.contrib.auth import authenticate

# @csrf_exempt  # Temporarily disable CSRF protection for testing
# def signin(request):
#     if request.method != "POST":
#         return JsonResponse({"message": "Method Not Allowed"}, status=405)  # Explicit 405 handling

#     try:
#         data = json.loads(request.body)
#         email = data.get("email")
#         password = data.get("password")

#         user = authenticate(username=email, password=password)

#         if user:
#             return JsonResponse({"message": "Login successful", "token": "fake-jwt-token"}, status=200)
#         else:
#             return JsonResponse({"message": "Invalid credentials"}, status=400)

#     except json.JSONDecodeError:
#         return JsonResponse({"message": "Invalid JSON format"}, status=400)
