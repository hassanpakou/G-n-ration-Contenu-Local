from rest_framework import viewsets, permissions
from .models import OpportuniteSousTraitance, CorridorLogistique, OffreService
from .serializers import (
    OpportuniteSousTraitanceSerializer,
    CorridorLogistiqueSerializer,
    OffreServiceSerializer,
)

class OpportuniteSousTraitanceViewSet(viewsets.ModelViewSet):
    queryset = OpportuniteSousTraitance.objects.all()
    serializer_class = OpportuniteSousTraitanceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class CorridorLogistiqueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = CorridorLogistique.objects.all()
    serializer_class = CorridorLogistiqueSerializer

class OffreServiceViewSet(viewsets.ModelViewSet):
    serializer_class = OffreServiceSerializer
    queryset = OffreService.objects.all()   # ← Ajoutez cette ligne

    def get_queryset(self):
        queryset = OffreService.objects.all()
        corridor = self.request.query_params.get('corridor')
        if corridor:
            queryset = queryset.filter(corridor_id=corridor)
        return queryset

    def get_permissions(self):
        if self.action in ('create', 'update', 'partial_update', 'destroy'):
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        user = self.request.user
        if hasattr(user, 'candidat'):
            # suppose que le candidat est lié à une PME (on prend la première PME de l'utilisateur)
            pmes = user.candidat.pmes_creees.all()
            if pmes.exists():
                serializer.save(pme=pmes.first())
            else:
                from rest_framework.exceptions import ValidationError
                raise ValidationError("Vous devez d'abord créer une PME pour proposer une offre.")
        else:
            raise ValidationError("Profil candidat introuvable.")