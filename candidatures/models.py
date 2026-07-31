from django.db import models
from django.contrib.auth.models import User  # Ajoutez cet import
from programmes.models import Cohorte

class Candidat(models.Model):
    SEXE_CHOICES = [('M', 'Masculin'), ('F', 'Féminin')]

    # Nouvelle relation avec l'utilisateur Django
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True, related_name='candidat')

    nom = models.CharField(max_length=100)
    prenom = models.CharField(max_length=100)
    email = models.EmailField(unique=True, max_length=250)
    telephone = models.CharField(max_length=20)
    date_naissance = models.DateField()
    sexe = models.CharField(max_length=1, choices=SEXE_CHOICES)
    nationalite = models.CharField(max_length=50, default="Congolaise")
    province_residence = models.CharField(max_length=100)
    diplome = models.CharField(max_length=100)
    etablissement = models.CharField(max_length=200)
    domaine_etude = models.CharField(max_length=100)
    experience_professionnelle = models.TextField(blank=True, null=True)
    date_inscription = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.prenom} {self.nom}"

class DossierCandidature(models.Model):
    STATUTS = [
        ('soumis', 'Soumis'),
        ('preselectionne', 'Présélectionné'),
        ('entretien', 'Entretien programmé'),
        ('accepte', 'Accepté'),
        ('refuse', 'Refusé'),
    ]

    candidat = models.ForeignKey(Candidat, on_delete=models.CASCADE, related_name='dossiers')
    cohorte = models.ForeignKey(Cohorte, on_delete=models.CASCADE, related_name='candidatures')
    lettre_motivation = models.TextField()
    note_intention = models.TextField(help_text="Description du projet entrepreneurial (1 page)")
    cv = models.FileField(upload_to='cv/')
    diplome_fichier = models.FileField(upload_to='diplomes/')  # Scan du diplôme
    statut = models.CharField(max_length=20, choices=STATUTS, default='soumis')
    date_soumission = models.DateTimeField(auto_now_add=True)
    commentaire_evaluateur = models.TextField(blank=True, null=True)
    prototype = models.FileField(upload_to='prototypes/', blank=True, null=True)

    class Meta:
        unique_together = ('candidat', 'cohorte')  # Une candidature par cohorte par personne

    def __str__(self):
        return f"Candidature {self.candidat} pour {self.cohorte}"