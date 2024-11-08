from django.urls import path
from .views import *

urlpatterns = [
    path('tastepref/', TastePrefView.as_view(), name="tastepref"),
    path('recipe/', ShowRecipeView.as_view(), name='show_recipe'),
    path('userrecipe/', UserRecipeView.as_view(), name='get_user_recipe'),
    path('calibrate/', CalibrateView.as_view(), name='calibrate'),
]