from django.urls import path
from .views import *

urlpatterns = [
    path('', WWCUserView.as_view()),
    path('register/', WWCRegisterView.as_view()),
    path('login/', WWCLoginView.as_view()),
    path('logout/', WWCLogoutView.as_view()),
    path('getreset/', WWCGetResetView.as_view()),
    path('validatereset/<token>/', WWCGetResetView.as_view()),
    path('reset/<userid>/<token>/', WWCResetView.as_view())
]