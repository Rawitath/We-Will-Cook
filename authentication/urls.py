from django.urls import path
from .views import *

urlpatterns = [
    path('', WWCUserView.as_view(), name="anything")
]