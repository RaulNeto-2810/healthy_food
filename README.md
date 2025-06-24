# Healthy Foods - Guia de Instalação

Este guia explica como configurar e executar tanto o backend quanto o frontend do projeto Healthy Foods.

## Backend (Django)

### Pré-requisitos
- Python 3.x instalado
- pip (gerenciador de pacotes Python)

### Passos de Instalação

1. Navegue até o diretório do backend:
```bash
cd backend
```

2. Crie um ambiente virtual (venv):
```bash
python -m venv venv
```

3. Ative o ambiente virtual:
- Windows:
```bash
venv\Scripts\activate
```
- Linux/Mac:
```bash
source venv/bin/activate
```

4. Instale as dependências:
```bash
pip install -r requirements.txt
```

5. Execute as migrações do banco de dados:
```bash
python manage.py migrate
```

6. Inicie o servidor:
```bash
python manage.py runserver
```

O backend estará disponível em `http://localhost:8000`

## Frontend (React + Vite)

### Pré-requisitos
- Node.js instalado (versão LTS recomendada)
- npm (gerenciador de pacotes Node.js)

### Passos de Instalação

1. Navegue até o diretório do frontend:
```bash
cd frontend/healthy-food
```

2. Instale as dependências:
```bash
npm install
```

3. Inicie o servidor de desenvolvimento:
```bash
npm run dev
```

O frontend estará disponível em `http://localhost:5173`

## Executando o Projeto Completo

1. Em um terminal, inicie o backend conforme os passos acima
2. Em outro terminal, inicie o frontend conforme os passos acima
3. Acesse `http://localhost:5173` no seu navegador para usar a aplicação

**Nota**: Certifique-se de manter tanto o backend quanto o frontend em execução simultaneamente para o funcionamento completo da aplicação.
