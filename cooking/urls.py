from django.urls import path
from .views import *

urlpatterns = [
    path('', CookingView, name="anything")
]