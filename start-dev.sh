#!/bin/bash
# Script simplificado para iniciar solo el frontend en el puerto 5173

# Colores para mensajes
GREEN='\033[0;32m'
YELLOW='\033[0;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Iniciando frontend en puerto 5173 ===${NC}"

# Verificar dependencias
if ! command -v npm &> /dev/null; then
    echo -e "${RED}Error: npm no está instalado. Por favor instale Node.js y npm.${NC}"
    exit 1
fi

# Verificar si node_modules existe
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}Instalando dependencias...${NC}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${RED}Error: No se pudieron instalar las dependencias.${NC}"
        exit 1
    fi
fi

# Verificar puerto 5173
echo -e "${YELLOW}Verificando puerto 5173...${NC}"
if lsof -i:5173 > /dev/null; then
    echo -e "${YELLOW}Deteniendo proceso en el puerto 5173...${NC}"
    pkill -f "vite"
    sleep 2
    if lsof -i:5173 > /dev/null; then
        echo -e "${RED}No se pudo liberar el puerto 5173. Por favor ciérrelo manualmente.${NC}"
        exit 1
    fi
fi

# Iniciar solo el frontend
echo -e "${GREEN}Iniciando servidor frontend...${NC}" 
npm run dev

# Nota: Si necesitas la API, usa la versión desplegada en producción
# o inicia el worker manualmente en otro terminal con:
# npx wrangler dev --port 3000
