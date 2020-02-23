# api/urls.py
from django.urls import include,path
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register('hotels', views.HotelViewSet)
router.register('ratings', views.RatingViewSet)
router.register('reviews', views.ReviewViewSet)

urlpatterns = router.urls