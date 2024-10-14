from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def validate(data):
    username = data['username'].strip()
    email = data['email'].strip()
    password = data['password'].strip()
    validate_username(username)
    validate_email(email)
    validate_password(password)

def validate_username(username):
     if not username:
          raise ValidationError("The given username must be set")
     elif UserModel.objects.filter(username=username).exists():
          raise ValidationError("This username has already been used")

def validate_email(email):
     if not email:
          raise ValidationError("The given email must be set")
     elif UserModel.objects.filter(email=email).exists():
         raise ValidationError("This email has already registered")

def validate_password(password):
    if len(password) < 8 or not any(char.isupper() for char in password) \
           or not any(char.islower() for char in password) or not any(char.isdigit() for char in password):
            raise ValidationError("The password requires at least 8 characters long with at least 1 lowercase and uppercase and number.")
