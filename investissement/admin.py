from django.contrib import admin
from .models import Investisseur, GuichetInvestissement, OpportuniteInvestissement, Transaction

@admin.register(Investisseur)
class InvestisseurAdmin(admin.ModelAdmin):
    list_display = ('nom', 'email', 'type_investisseur')

@admin.register(GuichetInvestissement)
class GuichetInvestissementAdmin(admin.ModelAdmin):
    list_display = ('nom', 'actif')

@admin.register(OpportuniteInvestissement)
class OpportuniteInvestissementAdmin(admin.ModelAdmin):
    list_display = ('titre', 'guichet', 'montant_recherche', 'actif')
    list_filter = ('guichet', 'actif')

@admin.register(Transaction)
class TransactionAdmin(admin.ModelAdmin):
    list_display = ('opportunite', 'investisseur', 'montant', 'statut', 'date_transaction')
    list_filter = ('statut',)