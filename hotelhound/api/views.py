import json
import datetime
from django.shortcuts import render
from django.core import serializers
from django.http import HttpResponse
from rest_framework.permissions import IsAuthenticated
from rest_framework import generics, viewsets

from hotelhound import settings
from .models import Hotel,Rating,Review
from .serializers import HotelSerializer,RatingSerializer,ReviewSerializer

# Create your views here.
class HotelList(generics.ListCreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


class HotelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all().order_by('-created_at')
    serializer_class = HotelSerializer

    def create(self, request):
        if 'name' in request.data:
            name = request.data['name']

        try:
            obj = Hotel.objects.get(name=name)
            for key, value in request.data.items():
                setattr(obj, key, value)
            obj.save()
        except Exception as e:
            obj = Hotel(**request.data)
            obj.save()

        if settings.DEBUG:
            print("\n---HotelViewSet---\n")
            print(serializers.serialize('json', [obj]))
        return HttpResponse(obj.id)

class RatingList(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class RatingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all().order_by('-created_at')
    serializer_class = RatingSerializer

    def create(self, request):
        try:
            obj = Rating.objects.get(
                rating=request.data['rating'],
                user_ratings_total=request.data['user_ratings_total'],
                hotel_id=request.data['hotel_id']
            )
            for key, value in request.data.items():
                setattr(obj, key, value)
            obj.save()
        except Exception as e:
            obj = Rating(**request.data)
            obj.save()

        if settings.DEBUG:
            print("\n---RatingViewSet---")
            print(serializers.serialize('json', [obj]))
        return HttpResponse(obj)


class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer

    def create(self, request):

        try:
            obj = Review.objects.get(
                author_name=request.data['author_name'],
                rating=request.data['rating'],
                hotel_id=request.data['hotel_id']
            )
            for key, value in request.data.items():
                setattr(obj, key, value)
            obj.save()
        except Exception as e:
            print(f"ERROR: {e}")
            obj = Review(**request.data)
            print(serializers.serialize('json', [obj]))
            obj.save()

        if settings.DEBUG:
            print("\n---ReviewViewSet---")
            print(serializers.serialize('json', [obj]))
        return HttpResponse(obj)


'''
Example HTML view
'''
def index(request):
    now = datetime.datetime.now()
    html = "<html><body><h1>It is now %s.</h1></body></html>" % now
    return HttpResponse(html)