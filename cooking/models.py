from django.db import models

# Create your models here.

class CondimentModel(models.Model):
    name = models.CharField(max_length=30, unique=True)
    # Tastes is kept as dict parsed to json
    tastes = models.CharField(max_length=256)
    def set_tastes(self, tastes_dict):
        import json
        return json.dumps(tastes_dict ,ensure_ascii=False).encode("utf-8")
    def get_tastes(self):
        import json
        return json.loads(self.tastes, ensure_ascii=False)


class TastePreferenceModel(models.Model):
    userid = models.CharField(max_length=256, unique=True)
    # Tastes is kept as dict parsed to json
    tastes = models.CharField(max_length=256)
    # WIP naja
