# 🏛️ Abogado Wilson - Script de Instalación para Windows
# Este script automatiza la instalación y configuración del sistema

Write-Host "🏛️ Iniciando instalación del Sistema Legal Abogado Wilson..." -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan

# Función para imprimir mensajes
function Write-Status {
    param([string]$Message)
    Write-Host "[INFO] $Message" -ForegroundColor Blue
}

function Write-Success {
    param([string]$Message)
    Write-Host "[SUCCESS] $Message" -ForegroundColor Green
}

function Write-Warning {
    param([string]$Message)
    Write-Host "[WARNING] $Message" -ForegroundColor Yellow
}

function Write-Error {
    param([string]$Message)
    Write-Host "[ERROR] $Message" -ForegroundColor Red
}

# Verificar si Node.js está instalado
function Test-NodeJS {
    Write-Status "Verificando Node.js..."
    
    try {
        $nodeVersion = node --version
        if ($LASTEXITCODE -eq 0) {
            $version = $nodeVersion.TrimStart('v').Split('.')[0]
            if ([int]$version -ge 18) {
                Write-Success "Node.js $nodeVersion detectado"
                return $true
            } else {
                Write-Error "Node.js versión 18+ es requerida. Versión actual: $nodeVersion"
                return $false
            }
        }
    } catch {
        Write-Error "Node.js no está instalado. Por favor instala Node.js 18+ desde https://nodejs.org/"
        return $false
    }
}

# Verificar si npm está instalado
function Test-NPM {
    Write-Status "Verificando npm..."
    
    try {
        $npmVersion = npm --version
        if ($LASTEXITCODE -eq 0) {
            Write-Success "npm $npmVersion detectado"
            return $true
        }
    } catch {
        Write-Error "npm no está instalado"
        return $false
    }
}

# Instalar dependencias
function Install-Dependencies {
    Write-Status "Instalando dependencias..."
    
    try {
        npm install
        if ($LASTEXITCODE -eq 0) {
            Write-Success "Dependencias instaladas correctamente"
            return $true
        } else {
            Write-Error "Error al instalar dependencias"
            return $false
        }
    } catch {
        Write-Error "Error al instalar dependencias"
        return $false
    }
}

# Configurar variables de entorno
function Setup-Environment {
    Write-Status "Configurando variables de entorno..."
    
    if (-not (Test-Path ".env")) {
        if (Test-Path "env.example") {
            Copy-Item "env.example" ".env"
            Write-Success "Archivo .env creado desde env.example"
        } else {
            Write-Warning "Archivo env.example no encontrado. Creando .env básico..."
            
            $envContent = @"
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
"@
            
            $envContent | Out-File -FilePath ".env" -Encoding UTF8
            Write-Success "Archivo .env básico creado"
        }
    } else {
        Write-Warning "Archivo .env ya existe"
    }
}

# Configurar base de datos
function Setup-Database {
    Write-Status "Configurando base de datos..."
    
    if (Get-Command npx -ErrorAction SilentlyContinue) {
        if (Test-Path "prisma/schema.prisma") {
            Write-Status "Generando cliente de Prisma..."
            npx prisma generate
            
            Write-Status "Aplicando migraciones..."
            npx prisma db push
            
            Write-Success "Base de datos configurada"
        } else {
            Write-Warning "Schema de Prisma no encontrado"
        }
    } else {
        Write-Warning "npx no disponible, saltando configuración de base de datos"
    }
}

# Verificar estructura de directorios
function Test-ProjectStructure {
    Write-Status "Verificando estructura del proyecto..."
    
    $requiredDirs = @("src", "public", "src/components", "src/context", "src/services")
    
    foreach ($dir in $requiredDirs) {
        if (-not (Test-Path $dir)) {
            Write-Warning "Directorio $dir no encontrado"
        }
    }
    
    Write-Success "Estructura del proyecto verificada"
}

# Configurar Git hooks (opcional)
function Setup-GitHooks {
    if (Test-Path ".git") {
        Write-Status "Configurando Git hooks..."
        
        # Crear directorio de hooks si no existe
        if (-not (Test-Path ".git/hooks")) {
            New-Item -ItemType Directory -Path ".git/hooks" -Force
        }
        
        # Hook de pre-commit para linting
        $hookContent = @"
#!/bin/bash
echo "🔍 Ejecutando linting..."
npm run lint
if [ `$? -ne 0 ]; then
    echo "❌ Linting falló. Commit cancelado."
    exit 1
fi
echo "✅ Linting exitoso"
"@
        
        $hookContent | Out-File -FilePath ".git/hooks/pre-commit" -Encoding UTF8
        Write-Success "Git hooks configurados"
    }
}

# Mostrar información de configuración
function Show-ConfigurationInfo {
    Write-Host ""
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host "🎉 ¡Instalación completada exitosamente!" -ForegroundColor Green
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "📋 Próximos pasos:" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "1. 📝 Configura las variables de entorno en .env:" -ForegroundColor White
    Write-Host "   - VITE_SUPABASE_URL: URL de tu proyecto Supabase" -ForegroundColor Gray
    Write-Host "   - VITE_SUPABASE_ANON_KEY: Clave anónima de Supabase" -ForegroundColor Gray
    Write-Host "   - VITE_GEMINI_API_KEY: Clave de API de Google Gemini" -ForegroundColor Gray
    Write-Host "   - VITE_PAYPAL_CLIENT_ID: ID de cliente de PayPal" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. 🚀 Ejecuta el servidor de desarrollo:" -ForegroundColor White
    Write-Host "   npm run dev" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. 🌐 Abre tu navegador en:" -ForegroundColor White
    Write-Host "   http://localhost:5173" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4. 📚 Consulta la documentación en README.md" -ForegroundColor White
    Write-Host ""
    Write-Host "🔧 Comandos útiles:" -ForegroundColor Yellow
    Write-Host "   npm run dev          # Servidor de desarrollo" -ForegroundColor Gray
    Write-Host "   npm run build        # Construir para producción" -ForegroundColor Gray
    Write-Host "   npm run preview      # Vista previa de producción" -ForegroundColor Gray
    Write-Host "   npm run lint         # Ejecutar linter" -ForegroundColor Gray
    Write-Host "   npm run typecheck    # Verificar tipos TypeScript" -ForegroundColor Gray
    Write-Host ""
    Write-Host "📞 Soporte:" -ForegroundColor Yellow
    Write-Host "   WhatsApp: +593 98 883 5269" -ForegroundColor Gray
    Write-Host "   Email: contacto@abogadowilson.com" -ForegroundColor Gray
    Write-Host ""
    Write-Host "==================================================" -ForegroundColor Cyan
}

# Función principal
function Main {
    Write-Host "🏛️ Sistema Legal Abogado Wilson - Instalador" -ForegroundColor Cyan
    Write-Host "==================================================" -ForegroundColor Cyan
    Write-Host ""
    
    # Verificaciones previas
    if (-not (Test-NodeJS)) {
        exit 1
    }
    
    if (-not (Test-NPM)) {
        exit 1
    }
    
    # Instalación
    if (-not (Install-Dependencies)) {
        exit 1
    }
    
    Setup-Environment
    Setup-Database
    Test-ProjectStructure
    Setup-GitHooks
    
    # Información final
    Show-ConfigurationInfo
}

# Ejecutar función principal
Main
