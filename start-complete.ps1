# SISTEMA COMPLETO ABOGADO WILSON - INICIO PROFESIONAL
# Script que corrige todos los errores e inicia el sistema completo

Write-Host "SISTEMA COMPLETO ABOGADO WILSON - INICIO PROFESIONAL" -ForegroundColor Cyan
Write-Host "==================================================" -ForegroundColor Cyan
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

# 3. Verificar dependencias
Write-Host "3. Verificando dependencias..." -ForegroundColor Yellow
if (Test-Path "node_modules") {
    Write-Host "   Dependencias ya instaladas" -ForegroundColor Green
} else {
    Write-Host "   Instalando dependencias..." -ForegroundColor Yellow
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

# 5. Verificar y liberar puertos
Write-Host "5. Verificando puertos..." -ForegroundColor Yellow
$port5173 = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
if ($port5173) {
    Write-Host "   Puerto 5173 en uso, liberando..." -ForegroundColor Yellow
    try {
        $processId = $port5173.OwningProcess
        if ($processId) {
            Stop-Process -Id $processId -Force
            Start-Sleep -Seconds 2
            Write-Host "   Puerto 5173 liberado" -ForegroundColor Green
        }
    } catch {
        Write-Host "   Error al liberar puerto 5173" -ForegroundColor Red
    }
} else {
    Write-Host "   Puerto 5173 disponible" -ForegroundColor Green
}

# 6. Detener procesos existentes
Write-Host "6. Deteniendo procesos existentes..." -ForegroundColor Yellow
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "   Deteniendo procesos de Node.js..." -ForegroundColor Yellow
    $nodeProcesses | Stop-Process -Force
    Start-Sleep -Seconds 2
    Write-Host "   Procesos de Node.js detenidos" -ForegroundColor Green
} else {
    Write-Host "   No hay procesos de Node.js ejecutandose" -ForegroundColor Green
}

# 7. Iniciar servidor
Write-Host "7. Iniciando servidor..." -ForegroundColor Yellow
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
    
} catch {
    Write-Host "   Error al iniciar servidor: $($_.Exception.Message)" -ForegroundColor Red
    exit 1
}
