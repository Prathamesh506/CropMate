# crop_recommendation/models.py

from django.db import models

class CropRecommendation(models.Model):
    location = models.CharField(max_length=100)
    soil_type = models.CharField(max_length=100)
    pH = models.FloatField()
    nitrogen = models.IntegerField()
    phosphorus = models.IntegerField()
    potassium = models.IntegerField()
    weather_info = models.CharField(max_length=200)
    suitable_crop = models.CharField(max_length=200)

    def __str__(self):
        return f"{self.location} - {self.soil_type}"
