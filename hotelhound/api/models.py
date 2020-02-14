from django.db import models


# Create your models here.
class Hotel(models.Model):
    name = models.CharField(max_length=128)
    address = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=24)
    vicinity = models.CharField(max_length=255)
    types = models.CharField(max_length=255)
    google_place_id = models.CharField(max_length=64)
    geometry = models.TextField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return str(self.name.title())


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
