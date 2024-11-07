from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *
from .logic import display_recipe
from rest_framework import status
from rest_framework import permissions, status
from rest_framework_simplejwt.authentication import JWTAuthentication
from authentication.models import WWCUser

# Create your views here.
class TastePrefView(APIView):
    def get(self, request):
        serializer = TastePrefSerializer()
        return Response(serializer.data)

class ShowRecipeView(APIView):
    permission_classes=[permissions.AllowAny]
    authentication_classes=[JWTAuthentication]
    def post(self, request):
        serializer = NoodleSerializer(data=request.data)
        if serializer.is_valid():
            response = display_recipe(request.data.get('flavors'), request.data.get('cup_size'),request.data.get('noodle_type'))
            user = request.user
            if user.is_authenticated:
                recipe = RecipeModel()
                recipe.userid = user.userid
                recipe.condiments = response
                recipe.save()
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUserRecipeView(APIView):
    permission_classes=[permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        recipe = RecipeModel.objects.get(userid=request.user.userid)
        serializer = RecipeSerializer(recipe)
        return Response(serializer.data, status=status.HTTP_200_OK)
