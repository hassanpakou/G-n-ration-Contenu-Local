from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions
from .serializers import InscriptionSerializer
from django.contrib.auth.models import User

from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from candidatures.models import Candidat

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def user_detail(request):
    user = request.user
    data = {
        'id': user.id,
        'email': user.email,
        'username': user.username,
    }
    if hasattr(user, 'candidat'):
        data['candidat_id'] = user.candidat.id
    return Response(data)
class InscriptionView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = InscriptionSerializer