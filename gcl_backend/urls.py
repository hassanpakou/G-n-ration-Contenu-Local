from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from django.conf import settings
from django.conf.urls.static import static

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView, TokenObtainPairView
from comptes.serializers import EmailTokenObtainPairSerializer
from programmes.views import HubViewSet, CohorteViewSet
from candidatures.views import DossierCandidatureViewSet
from pme.views import PMEViewSet
from portefeuille.views import (
    EntreprisePubliqueViewSet,
    DefiTechnologiqueViewSet,
    SolutionLocaleViewSet,
)
from soustraitance.views import (
    OpportuniteSousTraitanceViewSet,
    CorridorLogistiqueViewSet,
    OffreServiceViewSet,
)
from investissement.views import (
    GuichetInvestissementViewSet,
    OpportuniteInvestissementViewSet,
    TransactionViewSet,
)
from ethique.views import (
    ConseilSagesViewSet,
    ComiteSurveillanceViewSet,
    AuditRapportViewSet,
)

router = DefaultRouter()
router.register(r'hubs', HubViewSet)
router.register(r'dossiers', DossierCandidatureViewSet)
router.register(r'pme', PMEViewSet)
router.register(r'entreprises-publiques', EntreprisePubliqueViewSet)
router.register(r'defis-technologiques', DefiTechnologiqueViewSet)
router.register(r'solutions-locales', SolutionLocaleViewSet)
router.register(r'opportunites-sous-traitance', OpportuniteSousTraitanceViewSet)
router.register(r'corridors-logistiques', CorridorLogistiqueViewSet)
router.register(r'offres-services', OffreServiceViewSet)
router.register(r'guichets-investissement', GuichetInvestissementViewSet)
router.register(r'opportunites-investissement', OpportuniteInvestissementViewSet)
router.register(r'transactions', TransactionViewSet)
router.register(r'conseil-sages', ConseilSagesViewSet)
router.register(r'comites-surveillance', ComiteSurveillanceViewSet)
router.register(r'audits', AuditRapportViewSet)
router.register(r'cohortes', CohorteViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
    path('api/auth/login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/', include('comptes.urls')),
    path('api/auth/login/', TokenObtainPairView.as_view(serializer_class=EmailTokenObtainPairSerializer), name='token_obtain_pair'),
    path('', RedirectView.as_view(url='/api/', permanent=False)),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)