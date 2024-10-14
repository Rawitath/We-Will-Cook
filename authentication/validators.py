from django.contrib.auth import get_user_model
UserModel = get_user_model()

def validate(data):
     errors = []
     username = data['username'].strip()
     email = data['email'].strip()
     password = data['password'].strip()
     errors.append(validate_username(username))
     errors.append(validate_email(email))
     errors.append(validate_password(password))
     if errors.count(None) < 3:
          return errors
     return data

def validate_username(username):
     if not username:
          return "The given username must be set"
     elif UserModel.objects.filter(username=username).exists():
          return "This username has already been used"

def validate_email(email):
     if not email:
          return "The given email must be set"
     elif not "@" in email or not "." in email:
          return "The given email is invalid"
     elif UserModel.objects.filter(email=email).exists():
         return "This email has already registered"

def validate_password(password):
    if len(password) < 8 or not any(char.isupper() for char in password) \
          or not any(char.islower() for char in password) or not any(char.isdigit() for char in password):
         return "The password requires at least 8 characters long with at least 1 lowercase and uppercase and number."
