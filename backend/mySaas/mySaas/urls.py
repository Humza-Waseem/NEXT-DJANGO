
from django.contrib import admin
from django.urls import path, include
from base.api import api

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api.urls),
    path('accounts/', include('allauth.urls')),  # Allauth URLs
    path('', include('base.urls')),
    

]
