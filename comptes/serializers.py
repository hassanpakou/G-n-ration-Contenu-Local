from rest_framework import serializers
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, get_user_model
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from candidatures.models import Candidat
from rest_framework import serializers
from candidatures.models import Candidat
from django.contrib.auth.models import User

class CandidatProfileSerializer(serializers.ModelSerializer):
    # Champs User modifiables
    email = serializers.EmailField(source='user.email')
    first_name = serializers.CharField(source='user.first_name', required=False, allow_blank=True)
    last_name = serializers.CharField(source='user.last_name', required=False, allow_blank=True)

    class Meta:
        model = Candidat
        fields = [
            'id', 'email', 'first_name', 'last_name',
            'nom', 'prenom', 'telephone', 'date_naissance',
            'sexe', 'province_residence', 'diplome', 'etablissement',
            'domaine_etude', 'experience_professionnelle',
        ]
        read_only_fields = ['id', 'email']  # email non modifiable directement

    def update(self, instance, validated_data):
        # Mise à jour des champs User
        user_data = validated_data.pop('user', {})
        user = instance.user
        if 'email' in user_data:
            user.email = user_data['email']
        if 'first_name' in user_data:
            user.first_name = user_data['first_name']
        if 'last_name' in user_data:
            user.last_name = user_data['last_name']
        user.save()

        # Mise à jour des champs Candidat
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance

# Serializer d'inscription (déjà existant)
class InscriptionSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)
    password2 = serializers.CharField(write_only=True, min_length=8)

    # Champs supplémentaires pour le profil candidat
    nom = serializers.CharField(write_only=True)
    prenom = serializers.CharField(write_only=True)
    telephone = serializers.CharField(write_only=True)
    date_naissance = serializers.DateField(write_only=True)
    sexe = serializers.ChoiceField(choices=Candidat.SEXE_CHOICES, write_only=True)
    province_residence = serializers.CharField(write_only=True)
    diplome = serializers.CharField(write_only=True)
    etablissement = serializers.CharField(write_only=True)
    domaine_etude = serializers.CharField(write_only=True)
    experience_professionnelle = serializers.CharField(write_only=True, required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'password2', 'nom', 'prenom', 'telephone',
                  'date_naissance', 'sexe', 'province_residence', 'diplome',
                  'etablissement', 'domaine_etude', 'experience_professionnelle']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError("Les mots de passe ne correspondent pas.")
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError("Un utilisateur avec cet email existe déjà.")
        return data

    def create(self, validated_data):
        profil_data = {
            'nom': validated_data.pop('nom'),
            'prenom': validated_data.pop('prenom'),
            'telephone': validated_data.pop('telephone'),
            'date_naissance': validated_data.pop('date_naissance'),
            'sexe': validated_data.pop('sexe'),
            'province_residence': validated_data.pop('province_residence'),
            'diplome': validated_data.pop('diplome'),
            'etablissement': validated_data.pop('etablissement'),
            'domaine_etude': validated_data.pop('domaine_etude'),
            'experience_professionnelle': validated_data.pop('experience_professionnelle', ''),
        }
        password = validated_data.pop('password2')
        validated_data.pop('password')
        user = User.objects.create_user(
            username=validated_data['email'],
            email=validated_data['email'],
            password=password
        )
        Candidat.objects.create(user=user, email=validated_data['email'], **profil_data)
        return user

# Serializer de connexion avec email
class EmailTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.EmailField()

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields.pop('username')
        self.fields['email'] = serializers.EmailField()

    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')

        if email and password:
            User = get_user_model()
            try:
                user = User.objects.get(email=email)
            except User.DoesNotExist:
                raise serializers.ValidationError('Aucun compte avec cet email.')

            user = authenticate(request=self.context.get('request'),
                                username=user.username,
                                password=password)
            if not user:
                raise serializers.ValidationError('Mot de passe incorrect.')
        else:
            raise serializers.ValidationError('Email et mot de passe requis.')

        refresh = self.get_token(user)
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }
        return data