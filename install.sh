#!/bin/bash

# 🏛️ Abogado Wilson - Script de Instalación
# Este script automatiza la instalación y configuración del sistema

echo "🏛️ Iniciando instalación del Sistema Legal Abogado Wilson..."
echo "=================================================="

# Colores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Función para imprimir mensajes
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Verificar si Node.js está instalado
check_node() {
    print_status "Verificando Node.js..."
    if ! command -v node &> /dev/null; then
        print_error "Node.js no está instalado. Por favor instala Node.js 18+ desde https://nodejs.org/"
        exit 1
    fi
    
    NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
    if [ "$NODE_VERSION" -lt 18 ]; then
        print_error "Node.js versión 18+ es requerida. Versión actual: $(node -v)"
        exit 1
    fi
    
    print_success "Node.js $(node -v) detectado"
}

# Verificar si npm está instalado
check_npm() {
    print_status "Verificando npm..."
    if ! command -v npm &> /dev/null; then
        print_error "npm no está instalado"
        exit 1
    fi
    
    print_success "npm $(npm -v) detectado"
}

# Instalar dependencias
install_dependencies() {
    print_status "Instalando dependencias..."
    if npm install; then
        print_success "Dependencias instaladas correctamente"
    else
        print_error "Error al instalar dependencias"
        exit 1
    fi
}

# Configurar variables de entorno
setup_env() {
    print_status "Configurando variables de entorno..."
    
    if [ ! -f .env ]; then
        if [ -f env.example ]; then
            cp env.example .env
            print_success "Archivo .env creado desde env.example"
        else
            print_warning "Archivo env.example no encontrado. Creando .env básico..."
            cat > .env << EOF
# Configuración de Supabase
VITE_SUPABASE_URL=your_supabase_url_here
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key_here

# API de Google Gemini
VITE_GEMINI_API_KEY=AIzaSyCAkIkgslyxArR_kg1kVRREzrjeGWavyyU

# Configuración de PayPal
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id_here

# Configuración de la aplicación
VITE_APP_NAME=Abogado Wilson
VITE_APP_URL=http://localhost:5173

# Configuración de WhatsApp
VITE_WHATSAPP_NUMBER=+593988835269
VITE_WHATSAPP_MESSAGE=Hola, necesito información sobre servicios legales
EOF
            print_success "Archivo .env básico creado"
        fi
    else
        print_warning "Archivo .env ya existe"
    fi
}

# Configurar base de datos
setup_database() {
    print_status "Configurando base de datos..."
    
    if command -v npx &> /dev/null; then
        if [ -f "prisma/schema.prisma" ]; then
            print_status "Generando cliente de Prisma..."
            npx prisma generate
            
            print_status "Aplicando migraciones..."
            npx prisma db push
            
            print_success "Base de datos configurada"
        else
            print_warning "Schema de Prisma no encontrado"
        fi
    else
        print_warning "npx no disponible, saltando configuración de base de datos"
    fi
}

# Verificar estructura de directorios
check_structure() {
    print_status "Verificando estructura del proyecto..."
    
    REQUIRED_DIRS=("src" "public" "src/components" "src/context" "src/services")
    
    for dir in "${REQUIRED_DIRS[@]}"; do
        if [ ! -d "$dir" ]; then
            print_warning "Directorio $dir no encontrado"
        fi
    done
    
    print_success "Estructura del proyecto verificada"
}

# Configurar Git hooks (opcional)
setup_git_hooks() {
    if [ -d ".git" ]; then
        print_status "Configurando Git hooks..."
        
        # Crear directorio de hooks si no existe
        mkdir -p .git/hooks
        
        # Hook de pre-commit para linting
        cat > .git/hooks/pre-commit << 'EOF'
#!/bin/bash
echo "🔍 Ejecutando linting..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting falló. Commit cancelado."
    exit 1
fi
echo "✅ Linting exitoso"
EOF
        
        chmod +x .git/hooks/pre-commit
        print_success "Git hooks configurados"
    fi
}

# Mostrar información de configuración
show_config_info() {
    echo ""
    echo "=================================================="
    echo "🎉 ¡Instalación completada exitosamente!"
    echo "=================================================="
    echo ""
    echo "📋 Próximos pasos:"
    echo ""
    echo "1. 📝 Configura las variables de entorno en .env:"
    echo "   - VITE_SUPABASE_URL: URL de tu proyecto Supabase"
    echo "   - VITE_SUPABASE_ANON_KEY: Clave anónima de Supabase"
    echo "   - VITE_GEMINI_API_KEY: Clave de API de Google Gemini"
    echo "   - VITE_PAYPAL_CLIENT_ID: ID de cliente de PayPal"
    echo ""
    echo "2. 🚀 Ejecuta el servidor de desarrollo:"
    echo "   npm run dev"
    echo ""
    echo "3. 🌐 Abre tu navegador en:"
    echo "   http://localhost:5173"
    echo ""
    echo "4. 📚 Consulta la documentación en README.md"
    echo ""
    echo "🔧 Comandos útiles:"
    echo "   npm run dev          # Servidor de desarrollo"
    echo "   npm run build        # Construir para producción"
    echo "   npm run preview      # Vista previa de producción"
    echo "   npm run lint         # Ejecutar linter"
    echo "   npm run typecheck    # Verificar tipos TypeScript"
    echo ""
    echo "📞 Soporte:"
    echo "   WhatsApp: +593 98 883 5269"
    echo "   Email: contacto@abogadowilson.com"
    echo ""
    echo "=================================================="
}

# Función principal
main() {
    echo "🏛️ Sistema Legal Abogado Wilson - Instalador"
    echo "=================================================="
    echo ""
    
    # Verificaciones previas
    check_node
    check_npm
    
    # Instalación
    install_dependencies
    setup_env
    setup_database
    check_structure
    setup_git_hooks
    
    # Información final
    show_config_info
}

# Ejecutar función principal
main "$@"
