# api/urls.py
from django.urls import include,path
from rest_framework.routers import DefaultRouter
from . import views

from rest_framework.schemas import get_schema_view

router = DefaultRouter()
router.register('hotels', views.HotelViewSet)
router.register('ratings', views.RatingViewSet)
router.register('reviews', views.ReviewViewSet)

urlpatterns = [
    path('', include(router.urls)),
]