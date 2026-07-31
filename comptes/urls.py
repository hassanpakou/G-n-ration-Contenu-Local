from django.urls import path
from .views import InscriptionView, user_detail

urlpatterns = [
    path('inscription/', InscriptionView.as_view(), name='inscription'),
    path('user/', user_detail, name='user_detail'),
]