from django.contrib import admin
from .models import EntreprisePublique, DefiTechnologique, SolutionLocale

@admin.register(EntreprisePublique)
class EntreprisePubliqueAdmin(admin.ModelAdmin):
    list_display = ('sigle', 'nom', 'secteur')

@admin.register(DefiTechnologique)
class DefiTechnologiqueAdmin(admin.ModelAdmin):
    list_display = ('titre', 'entreprise', 'statut', 'date_publication', 'date_limite')
    list_filter = ('statut', 'entreprise')
    search_fields = ('titre',)

@admin.register(SolutionLocale)
class SolutionLocaleAdmin(admin.ModelAdmin):
    list_display = ('titre_solution', 'defi', 'statut', 'date_soumission')
    list_filter = ('statut',)