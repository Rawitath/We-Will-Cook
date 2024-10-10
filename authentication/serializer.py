from rest_framework import serializers
from .models import *

class WWCUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = WWCUser
        fields = ['userid', 'username', 'email', 'password', 'profile_pic']
