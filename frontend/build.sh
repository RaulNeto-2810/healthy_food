#!/bin/bash

# Script de build para Render
echo "Iniciando build do frontend..."

# Instalar dependências
npm install

# Fazer build da aplicação
npm run build

echo "Build concluído!"
