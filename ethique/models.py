from django.db import models

class ConseilSages(models.Model):
    nom = models.CharField(max_length=200)
    titre = models.CharField(max_length=300)  # ex: Ancien Premier Ministre
    organisation = models.CharField(max_length=200, blank=True)
    photo = models.ImageField(upload_to='conseil_sages/', blank=True, null=True)
    biographie = models.TextField()
    ordre_affichage = models.PositiveSmallIntegerField(default=1)

    def __str__(self):
        return self.nom

class ComiteSurveillance(models.Model):
    nom_organisation = models.CharField(max_length=200)  # ex: CENCO, ECC
    description = models.TextField()
    logo = models.ImageField(upload_to='comite_logos/', blank=True, null=True)
    representant_nom = models.CharField(max_length=200)
    representant_email = models.EmailField()
    date_ajout = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.nom_organisation

class AuditRapport(models.Model):
    comite = models.ForeignKey(ComiteSurveillance, on_delete=models.CASCADE, related_name='rapports')
    titre = models.CharField(max_length=255)
    date_publication = models.DateField()
    fichier_pdf = models.FileField(upload_to='audits/')
    resume = models.TextField()

    def __str__(self):
        return self.titre