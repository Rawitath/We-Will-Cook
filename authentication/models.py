from typing import Any
from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser, UserManager

def get_user_pfp_path(self, filename):
    return f"media/{self.userid}/pfp.png"

def get_default_pfp():
    return "static/img/person_placeholder.png"

class WWCUserManager(UserManager):
    def create_user(self, username: str, email: str, password: str, **extra_fields: Any) -> Any:
        if not username:
            raise ValueError("User must have a username!")
        if not email:
            raise ValueError("User must have an email!")
        if not password:
            raise ValueError("User must have a password!")
        if len(password) < 8 or not any(char.isupper() for char in password) \
           or not any(char.islower() for char in password) or not any(char.isdigit() for char in password):
            raise ValueError("ใส่ข้อความตรงนี้")

        return super().create_user(username, email, password, **extra_fields)
    def create_superuser(self, username: str, email: str, password: str, **extra_fields: Any) -> Any:
        if not username:
            raise ValueError("User must have a username!")
        if not email:
            raise ValueError("User must have an email!")
        if not password:
            raise ValueError("User must have a password!")
        if len(password) < 8 or not any(char.isupper() for char in password) \
           or not any(char.islower() for char in password) or not any(char.isdigit() for char in password):
            raise ValueError("ใส่ข้อความตรงนี้")
        return super().create_superuser(username, email, password, **extra_fields)

# Create your models here.
class WWCUser(AbstractUser):
    userid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile_pic = models.ImageField(max_length=255, null=True, blank=True, \
                                    upload_to=get_user_pfp_path, default=get_default_pfp)
    def __str__(self):
        return self.username
    def get_userid(self):
        return self.userid
    def get_pfp_name(self):
        return str(self.profile_pic)[str(self.profile_pic).index(f'media/{self.userid}/'):]
