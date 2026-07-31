from rest_framework import serializers
from .models import Candidat, DossierCandidature
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth import authenticate, get_user_model
from rest_framework import serializers

User = get_user_model()

class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Surcharge pour accepter 'email' au lieu de 'username'.
    """
    email = serializers.EmailField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Supprime le champ username et le remplace par email
        self.fields.pop('username')
        self.fields['email'] = serializers.EmailField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            # On récupère l'utilisateur par email
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError('Aucun compte avec cet email.')

            # Authentification
            user = authenticate(request=self.context.get('request'),
                                username=user.username,
                                password=password)
            if not user:
                raise serializers.ValidationError('Mot de passe incorrect.')
        else:
            raise serializers.ValidationError('Email et mot de passe requis.')

        # Rafraîchit le token avec les données de l'utilisateur
        refresh = self.get_token(user)
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return data
class CandidatSerializer(serializers.ModelSerializer):
    class Meta:
        model = Candidat
        fields = '__all__'

class DossierCandidatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = DossierCandidature
        fields = '__all__'
        read_only_fields = ['candidat', 'statut', 'date_soumission']  # candidat automatique