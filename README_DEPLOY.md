# Deploy no Render - Healthy Food

## Configuração do Projeto

Este projeto está configurado para deploy no Render com as seguintes características:

### Frontend (React + Vite)
- **Tipo**: Static Site
- **Build Command**: `cd frontend && npm install && npm run build`
- **Publish Directory**: `frontend/dist`
- **Node Version**: 18+

### Backend (Django)
- **Tipo**: Web Service
- **Build Command**: `cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
- **Start Command**: `cd backend && python manage.py runserver 0.0.0.0:$PORT`
- **Python Version**: 3.11+

## Arquivos de Configuração

### 1. `render.yaml`
Arquivo de configuração principal do Render que define ambos os serviços.

### 2. `frontend/vite.config.js`
Configurado para:
- Build otimizado para produção
- Separação de chunks (vendor, utils)
- Base path relativo
- Configuração de servidor

### 3. `frontend/public/_redirects`
Arquivo para redirecionamento de rotas SPA no Render.

### 4. `frontend/build.sh`
Script de build para o frontend.

## Instruções de Deploy

### Opção 1: Deploy Automático via GitHub
1. Faça push do código para o GitHub
2. Conecte o repositório no Render
3. O Render detectará automaticamente o `render.yaml`
4. Os serviços serão criados automaticamente

### Opção 2: Deploy Manual
1. Acesse o [Render Dashboard](https://dashboard.render.com)
2. Clique em "New +"
3. Selecione "Blueprint"
4. Conecte seu repositório GitHub
5. O Render usará o arquivo `render.yaml`

### Opção 3: Deploy Separado dos Serviços

#### Frontend:
1. New + → Static Site
2. Connect GitHub repo
3. Build Command: `cd frontend && npm install && npm run build`
4. Publish Directory: `frontend/dist`

#### Backend:
1. New + → Web Service
2. Connect GitHub repo
3. Build Command: `cd backend && pip install -r requirements.txt && python manage.py collectstatic --noinput && python manage.py migrate`
4. Start Command: `cd backend && python manage.py runserver 0.0.0.0:$PORT`

## Variáveis de Ambiente

### Frontend
- `NODE_ENV`: production

### Backend
- `DJANGO_SETTINGS_MODULE`: core.settings
- `DEBUG`: False
- `ALLOWED_HOSTS`: *
- `DATABASE_URL`: (será configurado automaticamente pelo Render)

## Teste Local

### Frontend
```bash
cd frontend
npm install
npm run build
npm run preview
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

## Estrutura de Arquivos

```
projeto/
├── frontend/
│   ├── dist/           # Build files (gerado)
│   ├── public/
│   │   └── _redirects  # Redirecionamentos
│   ├── src/
│   ├── vite.config.js  # Configuração Vite
│   └── build.sh        # Script de build
├── backend/
│   └── (arquivos Django)
├── render.yaml         # Configuração Render
└── README_DEPLOY.md    # Este arquivo
```

## Solução de Problemas

### Build Falhando
- Verificar se todas as dependências estão no package.json
- Verificar se o Node.js está na versão correta
- Verificar logs de build no Render

### Roteamento não Funcionando
- Verificar se o arquivo `_redirects` está presente
- Verificar configuração de rotas no `render.yaml`

### Backend não Conectando
- Verificar variáveis de ambiente
- Verificar configurações do Django
- Verificar logs do serviço no Render

## URLs dos Serviços

Após o deploy, os serviços estarão disponíveis em:
- Frontend: `https://healthy-food-frontend.onrender.com`
- Backend API: `https://healthy-food-backend.onrender.com`

## Comandos Úteis

```bash
# Build local do frontend
npm run build

# Preview do build
npm run preview

# Verificar build
ls -la frontend/dist/

# Testar backend localmente
python manage.py runserver
