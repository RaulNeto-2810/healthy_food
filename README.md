# Healthy Food

Projeto de aplicação web para comidas saudáveis com React (frontend) e Django (backend).

## Estrutura do Projeto

```
/
├── frontend/          # Aplicação React com Bootstrap
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── backend/           # API Django REST Framework
    ├── api/           # App Django principal
    ├── core/          # Configurações do Django
    ├── venv/          # Ambiente virtual Python
    └── manage.py
```

## Tecnologias Utilizadas

### Frontend
- React 18
- Vite (build tool)
- Bootstrap 5
- JavaScript

### Backend
- Django 5.2
- Django REST Framework
- PostgreSQL (Render)
- JWT Authentication

## Como Executar

### Backend

1. Navegue até a pasta backend:
```bash
cd backend
```

2. Ative o ambiente virtual:
```bash
# Windows
.\venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. Execute o servidor:
```bash
python manage.py runserver
```

O backend estará disponível em:
- API: http://localhost:8000/api/
- Admin: http://localhost:8000/admin/
- Autenticação: http://localhost:8000/api/token/

### Frontend

1. Navegue até a pasta frontend:
```bash
cd frontend
```

2. Execute o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em: http://localhost:5173

## Configuração do Banco de Dados

O projeto está configurado para usar PostgreSQL hospedado no Render. As configurações estão em `backend/core/settings.py`.

## Deploy no Render

O projeto está preparado para deploy no Render com:

### Backend:
- `requirements.txt` com todas as dependências Python
- Configuração PostgreSQL pronta
- CORS configurado para produção

### Dependências Python (requirements.txt):
```
Django==5.2.4
djangorestframework==3.16.0
django-cors-headers==4.7.0
djangorestframework-simplejwt==5.5.0
psycopg2-binary==2.9.10
```

## Credenciais de Administração

- **Username:** Raul
- **Email:** iftm.raul@gmail.com
- **Senha:** (configurada durante a criação)

## Testando a Conexão Frontend-Backend

O projeto inclui uma demonstração funcional da conexão entre frontend e backend:

### Endpoints da API disponíveis:
- `GET /api/status/` - Status da API
- `GET /api/healthy-foods/` - Lista de comidas saudáveis
- `POST /api/test-connection/` - Teste de conexão POST
- `POST /api/token/` - Autenticação JWT

### Interface de Teste:
O frontend inclui uma interface completa para testar:
- ✅ Verificação automática de conexão
- ✅ Exibição de dados da API
- ✅ Teste de requisições POST
- ✅ Tratamento de erros
- ✅ Interface Bootstrap responsiva

### Para testar:
1. Inicie o backend: `python manage.py runserver`
2. Inicie o frontend: `npm run dev`
3. Acesse http://localhost:5173
4. A página mostrará automaticamente se a conexão está funcionando

## Próximos Passos

1. Desenvolver modelos do Django (models.py)
2. Criar serializers e views da API
3. Implementar componentes React
4. Configurar roteamento do frontend
5. Implementar autenticação no frontend
