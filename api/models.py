from django.db import models

class React(models.Model):
    test_char = models.CharField(max_length=1024)
    test_int = models.IntegerField()