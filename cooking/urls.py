from django.urls import path
from .views import *

from django.urls import path
from .views import show_recipe

urlpatterns = [
    path('tastepref/', TastePrefView.as_view(), name="anything")
]

urlpatterns = [
    path('recipe/', show_recipe, name='show_recipe'),
]
