from django.db import models
from pme.models import PME
from programmes.models import Cohorte
from candidatures.models import Candidat  # pour les mémoires-projets

class EntreprisePublique(models.Model):
    """Ex : SNEL, REGIDESO, ONATRA, GÉCAMINES"""
    nom = models.CharField(max_length=200)
    sigle = models.CharField(max_length=50, unique=True)
    description = models.TextField(blank=True)
    secteur = models.CharField(max_length=200)
    contact_email = models.EmailField()
    logo = models.ImageField(upload_to='logos_ep/', blank=True, null=True)
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.sigle} - {self.nom}"

class DefiTechnologique(models.Model):
    STATUTS = [
        ('ouvert', 'Ouvert'),
        ('en_cours', 'En cours de résolution'),
        ('resolu', 'Résolu'),
        ('ferme', 'Fermé'),
    ]
    entreprise = models.ForeignKey(EntreprisePublique, on_delete=models.CASCADE, related_name='defis')
    titre = models.CharField(max_length=255)
    description = models.TextField()
    domaine = models.CharField(max_length=200)  # ex: Énergie, Eau, Transport
    date_publication = models.DateTimeField(auto_now_add=True)
    date_limite = models.DateField(blank=True, null=True)
    statut = models.CharField(max_length=20, choices=STATUTS, default='ouvert')
    budget_indicatif = models.DecimalField(max_digits=12, decimal_places=2, blank=True, null=True)

    def __str__(self):
        return f"Défi {self.titre} ({self.entreprise.sigle})"

class SolutionLocale(models.Model):
    """Solution proposée par une PME ou un étudiant (mémoire-projet) à un défi"""
    defi = models.ForeignKey(DefiTechnologique, on_delete=models.CASCADE, related_name='solutions')
    titre_solution = models.CharField(max_length=255)
    description = models.TextField()
    fichier_presentation = models.FileField(upload_to='solutions/', blank=True, null=True)
    # Porteur de la solution : peut être une PME existante, un candidat (mémoire), ou un contact libre
    pme = models.ForeignKey(PME, on_delete=models.SET_NULL, null=True, blank=True, related_name='solutions')
    candidat = models.ForeignKey(Candidat, on_delete=models.SET_NULL, null=True, blank=True, related_name='solutions')
    contact_nom = models.CharField(max_length=200, blank=True)  # si pas de lien direct
    contact_email = models.EmailField(blank=True)
    date_soumission = models.DateTimeField(auto_now_add=True)
    statut = models.CharField(max_length=20, choices=[
        ('soumise', 'Soumise'),
        ('en_evaluation', 'En évaluation'),
        ('acceptee', 'Acceptée'),
        ('refusee', 'Refusée'),
    ], default='soumise')

    def __str__(self):
        return f"Solution {self.titre_solution} pour {self.defi.titre}"