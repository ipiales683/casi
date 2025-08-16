# 🚀 INSTRUCCIONES PARA LOCALHOST - SISTEMA ABOGADO WILSON

## 📋 **REQUISITOS PREVIOS**

### **1. Node.js y npm**
- ✅ **Node.js 18+** instalado y funcionando
- ✅ **npm** disponible en el sistema
- ✅ **PATH** configurado correctamente

### **2. Sistema Operativo**
- ✅ **Windows 10/11** (recomendado)
- ✅ **PowerShell 5.1+** o **CMD**
- ✅ **Permisos de administrador** (opcional)

---

## 🎯 **OPCIONES DE INICIO**

### **Opción 1: Script de PowerShell (RECOMENDADO)**
```powershell
# Inicio normal
.\iniciar-localhost.ps1

# Limpiar e instalar todo
.\iniciar-localhost.ps1 -Clean

# Forzar reinstalación
.\iniciar-localhost.ps1 -Force

# Mostrar ayuda
.\iniciar-localhost.ps1 -Help
```

### **Opción 2: Script de Windows (CMD)**
```cmd
iniciar-localhost.bat
```

### **Opción 3: Comandos manuales**
```powershell
# Verificar Node.js
node --version
npm --version

# Instalar dependencias
npm install

# Iniciar servidor
npm run dev
```

---

## 🔧 **CONFIGURACIÓN DEL SISTEMA**

### **Archivos de Configuración**
- ✅ `vite.config.js` - Configuración de Vite
- ✅ `tailwind.config.js` - Configuración de Tailwind CSS
- ✅ `postcss.config.js` - Configuración de PostCSS
- ✅ `env.local` - Variables de entorno
- ✅ `package.json` - Dependencias del proyecto

### **Puertos Utilizados**
- 🌐 **Frontend**: `http://localhost:5173`
- 🔌 **Backend API**: `http://localhost:3000` (opcional)
- 📡 **WebSocket**: `ws://localhost:3000` (opcional)

---

## 🚀 **PROCESO DE INICIO AUTOMÁTICO**

### **Paso 1: Verificación del Sistema**
```
[1/6] Verificando Node.js... ✅
[2/6] Verificando npm... ✅
[3/6] Verificando dependencias... ✅
[4/6] Verificando configuración... ✅
[5/6] Verificando puerto 5173... ✅
[6/6] Iniciando servidor de desarrollo... ✅
```

### **Paso 2: Inicio del Servidor**
```
🚀 Iniciando en: http://localhost:5173
🌐 Host: 0.0.0.0 (acceso desde cualquier IP)
📱 El navegador se abrirá automáticamente
💡 Para detener el servidor: Ctrl+C
```

---

## 🌐 **ACCESO AL SISTEMA**

### **URLs Principales**
- 🏠 **Página Principal**: `http://localhost:5173/`
- 👤 **Dashboard Cliente**: `http://localhost:5173/dashboard`
- 🔧 **Dashboard Admin**: `http://localhost:5173/admin`
- 📝 **Blog**: `http://localhost:5173/blog`
- 🎓 **Cursos**: `http://localhost:5173/cursos`
- 💰 **Pagos**: `http://localhost:5173/pagos`

### **Acceso desde Otros Dispositivos**
- 📱 **Móvil/Tablet**: `http://[TU_IP_LOCAL]:5173`
- 💻 **Otro PC**: `http://[TU_IP_LOCAL]:5173`
- 🌍 **Red Local**: Cualquier dispositivo en tu red

---

## 🛠️ **SOLUCIÓN DE PROBLEMAS**

### **Problema 1: Node.js no encontrado**
```powershell
# Solución: Instalar Node.js
.\instalar-nodejs.ps1

# O descargar manualmente desde:
# https://nodejs.org/
```

### **Problema 2: Dependencias corruptas**
```powershell
# Solución: Limpiar e reinstalar
.\iniciar-localhost.ps1 -Clean
```

### **Problema 3: Puerto en uso**
```powershell
# Verificar qué usa el puerto 5173
netstat -an | findstr :5173

# O usar otro puerto
npm run dev -- --port 3000
```

### **Problema 4: Errores de módulos**
```powershell
# Solución: Reinstalar dependencias
Remove-Item -Path "node_modules" -Recurse -Force
Remove-Item -Path "package-lock.json" -Force
npm install
```

---

## 📱 **FUNCIONALIDADES DISPONIBLES**

### **Para Visitantes**
- ✅ Página de inicio profesional
- ✅ Información de servicios legales
- ✅ Formulario de contacto
- ✅ Blog y artículos
- ✅ Catálogo de cursos
- ✅ Información sobre el abogado

### **Para Clientes Registrados**
- ✅ Dashboard personal completo
- ✅ Gestión de consultas
- ✅ Agendamiento de citas
- ✅ Acceso a e-books
- ✅ Sistema de tokens
- ✅ Historial de servicios

### **Para Administradores**
- ✅ Panel de control completo
- ✅ Gestión de usuarios
- ✅ Gestión de productos/servicios
- ✅ Gestión de citas
- ✅ Analytics y reportes
- ✅ Configuración del sistema

---

## 🔒 **SEGURIDAD Y DESARROLLO**

### **Modo Desarrollo**
- ✅ **Hot Reload** habilitado
- ✅ **Source Maps** activos
- ✅ **Debug** habilitado
- ✅ **CORS** configurado
- ✅ **HTTPS** deshabilitado (desarrollo)

### **Variables de Entorno**
- ✅ Configuración de APIs
- ✅ Claves de servicios externos
- ✅ URLs de desarrollo
- ✅ Configuración de base de datos

---

## 📚 **RECURSOS ADICIONALES**

### **Documentación**
- 📖 **README.md** - Información general del proyecto
- 🔧 **USO_LOCALHOST.md** - Guía específica de localhost
- 🚀 **DESARROLLO_LOCAL.md** - Guía de desarrollo

### **Scripts de Utilidad**
- 🧹 **setup-complete.ps1** - Configuración completa
- 🚀 **iniciar-localhost.ps1** - Inicio profesional
- 📦 **instalar-nodejs.ps1** - Instalación de Node.js

---

## 🆘 **SOPORTE Y AYUDA**

### **Comandos de Ayuda**
```powershell
# Mostrar ayuda del script
.\iniciar-localhost.ps1 -Help

# Verificar estado del sistema
Get-Process | Where-Object {$_.ProcessName -eq "node"}

# Verificar puertos en uso
netstat -an | findstr :5173
```

### **Contacto de Soporte**
- 📧 **Email**: soporte@abogadowilson.com
- 📱 **WhatsApp**: +593 98 883 5269
- 🌐 **Sitio Web**: https://abogadowilson.com

---

## ✨ **CARACTERÍSTICAS DESTACADAS**

### **Sistema Completo**
- 🏗️ **CMS/ERP** profesional
- 👥 **Gestión de usuarios** con roles
- 💳 **Sistema de pagos** integrado
- 📅 **Calendario** y agendamiento
- 🤖 **IA** para consultas legales
- 📊 **Analytics** y reportes

### **Tecnologías Modernas**
- ⚛️ **React 18** con hooks
- 🎨 **Tailwind CSS** profesional
- 🚀 **Vite** para desarrollo rápido
- 🔄 **TypeScript** opcional
- 📱 **Responsive** design
- 🌐 **PWA** ready

---

**🎯 ¡Tu sistema está listo para funcionar profesionalmente en localhost!**

