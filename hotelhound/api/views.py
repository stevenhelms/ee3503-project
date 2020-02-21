from django.shortcuts import render
from django.http import HttpResponse
import datetime

# from rest_framework.views import APIView
# from rest_framework.response import Response

from rest_framework.decorators import api_view, throttle_classes, authentication_classes, permission_classes
from rest_framework.authentication import SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
# from rest_framework.throttling import UserRateThrottle

from rest_framework import generics, viewsets, authentication, permissions

from django.contrib.auth.models import User
from .models import Hotel,Rating,Review
from .serializers import HotelSerializer,RatingSerializer,ReviewSerializer

# Create your views here.
@api_view(['GET','POST'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
class HotelList(generics.ListCreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


@api_view(['GET','PUT','DELETE'])
@authentication_classes([SessionAuthentication, BasicAuthentication])
@permission_classes([IsAuthenticated])
class HotelDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer


# @api_view(['GET','POST'])
# @authentication_classes([SessionAuthentication, BasicAuthentication])
# @permission_classes([IsAuthenticated])
class HotelViewSet(viewsets.ModelViewSet):
    queryset = Hotel.objects.all().order_by('-created_at')
    serializer_class = HotelSerializer


class RatingList(generics.ListCreateAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class RatingDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all().order_by('-created_at')
    serializer_class = RatingSerializer


class ReviewList(generics.ListCreateAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Review.objects.all()
    serializer_class = ReviewSerializer


class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all().order_by('-created_at')
    serializer_class = ReviewSerializer

'''
Example HTML view
'''
def index(request):
    now = datetime.datetime.now()
    html = "<html><body><h1>It is now %s.</h1></body></html>" % now
    return HttpResponse(html)