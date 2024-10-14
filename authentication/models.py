from typing import Any
from django.db import models
import uuid
from django.apps import apps
from django.contrib import auth
from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.contrib.auth.hashers import make_password

def get_user_pfp_path(self, filename):
    return f"media/{self.userid}/pfp.png"

def get_default_pfp():
    return "static/img/person_placeholder.png"

class WWCUserManager(BaseUserManager):
    use_in_migrations = True
    def _create(self, username, email, password, **extra_fields):
        email = self.normalize_email(email)
        GlobalUserModel = apps.get_model(
            self.model._meta.app_label, self.model._meta.object_name
        )
        username = GlobalUserModel.normalize_username(username)
        user = self.model(username=username, email=email, **extra_fields)
        user.password = make_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, username, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create(username, email, password, **extra_fields)

    def create_superuser(self, username, email, password, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create(username, email, password, **extra_fields)

    def with_perm(
        self, perm, is_active=True, include_superusers=True, backend=None, obj=None
    ):
        if backend is None:
            backends = auth._get_backends(return_tuples=True)
            if len(backends) == 1:
                backend, _ = backends[0]
            else:
                raise ValueError(
                    "You have multiple authentication backends configured and "
                    "therefore must provide the `backend` argument."
                )
        elif not isinstance(backend, str):
            raise TypeError(
                "backend must be a dotted import path string (got %r)." % backend
            )
        else:
            backend = auth.load_backend(backend)
        if hasattr(backend, "with_perm"):
            return backend.with_perm(
                perm,
                is_active=is_active,
                include_superusers=include_superusers,
                obj=obj,
            )
        return self.none()

class WWCUser(AbstractUser):
    objects = WWCUserManager()
    userid = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    profile_pic = models.ImageField(max_length=255, null=True, blank=True,
                                    upload_to=get_user_pfp_path, default=get_default_pfp)
    username = models.CharField(
        ("username"),
        max_length=30,
        unique=True
    )
    password = models.CharField(("password"), max_length=128)
    def __str__(self):
        return self.username
    def get_userid(self):
        return self.userid
    def get_pfp_name(self):
        return str(self.profile_pic)[str(self.profile_pic).index(f'media/{self.userid}/'):]
