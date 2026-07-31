from rest_framework import serializers
from .models import OpportuniteSousTraitance, CorridorLogistique, OffreService

class OpportuniteSousTraitanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpportuniteSousTraitance
        fields = '__all__'

class CorridorLogistiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = CorridorLogistique
        fields = '__all__'

class OffreServiceSerializer(serializers.ModelSerializer):
    pme_nom = serializers.CharField(source='pme.nom', read_only=True)
    corridor_nom = serializers.CharField(source='corridor.nom', read_only=True)

    class Meta:
        model = OffreService
        fields = '__all__'
        read_only_fields = ['pme', 'date_ajout', 'pme_nom', 'corridor_nom']