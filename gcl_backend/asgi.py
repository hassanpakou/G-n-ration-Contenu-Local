"""
ASGI config for gcl_backend project.
"""
import os
from django.core.asgi import get_asgi_application
from whitenoise import WhiteNoise

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'gcl_backend.settings')

application = get_asgi_application()
application = WhiteNoise(application)