from rest_framework import serializers
from .models import Hub
from .models import Cohorte

class CohorteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cohorte
        fields = '__all__'
class HubSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hub
        fields = '__all__'