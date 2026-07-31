from django.http import JsonResponse

def home(request):
    return JsonResponse({
        "message": "Bienvenue sur l'API Génération Contenu Local",
        "version": "1.0",
        "endpoints": {
            "admin": "/admin/",
            "api": "/api/",
            "hubs": "/api/hubs/"
        }
    })