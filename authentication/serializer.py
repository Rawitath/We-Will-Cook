from rest_framework import serializers
from .models import *

class WWCUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = WWCUser
        fields = ['userid', 'username', 'email', 'password', 'profile_pic']
    def create(self, validated_data):
        password = validated_data.pop('password')
        user = super().create(validated_data)
        user.set_password(password)
        user.save()
        return user
