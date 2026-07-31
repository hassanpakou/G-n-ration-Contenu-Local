from rest_framework import serializers
from django.contrib.auth.models import User
from candidatures.models import Candidat

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
        # Extraire les champs du profil candidat
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

        # Créer l'utilisateur
        password = validated_data.pop('password2')
        validated_data.pop('password')
        user = User.objects.create_user(
            username=validated_data['email'],  # On utilise l'email comme username
            email=validated_data['email'],
            password=password
        )
        # Créer le candidat associé
        Candidat.objects.create(user=user, email=validated_data['email'], **profil_data)
        return user