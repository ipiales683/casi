# Script completo de instalación para Windows - Abogado Wilson Website
# Este script instala Node.js, configura el proyecto y lo ejecuta

Write-Host "🚀 Iniciando instalación completa del sistema Abogado Wilson..." -ForegroundColor Green

# Función para verificar si un comando existe
function Test-Command($cmdname) {
    return [bool](Get-Command -Name $cmdname -ErrorAction SilentlyContinue)
}

# Verificar si Node.js está instalado
if (-not (Test-Command "node")) {
    Write-Host "📦 Node.js no está instalado. Instalando..." -ForegroundColor Yellow
    
    # Descargar e instalar Node.js usando winget
    try {
        Write-Host "Instalando Node.js usando winget..." -ForegroundColor Cyan
        winget install OpenJS.NodeJS
        Write-Host "✅ Node.js instalado correctamente" -ForegroundColor Green
        
        # Refrescar variables de entorno
        $machinePath = [System.Environment]::GetEnvironmentVariable("Path","Machine")
        $userPath = [System.Environment]::GetEnvironmentVariable("Path","User")
        $env:Path = "$machinePath;$userPath"
        
        Write-Host "🔄 Variables de entorno actualizadas..." -ForegroundColor Yellow
        Start-Sleep -Seconds 2
    }
    catch {
        Write-Host "❌ Error al instalar Node.js. Por favor instálalo manualmente desde https://nodejs.org/" -ForegroundColor Red
        Write-Host "Presiona cualquier tecla para continuar después de instalar Node.js..."
        $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    }
}

# Verificar Node.js nuevamente
if (Test-Command "node") {
    $nodeVersion = node --version
    Write-Host "✅ Node.js encontrado: $nodeVersion" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js no está disponible. Por favor instálalo manualmente." -ForegroundColor Red
    exit 1
}

# Verificar npm
if (Test-Command "npm") {
    $npmVersion = npm --version
    Write-Host "✅ npm encontrado: $npmVersion" -ForegroundColor Green
} else {
    Write-Host "❌ npm no está disponible." -ForegroundColor Red
    exit 1
}

# Crear archivo .env si no existe
if (-not (Test-Path ".env")) {
    Write-Host "📝 Creando archivo .env..." -ForegroundColor Cyan
    Copy-Item "env.example" ".env"
    Write-Host "✅ Archivo .env creado" -ForegroundColor Green
}

# Instalar dependencias
Write-Host "📦 Instalando dependencias del proyecto..." -ForegroundColor Cyan
npm install

if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Dependencias instaladas correctamente" -ForegroundColor Green
} else {
    Write-Host "❌ Error al instalar dependencias" -ForegroundColor Red
    exit 1
}

# Configurar base de datos
Write-Host "🗄️ Configurando base de datos..." -ForegroundColor Cyan
try {
    npx prisma generate
    Write-Host "✅ Prisma configurado correctamente" -ForegroundColor Green
} catch {
    Write-Host "⚠️ Advertencia: No se pudo configurar Prisma completamente" -ForegroundColor Yellow
}

# Verificar estructura del proyecto
Write-Host "🔍 Verificando estructura del proyecto..." -ForegroundColor Cyan
$requiredDirs = @("src", "src/components", "src/pages", "public")
foreach ($dir in $requiredDirs) {
    if (Test-Path $dir) {
        Write-Host "✅ $dir existe" -ForegroundColor Green
    } else {
        Write-Host "❌ $dir no existe" -ForegroundColor Red
    }
}

# Crear script de inicio rápido
Write-Host "📝 Creando script de inicio rápido..." -ForegroundColor Cyan
$startScript = @"
@echo off
echo 🚀 Iniciando Abogado Wilson Website...
echo.
echo 📍 URL: http://localhost:5173
echo 🔧 Admin: http://localhost:5173/admin
echo 👤 Cliente: http://localhost:5173/cliente
echo.
npm run dev
"@

$startScript | Out-File -FilePath "iniciar.bat" -Encoding UTF8
Write-Host "✅ Script de inicio creado: iniciar.bat" -ForegroundColor Green

# Mostrar información final
Write-Host ""
Write-Host "🎉 ¡Instalación completada!" -ForegroundColor Green
Write-Host ""
Write-Host "📋 Próximos pasos:" -ForegroundColor Cyan
Write-Host "   1. Ejecuta: npm run dev" -ForegroundColor White
Write-Host "   2. Abre: http://localhost:5173" -ForegroundColor White
Write-Host "   3. Para admin: http://localhost:5173/admin" -ForegroundColor White
Write-Host "   4. Para cliente: http://localhost:5173/cliente" -ForegroundColor White
Write-Host ""
Write-Host "🔧 Comandos útiles:" -ForegroundColor Cyan
Write-Host "   - npm run dev (desarrollo)" -ForegroundColor White
Write-Host "   - npm run build (producción)" -ForegroundColor White
Write-Host "   - npm run preview (previsualizar build)" -ForegroundColor White
Write-Host ""

# Preguntar si quiere iniciar el proyecto
$response = Read-Host "¿Quieres iniciar el proyecto ahora? (s/n)"
if ($response -eq "s" -or $response -eq "S" -or $response -eq "y" -or $response -eq "Y") {
    Write-Host "🚀 Iniciando proyecto..." -ForegroundColor Green
    npm run dev
} else {
    Write-Host "✅ Instalación completada. Ejecuta 'npm run dev' cuando estés listo." -ForegroundColor Green
}
