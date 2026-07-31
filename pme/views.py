from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import PME
from .serializers import PMESerializer

class PMEViewSet(viewsets.ModelViewSet):
    serializer_class = PMESerializer
    queryset = PME.objects.all()  # Ajout pour le routeur

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.IsAuthenticated]
        else:
            permission_classes = []  # lecture autorisée sans auth
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        user = self.request.user
        if user.is_authenticated and (user.is_staff or user.is_superuser):
            return PME.objects.all()
        elif user.is_authenticated and hasattr(user, 'candidat'):
            return PME.objects.filter(fondateurs=user.candidat) | PME.objects.filter(visible_catalogue=True)
        else:
            return PME.objects.filter(visible_catalogue=True)

    def perform_create(self, serializer):
        pme = serializer.save()
        if hasattr(self.request.user, 'candidat'):
            pme.fondateurs.add(self.request.user.candidat)
        else:
            # Si pas de profil candidat, on pourrait lever une erreur
            pass