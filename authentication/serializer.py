from rest_framework import serializers
from .models import *
from django.contrib.auth import get_user_model, authenticate
from django.core.exceptions import ValidationError
UserModel = get_user_model()
class WWCRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = ['userid', 'username', 'email', 'password', 'profile_pic']
    def create(self, validated_data):
        user = UserModel.objects.create_user(
            userid=validated_data['userid'],
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            profile_pic=validated_data['profile_pic']
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
        fields = ['userid', 'username', 'email']
