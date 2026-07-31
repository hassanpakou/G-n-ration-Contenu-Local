from rest_framework import serializers
from .models import Investisseur, GuichetInvestissement, OpportuniteInvestissement, Transaction

class InvestisseurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Investisseur
        fields = '__all__'

class GuichetInvestissementSerializer(serializers.ModelSerializer):
    class Meta:
        model = GuichetInvestissement
        fields = '__all__'

class OpportuniteInvestissementSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpportuniteInvestissement
        fields = '__all__'

class TransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ['date_transaction', 'statut']