# Script para instalar Node.js automáticamente en Windows
Write-Host "Descargando e instalando Node.js..." -ForegroundColor Green

# URL de descarga de Node.js LTS
$nodeUrl = "https://nodejs.org/dist/v20.11.1/node-v20.11.1-x64.msi"
$installerPath = "$env:TEMP\nodejs-installer.msi"

try {
    # Descargar el instalador
    Write-Host "Descargando Node.js..." -ForegroundColor Yellow
    Invoke-WebRequest -Uri $nodeUrl -OutFile $installerPath
    
    # Instalar Node.js
    Write-Host "Instalando Node.js..." -ForegroundColor Yellow
    Start-Process -FilePath "msiexec.exe" -ArgumentList "/i `"$installerPath`" /quiet /norestart" -Wait
    
    # Limpiar archivo temporal
    Remove-Item $installerPath -Force
    
    Write-Host "Node.js instalado correctamente!" -ForegroundColor Green
    Write-Host "Reinicia PowerShell para que los cambios tomen efecto." -ForegroundColor Yellow
    
} catch {
    Write-Host "Error al instalar Node.js: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Por favor instala Node.js manualmente desde: https://nodejs.org/" -ForegroundColor Yellow
}

Write-Host "Presiona cualquier tecla para continuar..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
