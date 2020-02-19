from rest_framework import serializers
from rest_framework import serializers as drf_serializers
from . import models


# class HotelSerializer(serializers.ModelSerializer):

#      class Meta:
#          fields = ('id', 'name', 'address', 'phone_number', 'vicinity',
#             'types', 'google_place_id', 'geometry', 'updated_at','created_at',)
#          model = models.Hotel

class HotelSerializer(drf_serializers.HyperlinkedModelSerializer):

     class Meta:
         fields = ('id', 'url', 'name', 'address', 'phone_number', 'vicinity',
            'types', 'google_place_id', 'geometry', 'updated_at','created_at',)
         model = models.Hotel


class RatingSerializer(serializers.ModelSerializer):

     class Meta:
         fields = ('id', 'hotel_id', 'rating', 'user_ratings_total',
            'updated_at','created_at',)
         model = models.Rating


class ReviewSerializer(serializers.ModelSerializer):

     class Meta:
         fields = ('id', 'hotel_id', 'rating', 'review_text', 'review_time',
            'updated_at','created_at',)
         model = models.Review
