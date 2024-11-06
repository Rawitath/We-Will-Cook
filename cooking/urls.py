from django.urls import path
from .views import TastePrefView, ShowRecipeView

urlpatterns = [
    path('tastepref/', TastePrefView.as_view(), name="tastepref"),
    path('recipe/', ShowRecipeView.as_view(), name='show_recipe'),
]