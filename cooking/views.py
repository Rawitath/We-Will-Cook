from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *

# Create your views here.
class TastePrefView(APIView):
    def get(self, request):
        serializer = TastePrefSerializer()
        return Response(serializer.data)
