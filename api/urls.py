from django.urls import path
from .views import sample_api

urlpatterns = [
    path('hello/', sample_api),
]
