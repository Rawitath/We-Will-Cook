from django.core.exceptions import ValidationError

def password_validator(password):
    if len(password) < 8 or not any(char.isupper() for char in password) \
           or not any(char.islower() for char in password) or not any(char.isdigit() for char in password):
            raise ValidationError("The password requires at least 8 characters long with at least 1 lowercase and uppercase and number.")
