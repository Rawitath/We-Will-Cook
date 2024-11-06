from rest_framework import serializers
from .models import *

class TastePrefSerializer(serializers.ModelSerializer):
    class Meta:
        model = TastePrefModel
        fields = "__all__"
    def get_pref(self, userid):
        pref = TastePrefModel.objects.filter(userid)
        return pref
class CondimentSerializer(serializers.ModelSerializer):
    class Meta:
        models = CondimentModel
        fields = "__all__"
class RecipeSerializer(serializers.ModelSerializer):
    class Meta:
        models = RecipeModel
        fields = "__all__"
