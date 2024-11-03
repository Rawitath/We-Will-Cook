from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError

from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

UserModel = get_user_model()
class WWCRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['userid', 'username', 'email', 'password', 'profile_pic']
    def create(self, validated_data):
        user = UserModel.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        user.save()
        return user
class WWCLoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
    def auth(self, validated_data):
        user = authenticate(
            username=validated_data['username'],
            password=validated_data['password']
        )
        if not user:
            return None
        return user
class WWCUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['userid', 'username', 'email', 'profile_pic']

class ResetPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(write_only=True, min_length=8)

    def save(self, user):
        user.password = make_password(self.validated_data['password'])
        user.save()
