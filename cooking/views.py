from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *

from django.http import HttpResponse
from .logic import display_recipe

# Create your views here.
class TastePrefView(APIView):
    def get(self, request):
        serializer = TastePrefSerializer()
        return Response(serializer.data)

def show_recipe(request):
    response = display_recipe()
    return HttpResponse(response, content_type="text/plain")
