# services/urls.py
from django.urls import path
from . import views

urlpatterns = [
    path('api/service_agents/', views.ServiceAgentListView.as_view(), name='service_agents'),
]
