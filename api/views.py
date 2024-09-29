from django.shortcuts import render
from rest_framework import generics
from api.models import *
from api.serializer import *
from rest_framework.response import Response

class ReactView(generics.CreateAPIView):
    queryset = React.objects.all()
    serializer_class = ReactSerializer