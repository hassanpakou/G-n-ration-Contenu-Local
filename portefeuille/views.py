from rest_framework import viewsets, permissions
from .models import EntreprisePublique, DefiTechnologique, SolutionLocale
from .serializers import (
    EntreprisePubliqueSerializer,
    DefiTechnologiqueSerializer,
    SolutionLocaleSerializer,
)


class EntreprisePubliqueViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = EntreprisePublique.objects.all()
    serializer_class = EntreprisePubliqueSerializer


class DefiTechnologiqueViewSet(viewsets.ModelViewSet):
    queryset = DefiTechnologique.objects.all()
    serializer_class = DefiTechnologiqueSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]  # Seuls les authentifiés peuvent créer/modifier


class SolutionLocaleViewSet(viewsets.ModelViewSet):
    queryset = SolutionLocale.objects.all()
    serializer_class = SolutionLocaleSerializer

    def get_permissions(self):
        if self.action in ('create', 'update', 'partial_update', 'destroy'):
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = [permissions.AllowAny]
        return [permission() for permission in permission_classes]

    def perform_create(self, serializer):
        # Optionnel : associer automatiquement le candidat si l'utilisateur est un candidat
        user = self.request.user
        if hasattr(user, 'candidat'):
            serializer.save(candidat=user.candidat)
        else:
            serializer.save()


from django.shortcuts import render

# Create your views here.
