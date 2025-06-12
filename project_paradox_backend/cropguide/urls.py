# cropguide/urls.py
from django.urls import path
from .views import fetch_crop_info

urlpatterns = [
    path("fetch/", fetch_crop_info, name="fetch_crop_info"),
]
