# 🚀 SISTEMA DE INICIO AUTOMÁTICO ABOGADO WILSON 🚀
# Script profesional con diagnóstico y corrección automática de errores

param(
    [switch]$Diagnostic,
    [switch]$AutoFix,
    [switch]$Force,
    [switch]$Verbose
)

# Configuración de colores para output profesional
$Host.UI.RawUI.ForegroundColor = "White"
$Host.UI.RawUI.BackgroundColor = "Black"

# Función para mostrar mensajes con colores
function Write-ColorOutput {
    param(
        [string]$Message,
        [string]$Color = "White",
        [string]$Prefix = ""
    )
    
    $timestamp = Get-Date -Format "HH:mm:ss"
    $coloredMessage = "$Prefix [$timestamp] $Message"
    
    switch ($Color) {
        "Green" { Write-Host $coloredMessage -ForegroundColor Green }
        "Red" { Write-Host $coloredMessage -ForegroundColor Red }
        "Yellow" { Write-Host $coloredMessage -ForegroundColor Yellow }
        "Cyan" { Write-Host $coloredMessage -ForegroundColor Cyan }
        "Magenta" { Write-Host $coloredMessage -ForegroundColor Magenta }
        default { Write-Host $coloredMessage -ForegroundColor White }
    }
}

# Función para mostrar banner del sistema
function Show-Banner {
    Clear-Host
    Write-ColorOutput "╔══════════════════════════════════════════════════════════════╗" "Cyan"
    Write-ColorOutput "║                    🏛️  ABOGADO WILSON 🏛️                    ║" "Cyan"
    Write-ColorOutput "║              SISTEMA LEGAL PROFESIONAL v1.0.0               ║" "Cyan"
    Write-ColorOutput "║                                                              ║" "Cyan"
    Write-ColorOutput "║           🚀 INICIANDO SISTEMA AUTOMÁTICO 🚀               ║" "Cyan"
    Write-ColorOutput "╚══════════════════════════════════════════════════════════════╝" "Cyan"
    Write-Host ""
}

# Función para verificar si Node.js está instalado
function Test-NodeJS {
    Write-ColorOutput "🔍 Verificando instalación de Node.js..." "Yellow"
    
    try {
        $nodeVersion = node --version 2>$null
        if ($nodeVersion) {
            Write-ColorOutput "✅ Node.js instalado: $nodeVersion" "Green"
            return $true
        }
    } catch {
        Write-ColorOutput "❌ Node.js no encontrado" "Red"
        return $false
    }
    
    return $false
}

# Función para instalar Node.js automáticamente
function Install-NodeJS {
    Write-ColorOutput "📦 Instalando Node.js automáticamente..." "Yellow"
    
    try {
        # Descargar e instalar Node.js
        $nodeUrl = "https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi"
        $nodeInstaller = "$env:TEMP\node-installer.msi"
        
        Write-ColorOutput "⬇️  Descargando Node.js..." "Cyan"
        Invoke-WebRequest -Uri $nodeUrl -OutFile $nodeInstaller
        
        Write-ColorOutput "🔧 Instalando Node.js..." "Cyan"
        Start-Process msiexec.exe -Wait -ArgumentList "/i $nodeInstaller /quiet"
        
        # Limpiar archivo temporal
        Remove-Item $nodeInstaller -Force
        
        Write-ColorOutput "✅ Node.js instalado correctamente" "Green"
        
        # Refrescar PATH
        $env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
        
        return $true
        
    } catch {
        Write-ColorOutput "❌ Error al instalar Node.js: $($_.Exception.Message)" "Red"
        return $false
    }
}

# Función para verificar dependencias del proyecto
function Test-ProjectDependencies {
    Write-ColorOutput "🔍 Verificando dependencias del proyecto..." "Yellow"
    
    if (Test-Path "package.json") {
        Write-ColorOutput "✅ package.json encontrado" "Green"
        
        # Verificar si node_modules existe
        if (Test-Path "node_modules") {
            Write-ColorOutput "✅ Dependencias ya instaladas" "Green"
            return $true
        } else {
            Write-ColorOutput "📦 Instalando dependencias..." "Yellow"
            try {
                npm install
                Write-ColorOutput "✅ Dependencias instaladas correctamente" "Green"
                return $true
            } catch {
                Write-ColorOutput "❌ Error al instalar dependencias: $($_.Exception.Message)" "Red"
                return $false
            }
        }
    } else {
        Write-ColorOutput "❌ package.json no encontrado" "Red"
        return $false
    }
}

# Función para verificar archivos críticos
function Test-CriticalFiles {
    Write-ColorOutput "🔍 Verificando archivos críticos..." "Yellow"
    
    $criticalFiles = @(
        "src/App.jsx",
        "src/main.jsx",
        "vite.config.js",
        "tailwind.config.js",
        "index.html"
    )
    
    $missingFiles = @()
    
    foreach ($file in $criticalFiles) {
        if (Test-Path $file) {
            Write-ColorOutput "✅ $file" "Green"
        } else {
            Write-ColorOutput "❌ $file - FALTANTE" "Red"
            $missingFiles += $file
        }
    }
    
    return $missingFiles.Count -eq 0
}

# Función para corregir errores comunes
function Fix-CommonErrors {
    Write-ColorOutput "🔧 Aplicando correcciones automáticas..." "Yellow"
    
    # 1. Corregir archivo roleMiddleware.js si contiene JSX
    $roleMiddlewarePath = "src/middleware/roleMiddleware.js"
    if (Test-Path $roleMiddlewarePath) {
        $content = Get-Content $roleMiddlewarePath -Raw
        if ($content -match "jsx|className|<div") {
            Write-ColorOutput "🔄 Renombrando roleMiddleware.js a .jsx..." "Cyan"
            $newPath = $roleMiddlewarePath.Replace(".js", ".jsx")
            Move-Item $roleMiddlewarePath $newPath -Force
            Write-ColorOutput "✅ Archivo renombrado correctamente" "Green"
        }
    }
    
    # 2. Verificar y corregir imports en App.jsx
    $appPath = "src/App.jsx"
    if (Test-Path $appPath) {
        Write-ColorOutput "🔍 Verificando imports en App.jsx..." "Cyan"
        
        $content = Get-Content $appPath -Raw
        
        # Corregir import de Services
        if ($content -match 'import Services from "\./components/Services/Services"') {
            $content = $content -replace 'import Services from "\./components/Services/Services"', 'import Services from "./components/Services/ServicesPage"'
            Write-ColorOutput "✅ Import de Services corregido" "Green"
        }
        
        # Corregir import de Ebooks
        if ($content -match 'import Ebooks from "\./components/Ebooks/Ebooks"') {
            $content = $content -replace 'import Ebooks from "\./components/Ebooks/Ebooks"', 'import Ebooks from "./components/Ebooks/EbookStore"'
            Write-ColorOutput "✅ Import de Ebooks corregido" "Green"
        }
        
        # Corregir import de CourseCatalog
        if ($content -match 'import CourseCatalog from "\./components/Courses/CourseCatalog"') {
            $content = $content -replace 'import CourseCatalog from "\./components/Courses/CourseCatalog"', 'import CourseCatalog from "./components/Courses/CourseSystem"'
            Write-ColorOutput "✅ Import de CourseCatalog corregido" "Green"
        }
        
        # Corregir import de CourseDetail
        if ($content -match 'import CourseDetail from "\./components/Courses/CourseDetail"') {
            $content = $content -replace 'import CourseDetail from "\./components/Courses/CourseDetail"', 'import CourseDetail from "./pages/CourseDetailPage"'
            Write-ColorOutput "✅ Import de CourseDetail corregido" "Green"
        }
        
        # Guardar cambios
        Set-Content $appPath $content -Encoding UTF8
        Write-ColorOutput "✅ App.jsx corregido y guardado" "Green"
    }
    
    # 3. Crear archivo .env si no existe
    if (-not (Test-Path ".env")) {
        Write-ColorOutput "📝 Creando archivo .env..." "Cyan"
        Copy-Item "env.config" ".env" -Force
        Write-ColorOutput "✅ Archivo .env creado" "Green"
    }
}

# Función para iniciar servidor de desarrollo
function Start-DevelopmentServer {
    Write-ColorOutput "🚀 Iniciando servidor de desarrollo..." "Yellow"
    
    try {
        # Verificar si hay procesos de Node.js corriendo
        $nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
        if ($nodeProcesses) {
            Write-ColorOutput "🔄 Deteniendo procesos de Node.js existentes..." "Cyan"
            $nodeProcesses | Stop-Process -Force
            Start-Sleep -Seconds 2
        }
        
        # Verificar puerto 5173
        $portInUse = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
        if ($portInUse) {
            Write-ColorOutput "🔄 Liberando puerto 5173..." "Cyan"
            $portInUse | Stop-Process -Force
            Start-Sleep -Seconds 2
        }
        
        Write-ColorOutput "🌐 Iniciando servidor en puerto 5173..." "Cyan"
        
        # Iniciar servidor con npm
        Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev" -WindowStyle Normal
        
        Write-ColorOutput "✅ Servidor iniciado correctamente" "Green"
        Write-ColorOutput "🌐 Accede a: http://localhost:5173" "Cyan"
        Write-ColorOutput "📱 Red local: http://192.168.0.104:5173" "Cyan"
        
        return $true
        
    } catch {
        Write-ColorOutput "❌ Error al iniciar servidor: $($_.Exception.Message)" "Red"
        return $false
    }
}

# Función principal del sistema
function Start-System {
    Show-Banner
    
    Write-ColorOutput "🚀 INICIANDO SISTEMA AUTOMÁTICO ABOGADO WILSON" "Magenta"
    Write-Host ""
    
    # Paso 1: Verificar Node.js
    if (-not (Test-NodeJS)) {
        Write-ColorOutput "📦 Node.js no encontrado, instalando automáticamente..." "Yellow"
        if (-not (Install-NodeJS)) {
            Write-ColorOutput "❌ No se pudo instalar Node.js. Sistema no puede continuar." "Red"
            return $false
        }
    }
    
    # Paso 2: Verificar dependencias
    if (-not (Test-ProjectDependencies)) {
        Write-ColorOutput "❌ Error en dependencias del proyecto. Sistema no puede continuar." "Red"
        return $false
    }
    
    # Paso 3: Verificar archivos críticos
    if (-not (Test-CriticalFiles)) {
        Write-ColorOutput "⚠️  Algunos archivos críticos están faltantes" "Yellow"
        if ($AutoFix -or $Force) {
            Write-ColorOutput "🔧 Aplicando correcciones automáticas..." "Yellow"
            Fix-CommonErrors
        }
    }
    
    # Paso 4: Aplicar correcciones si se solicita
    if ($AutoFix -or $Force) {
        Fix-CommonErrors
    }
    
    # Paso 5: Iniciar servidor
    if (Start-DevelopmentServer) {
        Write-Host ""
        Write-ColorOutput "🎉 ¡SISTEMA INICIADO EXITOSAMENTE!" "Green"
        Write-ColorOutput "🏛️  Abogado Wilson está listo para servir" "Green"
        Write-Host ""
        
        # Mostrar información del sistema
        Write-ColorOutput "📊 INFORMACIÓN DEL SISTEMA:" "Cyan"
        Write-ColorOutput "   • Servidor: http://localhost:5173" "White"
        Write-ColorOutput "   • Red local: http://192.168.0.104:5173" "White"
        Write-ColorOutput "   • Puerto: 5173" "White"
        Write-ColorOutput "   • Modo: Desarrollo" "White"
        Write-ColorOutput "   • Estado: Activo" "White"
        
        return $true
    } else {
        Write-ColorOutput "❌ Error al iniciar sistema" "Red"
        return $false
    }
}

# Función para mostrar ayuda
function Show-Help {
    Write-ColorOutput "📖 AYUDA DEL SISTEMA ABOGADO WILSON" "Cyan"
    Write-Host ""
    Write-ColorOutput "Uso:" "White"
    Write-ColorOutput "  .\start-system.ps1 [opciones]" "White"
    Write-Host ""
    Write-ColorOutput "Opciones:" "White"
    Write-ColorOutput "  -Diagnostic    Ejecutar diagnóstico completo del sistema" "White"
    Write-ColorOutput "  -AutoFix       Aplicar correcciones automáticas" "White"
    Write-ColorOutput "  -Force         Forzar inicio ignorando errores" "White"
    Write-ColorOutput "  -Verbose       Mostrar información detallada" "White"
    Write-ColorOutput "  -Help          Mostrar esta ayuda" "White"
    Write-Host ""
    Write-ColorOutput "Ejemplos:" "White"
    Write-ColorOutput "  .\start-system.ps1                    # Inicio normal" "White"
    Write-ColorOutput "  .\start-system.ps1 -AutoFix          # Con correcciones automáticas" "White"
    Write-ColorOutput "  .\start-system.ps1 -Diagnostic       # Solo diagnóstico" "White"
    Write-ColorOutput "  .\start-system.ps1 -Force -Verbose   # Forzar con información detallada" "White"
}

# Función para ejecutar diagnóstico
function Run-Diagnostic {
    Show-Banner
    Write-ColorOutput "🔍 EJECUTANDO DIAGNÓSTICO COMPLETO DEL SISTEMA" "Magenta"
    Write-Host ""
    
    # Verificar Node.js
    Write-ColorOutput "1️⃣  Verificando Node.js..." "Yellow"
    if (Test-NodeJS) {
        Write-ColorOutput "   ✅ Node.js funcionando correctamente" "Green"
    } else {
        Write-ColorOutput "   ❌ Node.js no encontrado" "Red"
    }
    
    # Verificar dependencias
    Write-ColorOutput "2️⃣  Verificando dependencias..." "Yellow"
    if (Test-ProjectDependencies) {
        Write-ColorOutput "   ✅ Dependencias del proyecto OK" "Green"
    } else {
        Write-ColorOutput "   ❌ Problemas con dependencias" "Red"
    }
    
    # Verificar archivos críticos
    Write-ColorOutput "3️⃣  Verificando archivos críticos..." "Yellow"
    if (Test-CriticalFiles) {
        Write-ColorOutput "   ✅ Archivos críticos OK" "Green"
    } else {
        Write-ColorOutput "   ❌ Archivos críticos faltantes" "Red"
    }
    
    # Verificar puertos
    Write-ColorOutput "4️⃣  Verificando puertos..." "Yellow"
    $port5173 = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
    if ($port5173) {
        Write-ColorOutput "   ⚠️  Puerto 5173 en uso" "Yellow"
    } else {
        Write-ColorOutput "   ✅ Puerto 5173 disponible" "Green"
    }
    
    Write-Host ""
    Write-ColorOutput "🔍 DIAGNÓSTICO COMPLETADO" "Green"
}

# Función principal del script
function Main {
    # Verificar si se solicita ayuda
    if ($args -contains "-Help" -or $args -contains "-h") {
        Show-Help
        return
    }
    
    # Verificar si se solicita solo diagnóstico
    if ($Diagnostic) {
        Run-Diagnostic
        return
    }
    
    # Ejecutar sistema principal
    $success = Start-System
    
    if ($success) {
        Write-Host ""
        Write-ColorOutput "🎯 Sistema Abogado Wilson iniciado exitosamente" "Green"
        Write-ColorOutput "📱 Accede a http://localhost:5173 en tu navegador" "Cyan"
        Write-ColorOutput "🔧 Para detener el servidor, presiona Ctrl+C" "Yellow"
    } else {
        Write-Host ""
        Write-ColorOutput "❌ Error al iniciar sistema Abogado Wilson" "Red"
        Write-ColorOutput "🔍 Ejecuta .\start-system.ps1 -Diagnostic para más información" "Yellow"
        Write-ColorOutput "🛠️  Ejecuta .\start-system.ps1 -AutoFix para correcciones automáticas" "Yellow"
    }
}

# Ejecutar función principal
Main
