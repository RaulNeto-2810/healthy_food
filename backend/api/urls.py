from django.urls import path
from . import views

urlpatterns = [
    path('status/', views.api_status, name='api_status'),
    path('healthy-foods/', views.healthy_foods, name='healthy_foods'),
    path('test-connection/', views.test_connection, name='test_connection'),
]
