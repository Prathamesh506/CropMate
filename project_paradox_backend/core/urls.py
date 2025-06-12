# project_paradox/urls.py
from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('services/', include('services.urls')), 
    path('api/', include('crop_recommendation.urls')), # <== THIS is what connects /api/register/
    path('api/cropguide/', include('cropguide.urls')),

] 

