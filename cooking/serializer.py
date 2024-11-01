from rest_framework import serializers
from .models import *

class TastePrefSerializer(serializers.ModelSerializer):
    class Meta:
        model = TastePrefModel
        field = "__all__"
    def get_pref(self, userid):
        pref = TastePrefModel.objects.filter(userid)
        return pref
