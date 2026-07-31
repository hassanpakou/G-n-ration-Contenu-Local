from django.contrib import admin
from .models import PME

@admin.register(PME)
class PMEAdmin(admin.ModelAdmin):
    list_display = ('nom', 'secteur_activite', 'statut_arsp', 'visible_catalogue', 'date_ajout')
    list_filter = ('statut_arsp', 'visible_catalogue', 'secteur_activite')
    search_fields = ('nom', 'description')