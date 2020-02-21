from django.db import models
from datetime import datetime
import time

# Create your models here.
class Hotel(models.Model):
    name = models.CharField(max_length=128)
    address = models.CharField(max_length=255,blank=True)
    phone_number = models.CharField(max_length=24,blank=True)
    vicinity = models.CharField(max_length=255)
    types = models.CharField(max_length=255)
    google_place_id = models.CharField(max_length=64)
    geometry = models.TextField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name.title())

    @property
    def lastupdated(self):
        seconds_ago = datetime.now() - self.updated_at.replace(tzinfo=None)
        if seconds_ago > datetime.timedelta(60*60*24*7): # 7 days
            ago = "over a week"
        else:
            day = timedelta(days=1)
            days_ago = self.updated_at // (24 * 3600)
            ago = str(f"{days_ago} days")

        return str(f"{ago} ago")


class Rating(models.Model):
    hotel = models.ForeignKey('Hotel', on_delete=models.CASCADE)
    rating = models.FloatField()
    user_ratings_total = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(f"{self.rating} {self.user_ratings_total}")


class Review(models.Model):
    hotel = models.ForeignKey('Hotel', on_delete=models.CASCADE)
    author_name = models.CharField(max_length=32)
    rating = models.FloatField()
    review_text = models.TextField()
    review_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return str(self.author_name)
