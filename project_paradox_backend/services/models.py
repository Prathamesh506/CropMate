# services/models.py
from django.db import models

class ServiceAgent(models.Model):
    name = models.CharField(max_length=100)
    phone_number = models.CharField(max_length=15)
    email = models.EmailField()
    service_type = models.CharField(max_length=100)
    location = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return self.name
