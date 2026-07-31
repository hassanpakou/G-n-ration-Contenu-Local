from django.contrib import admin
from .models import ConseilSages, ComiteSurveillance, AuditRapport

@admin.register(ConseilSages)
class ConseilSagesAdmin(admin.ModelAdmin):
    list_display = ('nom', 'titre', 'ordre_affichage')

@admin.register(ComiteSurveillance)
class ComiteSurveillanceAdmin(admin.ModelAdmin):
    list_display = ('nom_organisation', 'representant_nom', 'representant_email')

@admin.register(AuditRapport)
class AuditRapportAdmin(admin.ModelAdmin):
    list_display = ('titre', 'comite', 'date_publication')