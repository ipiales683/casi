@echo off
chcp 65001 >nul
title SISTEMA ABOGADO WILSON - LOCALHOST

echo.
echo ========================================
echo    SISTEMA ABOGADO WILSON
echo ========================================
echo    Iniciando en Localhost...
echo ========================================
echo.

:: Verificar si Node.js está instalado
echo [1/5] Verificando Node.js...
where node >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: Node.js no está en el PATH
    echo.
    echo Soluciones:
    echo 1. Reinicia PowerShell/CMD después de instalar Node.js
    echo 2. Ejecuta: powershell -ExecutionPolicy Bypass -File instalar-nodejs.ps1
    echo 3. Verifica que Node.js esté en: C:\Program Files\nodejs\
    echo.
    pause
    exit /b 1
)

:: Verificar versión de Node.js
for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
echo ✅ Node.js encontrado: %NODE_VERSION%

:: Verificar si npm está disponible
echo.
echo [2/5] Verificando npm...
where npm >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ ERROR: npm no está disponible
    echo.
    echo Soluciones:
    echo 1. Reinstala Node.js desde https://nodejs.org/
    echo 2. Verifica que npm esté en: C:\Program Files\nodejs\
    echo.
    pause
    exit /b 1
)

:: Verificar versión de npm
for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
echo ✅ npm encontrado: %NPM_VERSION%

:: Verificar si las dependencias están instaladas
echo.
echo [3/5] Verificando dependencias...
if not exist "node_modules" (
    echo ⚠️  Dependencias no encontradas
    echo 📦 Instalando dependencias...
    npm install
    if %errorlevel% neq 0 (
        echo ❌ ERROR: Fallo al instalar dependencias
        echo.
        echo Soluciones:
        echo 1. Verifica tu conexión a internet
        echo 2. Limpia caché: npm cache clean --force
        echo 3. Elimina node_modules y package-lock.json
        echo.
        pause
        exit /b 1
    )
    echo ✅ Dependencias instaladas correctamente
) else (
    echo ✅ Dependencias encontradas
)

:: Verificar archivo de configuración
echo.
echo [4/5] Verificando configuración...
if not exist "vite.config.js" (
    echo ❌ ERROR: vite.config.js no encontrado
    pause
    exit /b 1
)
echo ✅ Configuración de Vite encontrada

:: Iniciar servidor de desarrollo
echo.
echo [5/5] Iniciando servidor de desarrollo...
echo.
echo 🚀 Iniciando en: http://localhost:5173
echo 🌐 Host: 0.0.0.0 (acceso desde cualquier IP)
echo 📱 El navegador se abrirá automáticamente
echo.
echo 💡 Para detener el servidor: Ctrl+C
echo.

:: Iniciar el servidor
npm run dev

:: Si llegamos aquí, hubo un error
echo.
echo ❌ ERROR: El servidor se detuvo inesperadamente
echo.
echo Soluciones comunes:
echo 1. Verifica que el puerto 5173 no esté en uso
echo 2. Ejecuta: netstat -an ^| findstr :5173
echo 3. Reinicia el script
echo.
pause
