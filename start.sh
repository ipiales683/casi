#!/bin/bash

echo "🚀 Iniciando Sistema Legal Profesional..."
echo "========================================"

# Verificar si Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js no está instalado"
    echo "Por favor instala Node.js desde https://nodejs.org/"
    exit 1
fi

# Verificar si npm está instalado
if ! command -v npm &> /dev/null; then
    echo "❌ Error: npm no está instalado"
    exit 1
fi

echo "✅ Node.js y npm detectados"

# Instalar dependencias si no están instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependencias..."
    npm install
fi

echo "🌐 Iniciando servidor de desarrollo..."
echo "📍 El sistema estará disponible en: http://localhost:5173"
echo "🔄 Presiona Ctrl+C para detener el servidor"
echo ""

# Iniciar el servidor de desarrollo
npm run dev
