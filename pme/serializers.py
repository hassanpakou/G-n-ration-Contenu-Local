from rest_framework import serializers
from .models import PME

class PMESerializer(serializers.ModelSerializer):
    class Meta:
        model = PME
        fields = '__all__'
        read_only_fields = ['date_ajout']  # auto
        # Les fondateurs seront gérés séparément
        extra_kwargs = {
            'fondateurs': {'required': False},  # on va les assigner automatiquement
        }