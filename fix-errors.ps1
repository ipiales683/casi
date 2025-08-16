# SCRIPT DE CORRECCION AUTOMATICA ABOGADO WILSON

Write-Host "INICIANDO CORRECCION AUTOMATICA DEL SISTEMA..." -ForegroundColor Cyan

# 1. Corregir archivo roleMiddleware.js
Write-Host "Corrigiendo archivo roleMiddleware.js..." -ForegroundColor Yellow
if (Test-Path "src\middleware\roleMiddleware.js") {
    try {
        Move-Item "src\middleware\roleMiddleware.js" "src\middleware\roleMiddleware.jsx" -Force
        Write-Host "roleMiddleware.js renombrado a .jsx" -ForegroundColor Green
    } catch {
        Write-Host "Error al renombrar roleMiddleware.js" -ForegroundColor Red
    }
}

# 2. Crear archivo .env
Write-Host "Creando archivo .env..." -ForegroundColor Yellow
if (Test-Path "env.config") {
    try {
        Copy-Item "env.config" ".env" -Force
        Write-Host "Archivo .env creado" -ForegroundColor Green
    } catch {
        Write-Host "Error al crear .env" -ForegroundColor Red
    }
}

# 3. Verificar dependencias
Write-Host "Verificando dependencias..." -ForegroundColor Yellow
if (Test-Path "package.json") {
    if (-not (Test-Path "node_modules")) {
        Write-Host "Instalando dependencias..." -ForegroundColor Cyan
        try {
            npm install
            Write-Host "Dependencias instaladas" -ForegroundColor Green
        } catch {
            Write-Host "Error al instalar dependencias" -ForegroundColor Red
        }
    } else {
        Write-Host "Dependencias ya instaladas" -ForegroundColor Green
    }
}

# 4. Iniciar servidor
Write-Host "Iniciando servidor..." -ForegroundColor Yellow

# Detener procesos existentes
$nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
if ($nodeProcesses) {
    Write-Host "Deteniendo procesos de Node.js..." -ForegroundColor Cyan
    $nodeProcesses | Stop-Process -Force
    Start-Sleep -Seconds 2
}

# Verificar puerto
$portInUse = Get-NetTCPConnection -LocalPort 5173 -ErrorAction SilentlyContinue
if ($portInUse) {
    Write-Host "Liberando puerto 5173..." -ForegroundColor Cyan
    $portInUse | Stop-Process -Force
    Start-Sleep -Seconds 2
}

Write-Host "Iniciando servidor en puerto 5173..." -ForegroundColor Cyan

# Iniciar servidor
try {
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev" -WindowStyle Normal
    Write-Host "Servidor iniciado correctamente" -ForegroundColor Green
    Write-Host "Accede a: http://localhost:5173" -ForegroundColor Cyan
    Write-Host "Red local: http://192.168.0.104:5173" -ForegroundColor Cyan
} catch {
    Write-Host "Error al iniciar servidor: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host "CORRECCION COMPLETADA" -ForegroundColor Green
