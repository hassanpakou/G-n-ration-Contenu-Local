from rest_framework import serializers
from .models import EntreprisePublique, DefiTechnologique, SolutionLocale

class EntreprisePubliqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = EntreprisePublique
        fields = '__all__'

class DefiTechnologiqueSerializer(serializers.ModelSerializer):
    class Meta:
        model = DefiTechnologique
        fields = '__all__'

class SolutionLocaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = SolutionLocale
        fields = '__all__'
        read_only_fields = ['date_soumission', 'statut']