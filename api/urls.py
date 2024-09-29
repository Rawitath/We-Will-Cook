from django.urls import path
from api.views import *

urlpatterns = [
    path('', ReactView.as_view())
]