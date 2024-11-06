from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *
from .logic import display_recipe
from rest_framework import status

# Create your views here.
class TastePrefView(APIView):
    def get(self, request):
        serializer = TastePrefSerializer()
        return Response(serializer.data)

class ShowRecipeView(APIView):
    def post(self, request):
        serializer = NoodleSerializer(data=request.data)
        if serializer.is_valid():
            response = display_recipe(request.data.get('flavors'), request.data.get('noodle_size'))
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
