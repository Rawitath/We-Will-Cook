from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *
from .logic import display_recipe

# Create your views here.
class TastePrefView(APIView):
    def get(self, request):
        serializer = TastePrefSerializer()
        return Response(serializer.data)

class ShowRecipeView(APIView):
    def get(self, request):
        cup_size = 1.5
        response = display_recipe(cup_size)
        return HttpResponse(response, content_type="text/plain")
