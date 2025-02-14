from django.shortcuts import render
from django.http import HttpResponse as response


# Create your views here.


def Home(request):
    if request.user.is_authenticated:
         return response(f"Hello World{request.user.email} {request.user.full_name}")
    else:
        return response("Not Logged In")
   