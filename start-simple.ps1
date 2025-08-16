# SISTEMA ABOGADO WILSON - INICIO SIMPLE
# Script simple para iniciar el servidor

Write-Host "SISTEMA ABOGADO WILSON - INICIANDO..." -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Verificar archivo .env
if (-not (Test-Path ".env")) {
    Write-Host "Creando archivo .env..." -ForegroundColor Yellow
    if (Test-Path "env.config") {
        Copy-Item "env.config" ".env" -Force
        Write-Host "Archivo .env creado" -ForegroundColor Green
    }
}

# Verificar Node.js
try {
    $nodeVersion = node --version
    Write-Host "Node.js: $nodeVersion" -ForegroundColor Green
} catch {
    Write-Host "Error: Node.js no encontrado" -ForegroundColor Red
    exit 1
}

# Verificar dependencias
if (-not (Test-Path "node_modules")) {
    Write-Host "Instalando dependencias..." -ForegroundColor Yellow
    npm install
}

# Iniciar servidor
Write-Host "Iniciando servidor en puerto 5173..." -ForegroundColor Yellow
Write-Host ""

try {
    # Iniciar servidor con npm
    Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd '$PWD'; npm run dev" -WindowStyle Normal
    
    Write-Host "SISTEMA INICIADO EXITOSAMENTE!" -ForegroundColor Green
    Write-Host "===============================" -ForegroundColor Green
    Write-Host ""
    Write-Host "ACCESO:" -ForegroundColor Cyan
    Write-Host "• Servidor: http://localhost:5173" -ForegroundColor White
    Write-Host "• Red local: http://192.168.0.104:5173" -ForegroundColor White
    Write-Host ""
    Write-Host "SISTEMA LEGAL PROFESIONAL FUNCIONANDO" -ForegroundColor Green
    
} catch {
    Write-Host "Error al iniciar servidor: $($_.Exception.Message)" -ForegroundColor Red
}
