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


# InterestsModel
# class UserInterests(models.Model):
#     user = models.ForeignKey('User', on_delete=models.CASCADE)


#Courses Models
class Course(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    slug = AutoSlugField(populate_from= 'name')
    description = models.TextField( blank= True, null= True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    CourseStatus = models.enums = [
        ('draft', 'Draft'),
        ('published', 'Published'),
        ('archived', 'Archived'),
    ]
    status = models.CharField(max_length=10, choices=CourseStatus, default='draft')
    def __str__(self):
            return f"{self.name} -- {self.status}"
    class Meta:
        ordering = ['created_at'] # Order by created_at field which means the latest course will be displayed first
        
        


    
# class UserCourses(models.Model):
#     user = models.ForeignKey('User',
#                                 on_delete=models.CASCADE)
#     course = models.ForeignKey('Course',
#                                 on_delete=models.CASCADE)
    


#user Model
class User(AbstractUser):
    email = models.EmailField(unique=True)
    full_name = models.CharField(max_length=255)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField(default=False)

    
    # Add related_name to resolve the clash
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_set',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_set',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', 'full_name']