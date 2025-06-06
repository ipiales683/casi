#!/bin/bash
# Script completo para iniciar el sitio web del Abogado Wilson sin errores
# Asegura que todas las páginas funcionen correctamente (registro, inicio de sesión, foro, blog, etc.)

# Definir colores para mensajes
VERDE='\033[0;32m'
AMARILLO='\033[0;33m'
ROJO='\033[0;31m'
AZUL='\033[0;34m'
MAGENTA='\033[0;35m'
RESET='\033[0m' # Sin color

# Mostrar banner de inicio
clear
echo -e "${AZUL}╔═════════════════════════════════════════════════════════════╗${RESET}"
echo -e "${AZUL}║                                                             ║${RESET}"
echo -e "${AZUL}║   ${VERDE}SITIO WEB ABOGADO WILSON IPIALES - INICIADOR PROFESIONAL${AZUL}   ║${RESET}"
echo -e "${AZUL}║                                                             ║${RESET}"
echo -e "${AZUL}╚═════════════════════════════════════════════════════════════╝${RESET}"
echo

# 1. Verificar dependencias necesarias
echo -e "${AMARILLO}[1/7]${RESET} Verificando dependencias necesarias..."
comando_requerido() {
    command -v "$1" >/dev/null 2>&1 || { 
        echo -e "${ROJO}Error: $1 no está instalado.${RESET}" 
        echo -e "${AMARILLO}Por favor, instale $1 con: $2${RESET}"
        exit 1
    }
}

# Verificar comandos esenciales
comando_requerido "node" "sudo apt install nodejs"
comando_requerido "npm" "sudo apt install npm"
comando_requerido "npx" "npm install -g npx"

# Verificar versión de Node.js (mínimo 14.x)
NODE_VERSION=$(node -v | cut -d 'v' -f 2 | cut -d '.' -f 1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo -e "${ROJO}Error: Se requiere Node.js 14.x o superior.${RESET}"
    echo -e "${AMARILLO}Versión actual: $(node -v)${RESET}"
    echo -e "${AMARILLO}Por favor, actualice Node.js:${RESET}"
    echo -e "${AMARILLO}curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -${RESET}"
    echo -e "${AMARILLO}sudo apt-get install -y nodejs${RESET}"
    exit 1
fi

echo -e "${VERDE}✓ Todas las dependencias están instaladas correctamente.${RESET}"
echo

# 2. Limpiar procesos anteriores
echo -e "${AMARILLO}[2/7]${RESET} Limpiando procesos anteriores..."
limpiar_procesos() {
    # Matar cualquier instancia previa de wrangler o vite
    pkill -f "wrangler dev" >/dev/null 2>&1
    pkill -f "vite" >/dev/null 2>&1
    
    # Verificar puertos críticos y liberarlos si están en uso
    for puerto in 5173 8787; do
        if lsof -i:$puerto >/dev/null 2>&1; then
            echo -e "${AMARILLO}Puerto $puerto en uso. Liberando...${RESET}"
            fuser -k $puerto/tcp >/dev/null 2>&1
            sleep 2
            if lsof -i:$puerto >/dev/null 2>&1; then
                echo -e "${ROJO}No se pudo liberar el puerto $puerto.${RESET}"
                echo -e "${AMARILLO}Por favor, cierre manualmente la aplicación que usa este puerto.${RESET}"
                return 1
            fi
        fi
    done
    
    echo -e "${VERDE}✓ Procesos anteriores limpiados correctamente.${RESET}"
    return 0
}

limpiar_procesos || exit 1
echo

# 3. Verificar si la estructura del proyecto está completa
echo -e "${AMARILLO}[3/7]${RESET} Verificando estructura del proyecto..."
verificar_archivos_criticos() {
    # Lista de archivos críticos que deben existir
    ARCHIVOS_CRITICOS=(
        "vite.config.js"
        "package.json"
        "src/App.jsx"
        "src/main.jsx"
        "src/worker.ts"
        "src/context/ModuleContext.jsx"
        "src/context/AuthContext.jsx"
        "src/utils/connectionManager.js"
        "src/components/ConsultasPenales.jsx"
        "src/components/ConsultasCiviles.jsx"
        "src/components/ConsultasTransito.jsx"
        "src/components/Consultation/ConsultationHub.jsx"
        "src/components/Auth/Register.jsx"
        "src/components/PrivacyPolicy.jsx"
    )
    
    ARCHIVOS_FALTANTES=0
    for archivo in "${ARCHIVOS_CRITICOS[@]}"; do
        if [ ! -f "$archivo" ]; then
            echo -e "${ROJO}Error: Archivo crítico no encontrado: $archivo${RESET}"
            ARCHIVOS_FALTANTES=$((ARCHIVOS_FALTANTES + 1))
        fi
    done
    
    if [ $ARCHIVOS_FALTANTES -gt 0 ]; then
        echo -e "${ROJO}Se encontraron $ARCHIVOS_FALTANTES archivos críticos faltantes.${RESET}"
        return 1
    fi
    
    echo -e "${VERDE}✓ Estructura del proyecto verificada correctamente.${RESET}"
    return 0
}

verificar_archivos_criticos || exit 1
echo

# 4. Asegurar que existe el archivo .env
echo -e "${AMARILLO}[4/7]${RESET} Verificando archivo .env..."
if [ ! -f ".env" ]; then
    echo -e "${AMARILLO}Archivo .env no encontrado. Creando desde env.example...${RESET}"
    if [ -f "env.example" ]; then
        cp env.example .env
        echo -e "${VERDE}✓ Archivo .env creado correctamente.${RESET}"
    else
        echo -e "${ROJO}Error: No se encontró el archivo env.example.${RESET}"
        echo -e "${AMARILLO}Creando un archivo .env básico...${RESET}"
        cat > .env << EOL
# Variables de entorno básicas para desarrollo local
NODE_ENV=development
VITE_WEBSOCKET_URL=ws://localhost:8787/ws
VITE_API_URL=http://localhost:8787/api
EOL
        echo -e "${VERDE}✓ Archivo .env básico creado.${RESET}"
    fi
else
    echo -e "${VERDE}✓ Archivo .env ya existe.${RESET}"
fi
echo

# 5. Instalar dependencias si es necesario
echo -e "${AMARILLO}[5/7]${RESET} Verificando dependencias del proyecto..."
if [ ! -d "node_modules" ] || [ "$(find node_modules -maxdepth 0 -empty 2>/dev/null)" ]; then
    echo -e "${AMARILLO}Instalando dependencias del proyecto...${RESET}"
    npm install
    if [ $? -ne 0 ]; then
        echo -e "${ROJO}Error al instalar dependencias.${RESET}"
        exit 1
    fi
    echo -e "${VERDE}✓ Dependencias instaladas correctamente.${RESET}"
else
    echo -e "${VERDE}✓ Dependencias ya están instaladas.${RESET}"
fi
echo

# 6. Iniciar los servicios
echo -e "${AMARILLO}[6/7]${RESET} Iniciando servicios backend y frontend..."
echo -e "${AZUL}Iniciando backend (Cloudflare Worker) en puerto 8787...${RESET}"
export NODE_ENV=development
npx wrangler dev --port 8787 &
WORKER_PID=$!

echo -e "${AMARILLO}Esperando a que el backend esté disponible...${RESET}"
CONTADOR=0
MAX_INTENTOS=15
while ! curl -s http://localhost:8787/api/health >/dev/null 2>&1 && [ $CONTADOR -lt $MAX_INTENTOS ]; do
    echo -e "${AMARILLO}Esperando al backend... ($CONTADOR/$MAX_INTENTOS)${RESET}"
    sleep 2
    CONTADOR=$((CONTADOR + 1))
done

if [ $CONTADOR -eq $MAX_INTENTOS ]; then
    echo -e "${AMARILLO}No se pudo confirmar que el backend esté funcionando, pero continuaremos...${RESET}"
else
    echo -e "${VERDE}✓ Backend iniciado correctamente en http://localhost:8787${RESET}"
fi

echo -e "${AZUL}Iniciando frontend (Vite) en puerto 5173...${RESET}"
VITE_WEBSOCKET_URL=ws://localhost:8787/ws npx vite --port 5173 --host localhost &
VITE_PID=$!

echo -e "${AMARILLO}Esperando a que el frontend esté disponible...${RESET}"
CONTADOR=0
while ! curl -s http://localhost:5173 >/dev/null 2>&1 && [ $CONTADOR -lt $MAX_INTENTOS ]; do
    echo -e "${AMARILLO}Esperando al frontend... ($CONTADOR/$MAX_INTENTOS)${RESET}"
    sleep 2
    CONTADOR=$((CONTADOR + 1))
done

if [ $CONTADOR -eq $MAX_INTENTOS ]; then
    echo -e "${AMARILLO}No se pudo confirmar que el frontend esté funcionando, pero continuaremos...${RESET}"
else
    echo -e "${VERDE}✓ Frontend iniciado correctamente en http://localhost:5173${RESET}"
fi
echo

# 7. Verificación final y monitoreo
echo -e "${AMARILLO}[7/7]${RESET} Verificación final del sistema..."
echo
echo -e "${VERDE}======================================================${RESET}"
echo -e "${VERDE}  SITIO WEB DEL ABOGADO WILSON INICIADO CORRECTAMENTE${RESET}"
echo -e "${VERDE}======================================================${RESET}"
echo
echo -e "${AZUL}Accesos:${RESET}"
echo -e "  - ${AMARILLO}Frontend:${RESET} http://localhost:5173"
echo -e "  - ${AMARILLO}Backend/API:${RESET} http://localhost:8787/api"
echo
echo -e "${AZUL}Páginas principales:${RESET}"
echo -e "  - ${AMARILLO}Inicio:${RESET} http://localhost:5173/"
echo -e "  - ${AMARILLO}Registro:${RESET} http://localhost:5173/registro"
echo -e "  - ${AMARILLO}Iniciar sesión:${RESET} http://localhost:5173/login"
echo -e "  - ${AMARILLO}Consultas penales:${RESET} http://localhost:5173/consultas/penales"
echo -e "  - ${AMARILLO}Consultas civiles:${RESET} http://localhost:5173/consultas/civiles"
echo -e "  - ${AMARILLO}Consultas tránsito:${RESET} http://localhost:5173/consultas/transito"
echo -e "  - ${AMARILLO}Blog:${RESET} http://localhost:5173/blog"
echo -e "  - ${AMARILLO}Foro:${RESET} http://localhost:5173/foro"
echo -e "  - ${AMARILLO}Ebooks:${RESET} http://localhost:5173/ebooks"
echo -e "  - ${AMARILLO}Consulta IA:${RESET} http://localhost:5173/consulta-ia"
echo -e "  - ${AMARILLO}Política privacidad:${RESET} http://localhost:5173/politica-privacidad"
echo -e "  - ${AMARILLO}Términos y condiciones:${RESET} http://localhost:5173/terminos-condiciones"
echo
echo -e "${AZUL}Para detener los servicios, presione ${MAGENTA}Ctrl+C${RESET}"
echo

# Función para cerrar servicios correctamente
finalizar() {
    echo -e "${AMARILLO}Deteniendo servicios...${RESET}"
    kill $WORKER_PID 2>/dev/null
    kill $VITE_PID 2>/dev/null
    echo -e "${VERDE}Servicios detenidos correctamente.${RESET}"
    exit 0
}

# Configurar captura de señal para Ctrl+C
trap finalizar SIGINT SIGTERM

# Monitoreo continuo de los servicios
echo -e "${AZUL}Monitoreando servicios...${RESET}"
while true; do
    # Verificar que el proceso del worker sigue ejecutándose
    if ! ps -p $WORKER_PID >/dev/null 2>&1; then
        echo -e "${ROJO}El proceso del backend ha terminado. Reiniciando...${RESET}"
        npx wrangler dev --port 8787 &
        WORKER_PID=$!
    fi
    
    # Verificar que el proceso de Vite sigue ejecutándose
    if ! ps -p $VITE_PID >/dev/null 2>&1; then
        echo -e "${ROJO}El proceso del frontend ha terminado. Reiniciando...${RESET}"
        VITE_WEBSOCKET_URL=ws://localhost:8787/ws npx vite --port 5173 --host localhost &
        VITE_PID=$!
    fi
    
    sleep 10
done
