from rest_framework import serializers
from .models import Candidat, DossierCandidature

class CandidatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidat
        fields = '__all__'

class DossierCandidatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = DossierCandidature
        fields = '__all__'
        read_only_fields = ['candidat', 'statut', 'date_soumission']  # candidat automatique