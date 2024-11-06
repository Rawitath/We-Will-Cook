from django.db import models

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
    userid = models.CharField(max_length=256, unique=True)
    # Tastes is kept as dict parsed to json
    tastes = models.CharField(max_length=256)
    # WIP naja

class RecipeModel(models.Model):
    name = models.CharField(max_length=256)
    condiments = models.JSONField()
    is_favorite = models.BooleanField(default=False)
    collection_name = models.CharField(default='My Collection', max_length=256)
    def set_condiments(self, condiments_dict):
        import json
        return json.dumps(condiments_dict ,ensure_ascii=False).encode("utf-8")
    def get_condiments(self):
        import json
        return json.loads(self.condiments, ensure_ascii=False)
