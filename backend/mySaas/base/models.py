import uuid
from django.contrib.auth.models import AbstractUser
from django.db import models
from django_extensions.db.fields import AutoSlugField
from datetime import datetime
from pydantic import BaseModel
from uuid import UUID
from datetime import datetime
from typing import List
from enum import Enum
from django.contrib.auth.hashers import make_password


# InterestsModel
class NavItem(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = AutoSlugField(populate_from='name')



#Courses Models
# class Course(models.Model):
#     id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
#     name = models.CharField(max_length=255)
#     slug = AutoSlugField(populate_from= 'name')
#     description = models.TextField( blank= True, null= True)
#     created_at = models.DateTimeField(auto_now_add=True)
#     updated_at = models.DateTimeField(auto_now=True)
#     CourseStatus = models.enums = [
#         ('draft', 'Draft'),
#         ('published', 'Published'),
#         ('archived', 'Archived'),
#     ]
#     status = models.CharField(max_length=10, choices=CourseStatus, default='draft')
#     def __str__(self):
#             return f"{self.name} -- {self.status}"
#     class Meta:
#         ordering = ['created_at'] # Order by created_at field which means the latest course will be displayed first
        
        
#Course Model
class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = AutoSlugField(populate_from='name')
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    CourseStatus = models.enums = [
        ('red', 'red'),
        ('green', 'green'),
        ('purple', 'purple'),
    ]
    status = models.CharField(max_length=10, choices=CourseStatus, default='draft')
    def __str__(self):
        return f"{self.name} -- {self.status}"
    class Meta:
        ordering = ['created_at'] 

#UserCourses Model
class UserCourse(models.Model):

    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey('User',
                                on_delete=models.CASCADE)
    course = models.ForeignKey('Course',
                                on_delete=models.CASCADE)
    CourseLevels = models.enums = [
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    ]
    level = models.CharField(max_length=15, choices=CourseLevels, default='beginner')
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    class Meta:
        unique_together = ['user', 'course']
        ordering = ['created']
    def __str__(self):
        return f"{self.user} -- {self.course}"
    


#user Model
class User(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField(default=False)


    
    # Add related_name to resolve the clash
    # groups = models.ManyToManyField(
    #     'auth.Group',
    #     related_name='custom_user_set',
    #     blank=True,
    #     help_text='The groups this user belongs to.',
    #     verbose_name='groups',
    # )
    # user_permissions = models.ManyToManyField(
    #     'auth.Permission',
    #     related_name='custom_user_set',
    #     blank=True,
    #     help_text='Specific permissions for this user.',
    #     verbose_name='user permissions',
    # )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name', 'password']