from rest_framework import serializers
from rest_framework import serializers as drf_serializers
from . import models
from datetime import datetime,timedelta

# class HotelSerializer(serializers.ModelSerializer):

#      class Meta:
#          fields = ('id', 'name', 'address', 'phone_number', 'vicinity',
#             'types', 'google_place_id', 'geometry', 'updated_at','created_at','lastupdated',)
#          model = models.Hotel

class HotelSerializer(drf_serializers.HyperlinkedModelSerializer):
      boom = serializers.SerializerMethodField(method_name='calculate_ago')

      class Meta:
         fields = ('id', 'url', 'name', 'address', 'phone_number', 'vicinity',
            'types', 'google_place_id', 'geometry', 'updated_at','created_at',
            'lastupdated','boom',)
         model = models.Hotel


      def calculate_ago(self, instance):
         seconds_ago = datetime.now() - instance.updated_at.replace(tzinfo=None)
         if seconds_ago > timedelta(60*60*24*7): # 7 days
               ago = "over a week"
         else:
               day = timedelta(days=1)
               days_ago = seconds_ago // (24 * 3600)
               ago = str(f"{days_ago} days")

         return str(f"{ago} ago")

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
