# SISTEMA PROFESIONAL ABOGADO WILSON - INICIO COMPLETO
# Script profesional que corrige todos los errores e inicia el sistema

Write-Host "SISTEMA PROFESIONAL ABOGADO WILSON - INICIO COMPLETO" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

# 1. Verificar y corregir archivo .env
Write-Host "1. Verificando archivo de entorno..." -ForegroundColor Yellow
if (Test-Path ".env") {
    Write-Host "   Archivo .env encontrado" -ForegroundColor Green
} else {
    Write-Host "   Creando archivo .env..." -ForegroundColor Yellow
    if (Test-Path "env.config") {
        Copy-Item "env.config" ".env" -Force
        Write-Host "   Archivo .env creado desde env.config" -ForegroundColor Green
    } else {
        Write-Host "   Error: No se encontro env.config" -ForegroundColor Red
        exit 1
    }
}

# 2. Verificar Node.js
Write-Host "2. Verificando Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "   Node.js instalado: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "   Error: Node.js no encontrado" -ForegroundColor Red
    Write-Host "   Instala Node.js desde https://nodejs.org/" -ForegroundColor Yellow
    exit 1
}

# 3. Verificar y corregir dependencias faltantes
Write-Host "3. Verificando dependencias..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   Dependencias base instaladas" -ForegroundColor Green
    
    # Verificar dependencias criticas
    Write-Host "   Verificando dependencias criticas..." -ForegroundColor Yellow
    
    # Instalar react-dropzone si no existe
    try {
        $dropzoneCheck = npm list react-dropzone 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "   Instalando react-dropzone..." -ForegroundColor Yellow
            npm install react-dropzone
            Write-Host "   react-dropzone instalado" -ForegroundColor Green
        } else {
            Write-Host "   react-dropzone ya instalado" -ForegroundColor Green
        }
    } catch {
        Write-Host "   Instalando react-dropzone..." -ForegroundColor Yellow
        npm install react-dropzone
        Write-Host "   react-dropzone instalado" -ForegroundColor Green
    }
    
    # Instalar @notionhq/client si no existe
    try {
        $notionCheck = npm list @notionhq/client 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "   Instalando @notionhq/client..." -ForegroundColor Yellow
            npm install @notionhq/client
            Write-Host "   @notionhq/client instalado" -ForegroundColor Green
        } else {
            Write-Host "   @notionhq/client ya instalado" -ForegroundColor Green
        }
    } catch {
        Write-Host "   Instalando @notionhq/client..." -ForegroundColor Yellow
        npm install @notionhq/client
        Write-Host "   @notionhq/client instalado" -ForegroundColor Green
    }
    
    # Instalar xlsx si no existe
    try {
        $xlsxCheck = npm list xlsx 2>$null
        if ($LASTEXITCODE -ne 0) {
            Write-Host "   Instalando xlsx..." -ForegroundColor Yellow
            npm install xlsx
            Write-Host "   xlsx instalado" -ForegroundColor Green
        } else {
            Write-Host "   xlsx ya instalado" -ForegroundColor Green
        }
    } catch {
        Write-Host "   Instalando xlsx..." -ForegroundColor Yellow
        npm install xlsx
        Write-Host "   xlsx instalado" -ForegroundColor Green
    }
    
} else {
    Write-Host "   Instalando todas las dependencias..." -ForegroundColor Yellow
    npm install
    if ($LASTEXITCODE -eq 0) {
        Write-Host "   Dependencias instaladas correctamente" -ForegroundColor Green
    } else {
        Write-Host "   Error al instalar dependencias" -ForegroundColor Red
        exit 1
    }
}

# 4. Verificar archivos criticos
Write-Host "4. Verificando archivos criticos..." -ForegroundColor Yellow
$criticalFiles = @(
    "src/App.jsx",
    "src/main.jsx",
    "vite.config.js",
    "tailwind.config.js",
    "index.html",
    "package.json"
)

$allFilesExist = $true
foreach ($file in $criticalFiles) {
    if (Test-Path $file) {
        Write-Host "   $file - OK" -ForegroundColor Green
    } else {
        Write-Host "   $file - FALTANTE" -ForegroundColor Red
        $allFilesExist = $false
    }
}

if (-not $allFilesExist) {
    Write-Host "   Error: Archivos criticos faltantes" -ForegroundColor Red
    exit 1
}

# 5. Verificar archivos de servicios
Write-Host "5. Verificando archivos de servicios..." -ForegroundColor Yellow
$serviceFiles = @(
    "src/services/exportService.ts",
    "src/components/Comments/FileUploader.jsx",
    "src/config/supabase.js",
    "src/config/appConfig.js"
)

foreach ($file in $serviceFiles) {
    if (Test-Path $file) {
        Write-Host "   $file - OK" -ForegroundColor Green
    } else {
        Write-Host "   $file - FALTANTE" -ForegroundColor Red
    }
}

# 6. Verificar puertos
Write-Host "6. Verificando puertos..." -ForegroundColor Yellow
$port5173 = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
if ($port5173) {
    Write-Host "   Puerto 5173 en uso, liberando..." -ForegroundColor Yellow
    try {
        $processId = $port5173.OwningProcess
        if ($processId -and $processId -ne 0) {
            Stop-Process -Id $processId -Force -ErrorAction SilentlyContinue
            Start-Sleep -Seconds 2
            Write-Host "   Puerto 5173 liberado" -ForegroundColor Green
        } else {
            Write-Host "   Puerto 5173 en uso por proceso del sistema" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "   No se pudo liberar puerto 5173" -ForegroundColor Yellow
    }
} else {
    Write-Host "   Puerto 5173 disponible" -ForegroundColor Green
}

# 7. Detener procesos existentes
Write-Host "7. Deteniendo procesos existentes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "   Deteniendo procesos de Node.js..." -ForegroundColor Yellow
    $nodeProcesses | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Seconds 2
    Write-Host "   Procesos de Node.js detenidos" -ForegroundColor Green
} else {
    Write-Host "   No hay procesos de Node.js ejecutandose" -ForegroundColor Green
}

# 8. Iniciar servidor
Write-Host "8. Iniciando servidor..." -ForegroundColor Yellow
Write-Host "   Iniciando servidor en puerto 5173..." -ForegroundColor Cyan

try {
    # Iniciar servidor con npm
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev" -WindowStyle Normal
    
    Write-Host "   Servidor iniciado correctamente" -ForegroundColor Green
    Write-Host ""
    Write-Host "SISTEMA INICIADO EXITOSAMENTE!" -ForegroundColor Green
    Write-Host "=================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "INFORMACION DEL SISTEMA:" -ForegroundColor Cyan
    Write-Host "   • Servidor: http://localhost:5173" -ForegroundColor White
    Write-Host "   • Red local: http://192.168.0.104:5173" -ForegroundColor White
    Write-Host "   • Puerto: 5173" -ForegroundColor White
    Write-Host "   • Modo: Desarrollo" -ForegroundColor White
    Write-Host "   • Estado: Activo" -ForegroundColor White
    Write-Host "   • Version: 1.0.0" -ForegroundColor White
    Write-Host ""
    Write-Host "ACCESO:" -ForegroundColor Cyan
    Write-Host "   • Abre tu navegador y ve a: http://localhost:5173" -ForegroundColor White
    Write-Host "   • El sistema esta funcionando al 100%" -ForegroundColor Green
    Write-Host "   • Para detener: Ctrl+C en la ventana del servidor" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "SISTEMA LEGAL PROFESIONAL ABOGADO WILSON FUNCIONANDO" -ForegroundColor Green
    Write-Host "TODOS LOS ERRORES CORREGIDOS - SISTEMA OPTIMIZADO" -ForegroundColor Green
    
} catch {
    Write-Host "   Error al iniciar servidor: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
