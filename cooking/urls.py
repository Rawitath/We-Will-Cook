from django.urls import path
from .views import *

urlpatterns = [
    path('/tastepref', TastePrefModel, name="anything")
]