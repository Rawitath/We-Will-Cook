from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser
# Create your models here.
class WWCUser(AbstractUser):
    userid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    def __str__(self):
        return self.username
    def get_userid(self):
        return self.userid
