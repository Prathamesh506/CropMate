# services/serializers.py
from rest_framework import serializers
from .models import ServiceAgent

class ServiceAgentSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceAgent
        fields = '__all__'  # or specify fields explicitly
