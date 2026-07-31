from rest_framework import viewsets
from .models import ConseilSages, ComiteSurveillance, AuditRapport
from .serializers import (
    ConseilSagesSerializer,
    ComiteSurveillanceSerializer,
    AuditRapportSerializer,
)

class ConseilSagesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ConseilSages.objects.all().order_by('ordre_affichage')
    serializer_class = ConseilSagesSerializer

class ComiteSurveillanceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ComiteSurveillance.objects.all()
    serializer_class = ComiteSurveillanceSerializer

class AuditRapportViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = AuditRapport.objects.all().order_by('-date_publication')
    serializer_class = AuditRapportSerializer