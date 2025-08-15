@echo off
echo ========================================
echo    ABOGADO WILSON - INICIANDO LOCALHOST
echo ========================================
echo.

REM Verificar si existe el archivo .env
if not exist ".env" (
    echo Copiando archivo de configuración...
    copy env.example .env
)

REM Verificar si node_modules existe
if not exist "node_modules" (
    echo Instalando dependencias...
    npm install
)

REM Generar cliente de Prisma
echo Generando cliente de Prisma...
npx prisma generate

REM Iniciar servidor de desarrollo
echo.
echo Iniciando servidor de desarrollo...
echo.
echo ========================================
echo    SERVIDOR DISPONIBLE EN:
echo    http://localhost:5173
echo ========================================
echo.
echo Presiona Ctrl+C para detener el servidor
echo.

npm run dev

pause
