from rest_framework import viewsets, permissions
from .models import DossierCandidature
from .serializers import DossierCandidatureSerializer

class DossierCandidatureViewSet(viewsets.ModelViewSet):
    serializer_class = DossierCandidatureSerializer
    permission_classes = [permissions.IsAuthenticated]
    queryset = DossierCandidature.objects.all()   # ← Ajoutez cette ligne

    def get_queryset(self):
        if hasattr(self.request.user, 'candidat'):
            return DossierCandidature.objects.filter(candidat=self.request.user.candidat)
        return DossierCandidature.objects.none()

    def perform_create(self, serializer):
        if hasattr(self.request.user, 'candidat'):
            serializer.save(candidat=self.request.user.candidat)
        else:
            from rest_framework.exceptions import PermissionDenied
            raise PermissionDenied("Vous devez d'abord compléter votre profil candidat.")