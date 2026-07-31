from django.db import models
from pme.models import PME

class OpportuniteSousTraitance(models.Model):
    SECTEURS = [
        ('mines', 'Mines'),
        ('logistique', 'Logistique & Transport'),
        ('maintenance', 'Maintenance industrielle'),
        ('rse', 'RSE & Développement communautaire'),
        ('energie', 'Énergie'),
        ('eau', 'Eau'),
        ('telecoms', 'Télécommunications'),
        ('autre', 'Autre'),
    ]
    titre = models.CharField(max_length=255)
    description = models.TextField()
    secteur = models.CharField(max_length=50, choices=SECTEURS)
    localisation = models.CharField(max_length=200)  # ex: Kolwezi, Kalemie, axe Lubumbashi-Kasumbalesa
    entreprise_donneur_ordre = models.CharField(max_length=200)  # ex: Glencore, SNEL
    date_publication = models.DateTimeField(auto_now_add=True)
    date_limite = models.DateField()
    budget_indicatif = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)
    contact_email = models.EmailField()
    document_appel_offre = models.FileField(upload_to='appels_offres/', blank=True, null=True)

    def __str__(self):
        return self.titre

class CorridorLogistique(models.Model):
    """Axes stratégiques : Kolwezi-Kasumbalesa, Kalemie-Manono, etc."""
    nom = models.CharField(max_length=200)
    description = models.TextField()
    points_depart_arrivee = models.CharField(max_length=200)
    carte = models.ImageField(upload_to='corridors/', blank=True, null=True)

    def __str__(self):
        return self.nom

class OffreService(models.Model):
    """Services proposés par les PME pour les corridors logistiques"""
    pme = models.ForeignKey(PME, on_delete=models.CASCADE, related_name='offres_services')
    corridor = models.ForeignKey(CorridorLogistique, on_delete=models.CASCADE, related_name='offres')
    description_service = models.TextField()
    contact_email = models.EmailField()
    contact_telephone = models.CharField(max_length=20)
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Offre de {self.pme.nom} sur {self.corridor.nom}"