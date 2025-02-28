from django.contrib import admin

# Register your models here.
from .models import User, Course, UserCourse, NavItem
admin.site.register(User)
admin.site.register(Course)
admin.site.register(UserCourse)
admin.site.register(NavItem)
