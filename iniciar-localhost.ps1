# Script de inicio profesional para Sistema Abogado Wilson
# Autor: Sistema Automatizado
# Versión: 2.0.0

param(
    [switch]$Force,
    [switch]$Clean,
    [switch]$Help
)

# Configuración de colores para PowerShell
$Host.UI.RawUI.ForegroundColor = "White"
$Host.UI.RawUI.BackgroundColor = "Black"

# Función para mostrar mensajes con colores
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White"
    )
    Write-Host $Message -ForegroundColor $Color
}

# Función para mostrar banner
function Show-Banner {
    Clear-Host
    Write-ColorOutput "╔══════════════════════════════════════════════════════════════╗" "Cyan"
    Write-ColorOutput "║                    SISTEMA ABOGADO WILSON                    ║" "Yellow"
    Write-ColorOutput "║                     Versión 2.0.0                           ║" "Yellow"
    Write-ColorOutput "║                Iniciando en Localhost                       ║" "Yellow"
    Write-ColorOutput "╚══════════════════════════════════════════════════════════════╝" "Cyan"
    Write-Host ""
}

# Función para mostrar ayuda
function Show-Help {
    Write-ColorOutput "Uso del script:" "Yellow"
    Write-ColorOutput "  .\iniciar-localhost.ps1              - Inicia el sistema normalmente" "White"
    Write-ColorOutput "  .\iniciar-localhost.ps1 -Force       - Fuerza la reinstalación de dependencias" "White"
    Write-ColorOutput "  .\iniciar-localhost.ps1 -Clean       - Limpia caché y reinstala todo" "White"
    Write-ColorOutput "  .\iniciar-localhost.ps1 -Help        - Muestra esta ayuda" "White"
    Write-Host ""
    Write-ColorOutput "Ejemplos:" "Yellow"
    Write-ColorOutput "  .\iniciar-localhost.ps1 -Clean       - Para problemas de dependencias" "White"
    Write-ColorOutput "  .\iniciar-localhost.ps1 -Force       - Para forzar reinstalación" "White"
    Write-Host ""
}

# Mostrar ayuda si se solicita
if ($Help) {
    Show-Help
    exit 0
}

# Mostrar banner
Show-Banner

# Verificar si estamos en el directorio correcto
if (-not (Test-Path "package.json")) {
    Write-ColorOutput "❌ ERROR: No se encontró package.json en el directorio actual" "Red"
    Write-ColorOutput "   Asegúrate de estar en el directorio raíz del proyecto" "Yellow"
    Write-Host ""
    exit 1
}

# Función para verificar Node.js
function Test-NodeJS {
    Write-ColorOutput "[1/6] Verificando Node.js..." "Cyan"
    
    try {
        $nodeVersion = node --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ Node.js encontrado: $nodeVersion" "Green"
            return $true
        }
    } catch {
        # Intentar con ruta completa
        try {
            $nodeVersion = & "C:\Program Files\nodejs\node.exe" --version 2>$null
            if ($LASTEXITCODE -eq 0) {
                Write-ColorOutput "✅ Node.js encontrado (ruta completa): $nodeVersion" "Green"
                # Agregar al PATH temporalmente
                $env:PATH = "C:\Program Files\nodejs;$env:PATH"
                return $true
            }
        } catch {
            Write-ColorOutput "❌ ERROR: Node.js no está disponible" "Red"
            Write-ColorOutput "   Soluciones:" "Yellow"
            Write-ColorOutput "   1. Instala Node.js desde https://nodejs.org/" "White"
            Write-ColorOutput "   2. Ejecuta: .\instalar-nodejs.ps1" "White"
            Write-ColorOutput "   3. Reinicia PowerShell después de la instalación" "White"
            Write-Host ""
            return $false
        }
    }
    
    return $false
}

# Función para verificar npm
function Test-NPM {
    Write-ColorOutput "[2/6] Verificando npm..." "Cyan"
    
    try {
        $npmVersion = npm --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ npm encontrado: $npmVersion" "Green"
            return $true
        }
    } catch {
        Write-ColorOutput "❌ ERROR: npm no está disponible" "Red"
        Write-ColorOutput "   Reinstala Node.js para incluir npm" "Yellow"
        Write-Host ""
        return $false
    }
    
    return $false
}

# Función para verificar dependencias
function Test-Dependencies {
    Write-ColorOutput "[3/6] Verificando dependencias..." "Cyan"
    
    if (-not (Test-Path "node_modules") -or $Force -or $Clean) {
        Write-ColorOutput "⚠️  Dependencias no encontradas o reinstalación forzada" "Yellow"
        
        if ($Clean) {
            Write-ColorOutput "🧹 Limpiando instalación anterior..." "Cyan"
            if (Test-Path "node_modules") {
                Remove-Item -Path "node_modules" -Recurse -Force -ErrorAction SilentlyContinue
                Write-ColorOutput "✅ node_modules eliminado" "Green"
            }
            if (Test-Path "package-lock.json") {
                Remove-Item -Path "package-lock.json" -Force -ErrorAction SilentlyContinue
                Write-ColorOutput "✅ package-lock.json eliminado" "Green"
            }
        }
        
        Write-ColorOutput "📦 Instalando dependencias..." "Cyan"
        npm install
        
        if ($LASTEXITCODE -eq 0) {
            Write-ColorOutput "✅ Dependencias instaladas correctamente" "Green"
            return $true
        } else {
            Write-ColorOutput "❌ ERROR: Fallo al instalar dependencias" "Red"
            Write-ColorOutput "   Soluciones:" "Yellow"
            Write-ColorOutput "   1. Verifica tu conexión a internet" "White"
            Write-ColorOutput "   2. Limpia caché: npm cache clean --force" "White"
            Write-ColorOutput "   3. Ejecuta: .\iniciar-localhost.ps1 -Clean" "White"
            Write-Host ""
            return $false
        }
    } else {
        Write-ColorOutput "✅ Dependencias encontradas" "Green"
        return $true
    }
}

# Función para verificar configuración
function Test-Configuration {
    Write-ColorOutput "[4/6] Verificando configuración..." "Cyan"
    
    $requiredFiles = @("vite.config.js", "tailwind.config.js", "postcss.config.js")
    $missingFiles = @()
    
    foreach ($file in $requiredFiles) {
        if (-not (Test-Path $file)) {
            $missingFiles += $file
        }
    }
    
    if ($missingFiles.Count -gt 0) {
        Write-ColorOutput "❌ ERROR: Archivos de configuración faltantes:" "Red"
        foreach ($file in $missingFiles) {
            Write-ColorOutput "   - $file" "Red"
        }
        Write-Host ""
        return $false
    }
    
    Write-ColorOutput "✅ Configuración verificada" "Green"
    return $true
}

# Función para verificar puerto
function Test-Port {
    Write-ColorOutput "[5/6] Verificando puerto 5173..." "Cyan"
    
    try {
        $portInUse = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
        if ($portInUse) {
            Write-ColorOutput "⚠️  ADVERTENCIA: El puerto 5173 está en uso" "Yellow"
            Write-ColorOutput "   Proceso: $($portInUse.ProcessName) (PID: $($portInUse.OwningProcess))" "White"
            Write-ColorOutput "   ¿Deseas continuar? (s/N): " "Yellow" -NoNewline
            $response = Read-Host
            if ($response -ne "s" -and $response -ne "S") {
                Write-ColorOutput "❌ Operación cancelada por el usuario" "Red"
                return $false
            }
        }
    } catch {
        # Continuar si no hay problemas
    }
    
    Write-ColorOutput "✅ Puerto 5173 disponible" "Green"
    return $true
}

# Función para iniciar servidor
function Start-DevelopmentServer {
    Write-ColorOutput "[6/6] Iniciando servidor de desarrollo..." "Cyan"
    Write-Host ""
    Write-ColorOutput "🚀 Iniciando en: http://localhost:5173" "Green"
    Write-ColorOutput "🌐 Host: 0.0.0.0 (acceso desde cualquier IP)" "Cyan"
    Write-ColorOutput "📱 El navegador se abrirá automáticamente" "Yellow"
    Write-Host ""
    Write-ColorOutput "💡 Para detener el servidor: Ctrl+C" "Yellow"
    Write-Host ""
    Write-ColorOutput "══════════════════════════════════════════════════════════════" "Cyan"
    Write-Host ""
    
    # Iniciar el servidor
    npm run dev
}

# Función principal
function Main {
    try {
        # Verificaciones previas
        if (-not (Test-NodeJS)) { exit 1 }
        if (-not (Test-NPM)) { exit 1 }
        if (-not (Test-Dependencies)) { exit 1 }
        if (-not (Test-Configuration)) { exit 1 }
        if (-not (Test-Port)) { exit 1 }
        
        # Iniciar servidor
        Start-DevelopmentServer
        
    } catch {
        Write-ColorOutput "❌ ERROR INESPERADO: $($_.Exception.Message)" "Red"
        Write-ColorOutput "   Stack trace:" "Yellow"
        Write-ColorOutput $_.ScriptStackTrace "Gray"
        Write-Host ""
        Write-ColorOutput "💡 Para obtener ayuda, ejecuta: .\iniciar-localhost.ps1 -Help" "Yellow"
        Write-Host ""
        exit 1
    }
}

# Ejecutar función principal
Main
