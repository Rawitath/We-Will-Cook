from django.shortcuts import render
from django.contrib.auth import login, logout

from rest_framework import permissions, status
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *
from .validators import *
# Create your views here.

class WWCRegisterView(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        validated_data = validate(request.data)
        if validated_data == request.data:
            serializer = WWCRegisterSerializer(data=validated_data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.create(validated_data)
                if user:
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(validated_data, status=status.HTTP_400_BAD_REQUEST)
    
class WWCLoginView(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    def post(self, request):
        serializer = WWCLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.auth(request.data)
            if user:
                login(request, user)
                return Response(serializer.data, status=status.HTTP_200_OK)
            return Response({"Username or password is wrong."}, status=status.HTTP_401_UNAUTHORIZED)
        
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
