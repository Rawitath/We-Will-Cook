from django.urls import path
from .views import *

urlpatterns = [
    path('', WWCUserView.as_view()),
    path('register/', WWCRegisterView.as_view()),
    path('login/', WWCLoginView.as_view()),
    path('logout/', WWCLogoutView.as_view())
]
from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

urlpatterns = [
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
