from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
class WWCAuthBackend(object):
    def authenticate(self, email=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            user = UserModel.objects.get(email=email)
        except UserModel.DoesNotExist:
            return None #ValidationError("User doesn't exists.")
        except UserModel.MultipleObjectsReturned:
            user = UserModel.objects.filter(email=email).order_by('id').first()
        if user.is_active:
            if user.check_password(password):
                return user
            return None #ValidationError("Your password is incorrect.")
        else:
            return #ValidationError("This account has been disabled.")
    def get_user(self, user_id):
        UserModel = get_user_model()
        try:
            return UserModel.objects.get(user_id=user_id)
        except UserModel.DoesNotExist:
            return None
