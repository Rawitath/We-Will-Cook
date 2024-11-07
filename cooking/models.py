from django.db import models
import json

# Create your models here.

class CondimentModel(models.Model):
    name = models.CharField(max_length=30, unique=True)
    # Tastes is kept as dict parsed to json
    tastes = models.JSONField()
    def set_tastes(self, tastes_dict):
        import json
        return json.dumps(tastes_dict ,ensure_ascii=False).encode("utf-8")
    def get_tastes(self):
        import json
        return json.loads(self.tastes, ensure_ascii=False)

class TastePrefModel(models.Model):
    userid = models.UUIDField(unique=True, primary_key=True)
    sweet_offset = models.FloatField(default=1)
    salty_offset = models.FloatField(default=1)
    sour_offset = models.FloatField(default=1)
    spicy_offset = models.FloatField(default=1)
    health_conditions = models.Field(default=list())

import datetime

class RecipeModel(models.Model):
    userid = models.UUIDField()
    name = models.CharField(max_length=256)
    description = models.JSONField()
    condiments = models.JSONField()
    is_favorite = models.BooleanField(default=False)
    is_collection = models.BooleanField(default=False)
    created_at = models.DateTimeField()
    collection_name = models.CharField(default='My Collection', max_length=256)
    def set_condiments(self, condiments_dict):
        import json
        return json.dumps(condiments_dict ,ensure_ascii=False).encode("utf-8")
    def get_condiments(self):
        import json
        return json.loads(self.condiments, ensure_ascii=False)
