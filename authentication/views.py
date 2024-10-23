from django.shortcuts import render
from django.contrib.auth import login, logout

from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializer import *
from .validators import *
from rest_framework_simplejwt.authentication import JWTAuthentication

from django.core.mail import send_mail
from django.conf import settings
# Create your views here.

class WWCRegisterView(APIView):
    permission_classes = permissions.AllowAny
    def post(self, request):
        validated_data = validate(request.data)
        if validated_data == request.data:
            serializer = WWCRegisterSerializer(data=validated_data)
            if serializer.is_valid(raise_exception=True):
                user = serializer.create(validated_data)
                if user:
                    from_email = settings.EMAIL_HOST_USER
                    to_email = [user.email]
                    subject = f"Dear {user.username}, Your Account Has Been Created!"
                    message = f"Enjoy We Will Cook, {user.username}!"
                    send_mail(subject, message,
                          from_email, recipient_list=to_email,fail_silently=False)
                    return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(validated_data, status=status.HTTP_400_BAD_REQUEST)
    
class WWCLoginView(APIView):
    permission_classes = permissions.AllowAny
    authentication_classes = JWTAuthentication
    def post(self, request):
        serializer = WWCLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.auth(request.data)
            if user:
                login(request, user)
                return Response(request.session, status=status.HTTP_200_OK)
            return Response({"Username or password is wrong."}, status=status.HTTP_401_UNAUTHORIZED)
        
class WWCLogoutView(APIView):
    permission_classes = permissions.IsAuthenticated
    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)

class WWCUserView(APIView):
    permission_classes = permissions.IsAuthenticated
    authentication_classes = JWTAuthentication
    def get(self, request):
        serializer = WWCUserSerializer(request.user)
        if request.user.is_authenticated:
            return Response({'current_users': serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({'User is not authenticated.'},status=status.HTTP_401_UNAUTHORIZED)

class WWCUserView(APIView):
    permission_classes = permissions.IsAuthenticated
    authentication_classes = JWTAuthentication
    
    def get(self, request):
        serializer = WWCUserSerializer(request.user)
        return Response({'current_user': serializer.data}, status=status.HTTP_200_OK)
