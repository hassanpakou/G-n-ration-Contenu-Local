from django.db import models
from pme.models import PME
from candidatures.models import Candidat
from programmes.models import Cohorte

class Investisseur(models.Model):
    TYPE_CHOICES = [
        ('particulier', 'Particulier'),
        ('entreprise', 'Entreprise'),
        ('institution', 'Institution/Bailleur'),
    ]
    nom = models.CharField(max_length=200)
    email = models.EmailField(unique=True, max_length=250)
    type_investisseur = models.CharField(max_length=20, choices=TYPE_CHOICES)
    telephone = models.CharField(max_length=20, blank=True)
    organisation = models.CharField(max_length=200, blank=True)  # si entreprise/institution
    date_inscription = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom

class GuichetInvestissement(models.Model):
    """Correspond aux 3 guichets du site"""
    NOM_CHOICES = [
        ('soutenir_projet', 'Soutenir un Projet (Amorçage & Prototypage)'),
        ('investir_pme', 'Investir dans une sPME (Capital-Développement)'),
        ('seed_fund', 'Le GCL Seed Fund (Grands Bailleurs)'),
    ]
    nom = models.CharField(max_length=50, choices=NOM_CHOICES, unique=True)
    description = models.TextField()
    actif = models.BooleanField(default=True)

    def __str__(self):
        return self.get_nom_display()

class OpportuniteInvestissement(models.Model):
    """Un projet ou une PME à financer"""
    guichet = models.ForeignKey(GuichetInvestissement, on_delete=models.CASCADE)
    titre = models.CharField(max_length=255)
    description = models.TextField()
    montant_recherche = models.DecimalField(max_digits=12, decimal_places=2)
    # Pour les prototypes (mémoire-projet)
    candidat = models.ForeignKey(Candidat, on_delete=models.SET_NULL, null=True, blank=True, related_name='opportunites_investissement')
    # Pour les sPME
    pme = models.ForeignKey(PME, on_delete=models.SET_NULL, null=True, blank=True, related_name='opportunites_investissement')
    # Fichiers
    pitch_deck = models.FileField(upload_to='pitch_decks/', blank=True, null=True)
    date_creation = models.DateTimeField(auto_now_add=True)
    actif = models.BooleanField(default=True)

    def __str__(self):
        return self.titre

class Transaction(models.Model):
    STATUTS = [
        ('initiee', 'Initiée'),
        ('en_attente', 'En attente de validation'),
        ('completee', 'Complétée'),
        ('annulee', 'Annulée'),
    ]
    opportunite = models.ForeignKey(OpportuniteInvestissement, on_delete=models.CASCADE, related_name='transactions')
    investisseur = models.ForeignKey(Investisseur, on_delete=models.CASCADE)
    montant = models.DecimalField(max_digits=12, decimal_places=2)
    date_transaction = models.DateTimeField(auto_now_add=True)
    statut = models.CharField(max_length=20, choices=STATUTS, default='initiee')
    commentaire = models.TextField(blank=True)

    def __str__(self):
        return f"{self.investisseur} -> {self.opportunite} ({self.montant})"