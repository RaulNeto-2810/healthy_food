from django.urls import path
from . import views, test_views

urlpatterns = [
    path('status/', views.api_status, name='api_status'),
    path('healthy-foods/', views.healthy_foods, name='healthy_foods'),
    path('test-connection/', views.test_connection, name='test_connection'),
    
    # Endpoints de teste para Render
    path('render-test/', test_views.render_test, name='render_test'),
    path('render-post-test/', test_views.render_post_test, name='render_post_test'),
    path('health/', test_views.health_check, name='health_check'),
]
