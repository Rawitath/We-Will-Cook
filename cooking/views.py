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
        user = request.user
        if serializer.is_valid():
            taste_pref = TastePrefModel()
            if user.is_authenticated:
                taste_pref = TastePrefModel.objects.get(userid=user.userid)
            response = display_recipe(request.data.get('flavors'), request.data.get('noodle_size'),
                                      request.data.get('noodle_type'), request.data.get('noodle_style'),taste_pref)
            if user.is_authenticated:
                recipe = RecipeModel()
                recipe.userid = user.userid
                recipe.name = f"{request.data.get('noodle_type')}{request.data.get('noodle_style')}"
                recipe.description = request.data
                recipe.condiments = response
                recipe.created_at = datetime.datetime.now()
                recipe.save()
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class CalibrateView(APIView):
    permission_classes=[permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def put(self, request):
        user = request.user
        taste_pref = TastePrefModel.objects.get(userid=user.userid)
        taste_pref.sweet_offset = request.data.get('sweet_offset')
        taste_pref.salty_offset = request.data.get('sweet_offset')
        taste_pref.sour_offset_offset = request.data.get('sweet_offset')
        taste_pref.spicy_offset = request.data.get('sweet_offset')
        taste_pref.health_conditions = request.data.get('health_conditions')
        taste_pref.save()
        return Response("Calibration Complete", status=status.HTTP_200_OK)

class UserRecipeView(APIView):
    permission_classes=[permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        recipes = RecipeModel.objects.filter(userid=request.user.userid)
        response = {}
        for i in range(len(recipes)):
            serializer = RecipeSerializer(recipes[i])
            response.update(serializer.data)
        return Response(response, status=status.HTTP_200_OK)
    def delete(self, request):
        recipes = RecipeModel.objects.filter(userid=request.user.userid, pk=request.data.get('recipe_id'))
        recipes.delete()
        return Response("Recipe Deleted", status=status.HTTP_200_OK)
