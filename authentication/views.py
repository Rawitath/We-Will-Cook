from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.contrib import messages

from rest_framework import generics
from .models import *
from .serializer import *
# Create your views here.
class WWCUserView(generics.ListCreateAPIView):
    queryset = WWCUser.objects.all()
    serializer_class = WWCUserSerializer

def signup(request):
    # if request.method == "POST":
    #     username = request.POST['username']
    #     email = request.POST['email']
    #     password = request.POST['password']

    #     user = User.objects.create(username, email, password)
    #     user.save()

    #     messages.success(request, "Your account has been created. Enjoy cooking!")
    return
def signin(request):
    # username = request.POST['username']
    # password = request.POST['password']

    # user = authenticate(username=username, password=password)
    return
def signout(request):
    return
