"""
Sets up URL patterns. Links pages from app to root path.
""" 

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('home.urls')),
]