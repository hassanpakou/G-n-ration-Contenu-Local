from rest_framework import serializers
from .models import ConseilSages, ComiteSurveillance, AuditRapport

class ConseilSagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConseilSages
        fields = '__all__'

class ComiteSurveillanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComiteSurveillance
        fields = '__all__'

class AuditRapportSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditRapport
        fields = '__all__'