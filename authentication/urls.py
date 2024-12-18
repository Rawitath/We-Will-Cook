from django.urls import path
from .views import *
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('', WWCUserView.as_view()),
    path('register/', WWCRegisterView.as_view()),
    path('login/', WWCLoginView.as_view()),
    path('logout/', WWCLogoutView.as_view()),

    path('request-reset-password/', WWCRequestPasswordReset.as_view(), name='request-reset-password'),
    path('reset-password/', WWCResetPassword.as_view(), name='reset-password'),

    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
