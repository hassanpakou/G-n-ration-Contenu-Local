from rest_framework import viewsets
from .models import Hub
from .serializers import HubSerializer
from .models import Cohorte
from .serializers import CohorteSerializer

class CohorteViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Cohorte.objects.all().order_by('-date_debut')
    serializer_class = CohorteSerializer
class HubViewSet(viewsets.ModelViewSet):
    queryset = Hub.objects.all()
    serializer_class = HubSerializer