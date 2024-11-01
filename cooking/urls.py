from django.urls import path
from .views import *

urlpatterns = [
    path('tastepref/', TastePrefView.as_view(), name="anything")
]