from django.db import models

class Province(models.Model):
    nom = models.CharField(max_length=100)
    code = models.CharField(max_length=5, unique=True)  # ex: HK, LU, TA, LO
    chef_lieu = models.CharField(max_length=100)

    class Meta:
        verbose_name = "Province"
        verbose_name_plural = "Provinces"

    def __str__(self):
        return self.nom

class Hub(models.Model):
    nom = models.CharField(max_length=200)
    province = models.OneToOneField(Province, on_delete=models.CASCADE)
    focus_minier = models.TextField()
    specialisation_pedagogique = models.TextField()

    def __str__(self):
        return f"Hub {self.nom} ({self.province.code})"

class ModuleFormation(models.Model):
    numero = models.PositiveSmallIntegerField()
    intitule = models.CharField(max_length=255)
    focalisation_technique = models.TextField()
    livrable = models.CharField(max_length=255)

    def __str__(self):
        return f"Module {self.numero} : {self.intitule}"

class ProgrammeGCL(models.Model):
    nom = models.CharField(max_length=255, default="Génération Contenu Local 2026")
    description = models.TextField()
    duree_jours = models.PositiveSmallIntegerField(default=23)
    date_debut = models.DateField()
    date_fin = models.DateField()
    modules = models.ManyToManyField(ModuleFormation, related_name='programmes')
    objectif_general = models.TextField()

    def __str__(self):
        return self.nom

class Cohorte(models.Model):
    programme = models.ForeignKey(ProgrammeGCL, on_delete=models.CASCADE)
    hub = models.ForeignKey(Hub, on_delete=models.CASCADE)
    date_debut = models.DateField()
    date_fin = models.DateField()
    nombre_candidats_prevus = models.PositiveIntegerField(default=50)
    nombre_femmes_min = models.PositiveIntegerField(default=20)

    class Meta:
        unique_together = ('programme', 'hub', 'date_debut')

    def __str__(self):
        return f"Cohorte {self.hub} - {self.date_debut}"

class DemoDay(models.Model):
    cohorte = models.OneToOneField(Cohorte, on_delete=models.CASCADE)
    date = models.DateField()
    lieu = models.CharField(max_length=200)
    jury_membres = models.TextField()  # Pour simplifier, à améliorer plus tard

    def __str__(self):
        return f"DemoDay {self.cohorte}"