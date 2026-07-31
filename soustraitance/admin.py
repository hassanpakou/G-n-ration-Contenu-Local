from django.contrib import admin
from .models import OpportuniteSousTraitance, CorridorLogistique, OffreService

@admin.register(OpportuniteSousTraitance)
class OpportuniteSousTraitanceAdmin(admin.ModelAdmin):
    list_display = ('titre', 'secteur', 'entreprise_donneur_ordre', 'date_limite')
    list_filter = ('secteur',)
    search_fields = ('titre',)

@admin.register(CorridorLogistique)
class CorridorLogistiqueAdmin(admin.ModelAdmin):
    list_display = ('nom', 'points_depart_arrivee')

@admin.register(OffreService)
class OffreServiceAdmin(admin.ModelAdmin):
    list_display = ('pme', 'corridor', 'date_ajout')