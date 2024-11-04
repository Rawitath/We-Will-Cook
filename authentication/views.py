from django.shortcuts import render

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
from django.contrib.auth.models import User
from rest_framework_simplejwt.tokens import RefreshToken

from rest_framework.permissions import IsAuthenticated


class WWCRegisterView(APIView):
    permission_classes = [permissions.AllowAny]
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
                    return Response("User Created.", status=status.HTTP_201_CREATED)
        return Response(validated_data, status=status.HTTP_400_BAD_REQUEST)
    
class WWCLoginView(APIView):
    permission_classes = [permissions.AllowAny]
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        import datetime
        serializer = WWCLoginSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.auth(request.data)
            if user:
                refresh = RefreshToken.for_user(user)
                return Response(
                {
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                }
                , status=status.HTTP_200_OK)
            return Response({"Username or password is wrong."}, status=status.HTTP_401_UNAUTHORIZED)
        
class WWCLogoutView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def post(self, request):
        return Response(status=status.HTTP_200_OK)

class WWCUserView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    authentication_classes = [JWTAuthentication]
    def get(self, request):
        serializer = WWCUserSerializer(request.user)
        if request.user.is_authenticated:
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            return Response({'User is not authenticated.'},status=status.HTTP_401_UNAUTHORIZED)

class RequestPasswordReset(APIView):
    def post(self, request):
        email = request.data.get('email')
        user = UserModel.objects.filter(email=email).first()
        if user:
            # สร้าง JWT token สำหรับ reset password
            refresh = RefreshToken.for_user(user)
            reset_token = str(refresh.access_token)
            
            reset_link = f"{settings.FRONTEND_URL}/reset-password/{reset_token}"
            send_mail(
                'Reset your password',
                f'Click the link to reset your password: {reset_link}',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            return Response({"message": "Password reset link sent!"}, status=status.HTTP_200_OK)
        return Response({"error": "User with this email does not exist."}, status=status.HTTP_400_BAD_REQUEST)

class ResetPassword(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ResetPasswordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(request.user)
            return Response({"message": "Password has been reset successfully!"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
