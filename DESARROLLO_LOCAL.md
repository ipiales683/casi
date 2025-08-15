# 🚀 Desarrollo Local - Abogado Wilson Website

## 📋 Requisitos Previos

### Software Necesario
- **Node.js** (versión 18 o superior)
- **npm** (incluido con Node.js)
- **Git** (para clonar el repositorio)

### Instalación de Node.js
1. Descarga Node.js desde [https://nodejs.org/](https://nodejs.org/)
2. Instala la versión LTS (recomendada)
3. Verifica la instalación:
   ```bash
   node --version
   npm --version
   ```

## 🛠️ Instalación Rápida

### Opción 1: Instalación Automática (Recomendada)
```powershell
# Ejecutar como administrador en PowerShell
powershell -ExecutionPolicy Bypass -File setup-complete.ps1
```

### Opción 2: Instalación Manual
```bash
# 1. Clonar el repositorio (si no lo tienes)
git clone <url-del-repositorio>
cd ipiales

# 2. Instalar dependencias
npm install

# 3. Configurar variables de entorno
copy env.example .env

# 4. Configurar base de datos
npx prisma generate

# 5. Iniciar desarrollo
npm run dev
```

### Opción 3: Script de Inicio Rápido
```bash
# En Windows, simplemente ejecuta:
iniciar-localhost.bat
```

## 🌐 URLs de Desarrollo

Una vez iniciado el proyecto, tendrás acceso a:

| URL | Descripción |
|-----|-------------|
| http://localhost:5173 | **Frontend principal** |
| http://localhost:5173/admin | **Panel de administración** |
| http://localhost:5173/cliente | **Dashboard de cliente** |
| http://localhost:5173/consulta-ia | **Consultas con IA** |
| http://localhost:5173/cursos | **Sistema de cursos** |
| http://localhost:5173/payment | **Sistema de pagos** |
| http://localhost:8787 | **API Backend** |

## 🔧 Comandos Útiles

### Desarrollo
```bash
npm run dev          # Iniciar servidor de desarrollo
npm run dev:fast     # Iniciar con recarga forzada
npm run build        # Construir para producción
npm run preview      # Previsualizar build
```

### Mantenimiento
```bash
npm run clean        # Limpiar archivos generados
npm run clean:cache  # Limpiar caché de Vite
npm run lint         # Verificar código
npm run lint:fix     # Corregir problemas de linting
npm run format       # Formatear código
```

### Base de Datos
```bash
npx prisma generate  # Generar cliente Prisma
npx prisma db push   # Sincronizar esquema
npx prisma studio    # Abrir interfaz de base de datos
```

## 📁 Estructura del Proyecto

```
ipiales/
├── src/
│   ├── components/          # Componentes React
│   │   ├── Admin/          # Panel de administración
│   │   ├── Auth/           # Autenticación
│   │   ├── Dashboard/      # Dashboards
│   │   ├── Payment/        # Sistema de pagos
│   │   ├── Courses/        # Sistema de cursos
│   │   └── Consultation/   # Consultas IA
│   ├── context/            # Contextos React
│   ├── services/           # Servicios API
│   ├── utils/              # Utilidades
│   └── pages/              # Páginas
├── public/                 # Archivos estáticos
├── prisma/                 # Esquema de base de datos
├── workers/                # Cloudflare Workers
└── docs/                   # Documentación
```

## 🔐 Configuración de Autenticación

### Usuarios de Prueba
El sistema incluye usuarios de prueba para desarrollo:

**Administrador:**
- Email: admin@abogadowilson.com
- Password: admin123

**Cliente:**
- Email: cliente@abogadowilson.com
- Password: cliente123

### Crear Nuevos Usuarios
1. Ve a http://localhost:5173/registro
2. Completa el formulario de registro
3. Verifica tu email (en desarrollo, se simula)

## 💳 Sistema de Pagos

### Métodos Disponibles
- **PayPal**: Configurado para sandbox
- **Tarjetas de Crédito**: Simulación completa
- **Criptomonedas**: Bitcoin, Ethereum
- **Transferencia Bancaria**: Con comprobante

### Configuración de Prueba
```bash
# PayPal Sandbox
Email: sb-123456789@business.example.com
Password: test123

# Tarjetas de Prueba
Número: 4111 1111 1111 1111
CVV: 123
Fecha: Cualquier fecha futura
```

## 🎓 Sistema de Cursos

### Características
- **Reproductor de video** integrado
- **Seguimiento de progreso** automático
- **Certificados** de finalización
- **Evaluaciones** interactivas

### Cursos Disponibles
1. **Derecho Penal Básico**
2. **Derecho Civil Fundamental**
3. **Derecho Comercial**
4. **Derecho de Tránsito**
5. **Derecho Aduanero**

## 🤖 Consultas con IA

### Configuración
El sistema utiliza Google Gemini AI para consultas legales:

```javascript
// API Key configurada en .env
GEMINI_API_KEY="AIzaSyCAkIkgslyxArR_kg1kVRREzrjeGWavyyU"
```

### Funcionalidades
- **Chat en tiempo real** con IA
- **Categorización** de consultas
- **Historial** de conversaciones
- **Exportación** de respuestas

## 🎨 Sistema de Temas

### Temas Disponibles
- **Claro/Oscuro**: Toggle automático
- **Colores Primarios**: Azul, Verde, Púrpura, Rojo, Naranja

### Personalización
```javascript
// En cualquier componente
import { useTheme } from '../context/ThemeContext';

const { theme, toggleTheme, changePrimaryColor } = useTheme();
```

## 🐛 Solución de Problemas

### Error: "npm no se reconoce"
```bash
# Reinstalar Node.js desde https://nodejs.org/
# O usar winget en Windows:
winget install OpenJS.NodeJS
```

### Error: "Puerto 5173 en uso"
```bash
# Cambiar puerto en vite.config.local.js
server: {
  port: 3000  # Cambiar a otro puerto
}
```

### Error: "Módulo no encontrado"
```bash
# Limpiar caché e reinstalar
npm run clean:cache
npm install
```

### Error: "Base de datos no disponible"
```bash
# Verificar configuración de Prisma
npx prisma generate
npx prisma db push
```

## 📞 Soporte

### Logs de Desarrollo
```bash
# Ver logs en tiempo real
npm run dev

# Logs específicos en la consola del navegador
# F12 → Console
```

### Recursos Adicionales
- **Documentación**: README.md
- **API Docs**: http://localhost:8787/docs
- **Prisma Studio**: npx prisma studio

## 🚀 Despliegue

### Desarrollo Local
```bash
npm run dev
```

### Producción
```bash
npm run build
npm run preview
```

### Cloudflare Workers
```bash
npm run deploy
```

---

**¡Disfruta desarrollando con Abogado Wilson Website! 🎉**
