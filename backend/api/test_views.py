from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
import os
import sys
import django
from django.conf import settings
from django.db import connection

@api_view(['GET'])
@permission_classes([AllowAny])
def render_test(request):
    """
    Endpoint específico para testar deploy no Render
    """
    try:
        # Testar conexão com banco de dados
        with connection.cursor() as cursor:
            cursor.execute("SELECT version();")
            db_version = cursor.fetchone()[0]
        
        db_status = "✅ Conectado"
        db_info = db_version
    except Exception as e:
        db_status = "❌ Erro de conexão"
        db_info = str(e)
    
    # Informações do sistema
    system_info = {
        'python_version': sys.version,
        'django_version': django.get_version(),
        'environment': 'Production' if not settings.DEBUG else 'Development',
        'database': {
            'status': db_status,
            'info': db_info,
            'engine': settings.DATABASES['default']['ENGINE'],
            'name': settings.DATABASES['default']['NAME'],
            'host': settings.DATABASES['default']['HOST'],
        },
        'allowed_hosts': settings.ALLOWED_HOSTS,
        'cors_origins': getattr(settings, 'CORS_ALLOWED_ORIGINS', []),
        'installed_apps': settings.INSTALLED_APPS,
        'static_url': settings.STATIC_URL,
        'media_url': settings.MEDIA_URL,
    }
    
    # Variáveis de ambiente (sem dados sensíveis)
    env_vars = {}
    for key in os.environ:
        if not any(sensitive in key.lower() for sensitive in ['password', 'secret', 'key', 'token']):
            env_vars[key] = os.environ[key]
    
    return Response({
        'message': '🎉 Deploy no Render funcionando!',
        'status': 'success',
        'timestamp': '2025-01-07',
        'system_info': system_info,
        'environment_variables': env_vars,
        'request_info': {
            'method': request.method,
            'path': request.path,
            'headers': dict(request.headers),
            'user_agent': request.META.get('HTTP_USER_AGENT', 'Unknown'),
            'remote_addr': request.META.get('REMOTE_ADDR', 'Unknown'),
        }
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def render_post_test(request):
    """
    Teste de requisição POST para o Render
    """
    data = request.data
    
    return Response({
        'message': '✅ POST funcionando no Render!',
        'received_data': data,
        'timestamp': '2025-01-07',
        'server_info': {
            'python_version': sys.version.split()[0],
            'django_version': django.get_version(),
            'environment': 'Production' if not settings.DEBUG else 'Development',
        }
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def health_check(request):
    """
    Health check simples para monitoramento
    """
    try:
        # Verificar banco de dados
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        
        return Response({
            'status': 'healthy',
            'database': 'connected',
            'timestamp': '2025-01-07'
        })
    except Exception as e:
        return Response({
            'status': 'unhealthy',
            'database': 'disconnected',
            'error': str(e),
            'timestamp': '2025-01-07'
        }, status=500)
