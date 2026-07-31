from django.urls import path
from .views import InscriptionView, user_detail
from .views import ProfilCandidatView

urlpatterns = [
    path('inscription/', InscriptionView.as_view(), name='inscription'),
    path('user/', user_detail, name='user_detail'),
    path('profil/', ProfilCandidatView.as_view(), name='profil_candidat'),
]