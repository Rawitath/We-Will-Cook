from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from django.urls import path
from .views import RequestPasswordReset, ResetPassword

urlpatterns = [
    path('', WWCUserView.as_view()),
    path('register/', WWCRegisterView.as_view()),
    path('login/', WWCLoginView.as_view()),
    path('logout/', WWCLogoutView.as_view()),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]

urlpatterns = [
    path('request-reset-password/', RequestPasswordReset.as_view(), name='request-reset-password'),
    path('reset-password/', ResetPassword.as_view(), name='reset-password'),
]