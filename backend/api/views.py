from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken

@api_view(['GET'])
@permission_classes([AllowAny])
def api_status(request):
    """
    Endpoint para verificar se a API está funcionando
    """
    return Response({
        'status': 'API funcionando!',
        'message': 'Backend Django conectado com sucesso',
        'version': '1.0.0'
    })

@api_view(['GET'])
@permission_classes([AllowAny])
def healthy_foods(request):
    """
    Endpoint para listar comidas saudáveis (dados de exemplo)
    """
    foods = [
        {
            'id': 1,
            'nome': 'Quinoa',
            'categoria': 'Grão',
            'beneficios': 'Rica em proteínas e fibras',
            'calorias': 120
        },
        {
            'id': 2,
            'nome': 'Abacate',
            'categoria': 'Fruta',
            'beneficios': 'Rico em gorduras boas e vitaminas',
            'calorias': 160
        },
        {
            'id': 3,
            'nome': 'Salmão',
            'categoria': 'Peixe',
            'beneficios': 'Ômega-3 e proteínas de alta qualidade',
            'calorias': 208
        },
        {
            'id': 4,
            'nome': 'Espinafre',
            'categoria': 'Vegetal',
            'beneficios': 'Rico em ferro e vitaminas',
            'calorias': 23
        }
    ]
    
    return Response({
        'foods': foods,
        'total': len(foods)
    })

@api_view(['POST'])
@permission_classes([AllowAny])
def test_connection(request):
    """
    Endpoint para testar conexão POST
    """
    data = request.data
    return Response({
        'message': 'Dados recebidos com sucesso!',
        'received_data': data,
        'timestamp': '2025-01-07'
    })
