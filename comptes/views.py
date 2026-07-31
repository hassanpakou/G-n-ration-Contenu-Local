from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import InscriptionSerializer
from candidatures.models import Candidat
from rest_framework.generics import RetrieveUpdateAPIView
from .serializers import CandidatProfileSerializer
from candidatures.models import Candidat
from rest_framework.permissions import IsAuthenticated

class ProfilCandidatView(RetrieveUpdateAPIView):
    serializer_class = CandidatProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        # Récupère le profil candidat lié à l'utilisateur connecté
        try:
            return Candidat.objects.get(user=self.request.user)
        except Candidat.DoesNotExist:
            # Si l'utilisateur n'a pas de profil candidat, on pourrait en créer un ici,
            # mais normalement tout utilisateur doit avoir un profil après inscription.
            return None

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_detail(request):
    user = request.user
    data = {
        'id': user.id,
        'email': user.email,
        'username': user.username,
        'is_staff': user.is_staff,   # <-- ajout
    }
    if hasattr(user, 'candidat'):
        data['candidat_id'] = user.candidat.id
    return Response(data)

class InscriptionView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = InscriptionSerializer