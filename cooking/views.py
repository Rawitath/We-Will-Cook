from django.shortcuts import render
from django.http import HttpResponse
# Create your views here.
def CookingView(request):
    return HttpResponse("<h1>Testing from Cooking!</h1>")

