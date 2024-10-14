from django.shortcuts import render
from django.contrib.auth import login, logout
from django.contrib.auth import authenticate
from django.contrib import messages

from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *
# Create your views here.
class WWCRegisterView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        serializer = WWCRegisterSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(request.data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)
class WWCLoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    def post(self, request):
        serializer = WWCLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.auth(request.data)
            login(request, user)
            return Response(serializer.data, status=status.HTTP_200_OK)
class WWCLogoutView(APIView):
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)
class WWCUserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    def get(self, request):
        serializer = WWCUserSerializer(request.user)
        return Response({'current_users': serializer.data}, status=status.HTTP_200_OK)

