from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import Investisseur, GuichetInvestissement, OpportuniteInvestissement, Transaction
from .serializers import (
    InvestisseurSerializer,
    GuichetInvestissementSerializer,
    OpportuniteInvestissementSerializer,
    TransactionSerializer,
)

class GuichetInvestissementViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = GuichetInvestissement.objects.filter(actif=True)
    serializer_class = GuichetInvestissementSerializer

class OpportuniteInvestissementViewSet(viewsets.ModelViewSet):
    queryset = OpportuniteInvestissement.objects.filter(actif=True)
    serializer_class = OpportuniteInvestissementSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        user = self.request.user
        if hasattr(user, 'candidat'):
            serializer.save(candidat=user.candidat)
        else:
            serializer.save()
class TransactionViewSet(viewsets.ModelViewSet):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]

    def perform_create(self, serializer):
        # On pourrait ajouter des validations (ex: solde, etc.)
        serializer.save()