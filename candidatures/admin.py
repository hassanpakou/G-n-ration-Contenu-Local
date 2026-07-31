from django.contrib import admin
from .models import Candidat, DossierCandidature

@admin.register(Candidat)
class CandidatAdmin(admin.ModelAdmin):
    list_display = ('nom', 'prenom', 'email', 'province_residence', 'date_inscription')
    search_fields = ('nom', 'prenom', 'email')

@admin.register(DossierCandidature)
class DossierCandidatureAdmin(admin.ModelAdmin):
    list_display = ('candidat', 'cohorte', 'statut', 'date_soumission')
    list_filter = ('statut', 'cohorte')
    search_fields = ('candidat__nom', 'candidat__prenom')