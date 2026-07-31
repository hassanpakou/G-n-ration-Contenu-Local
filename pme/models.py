from django.db import models
from candidatures.models import Candidat
from programmes.models import Cohorte

class PME(models.Model):
    STATUT_ARSP_CHOICES = [
        ('non_demande', 'Non demandée'),
        ('en_attente', 'En attente de validation'),
        ('obtenue', 'Attestation obtenue'),
        ('refusee', 'Refusée'),
    ]

    nom = models.CharField(max_length=200)
    description = models.TextField()
    secteur_activite = models.CharField(max_length=200)  # ex: Logistique, Maintenance, EIES, etc.
    date_creation = models.DateField()
    statut_arsp = models.CharField(max_length=20, choices=STATUT_ARSP_CHOICES, default='non_demande')
    numero_arsp = models.CharField(max_length=100, blank=True, null=True)  # Si obtenue
    business_plan = models.FileField(upload_to='business_plans/', blank=True, null=True)
    logo = models.ImageField(upload_to='logos_pme/', blank=True, null=True)
    site_web = models.URLField(blank=True, null=True)
    email_contact = models.EmailField()
    telephone_contact = models.CharField(max_length=20)

    # Lien avec les fondateurs (lauréats du programme)
    fondateurs = models.ManyToManyField(Candidat, related_name='pmes_creees')

    # Cohorte d'origine (optionnel)
    cohorte_origine = models.ForeignKey(Cohorte, on_delete=models.SET_NULL, null=True, blank=True)

    # Visibilité dans le catalogue public
    visible_catalogue = models.BooleanField(default=False)

    date_ajout = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = "PME"
        verbose_name_plural = "PMEs"

    def __str__(self):
        return self.nom