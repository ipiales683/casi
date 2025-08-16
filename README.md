# 🏛️ Sistema Abogado Wilson - CMS/ERP Profesional

Un sistema completo y profesional para gestión legal que combina las funcionalidades de un CMS avanzado, ERP, panel de control fácil de usar y constructor de sitios web con y sin IA.

## ✨ Características Principales

### 🎯 **Sistema de Usuarios y Roles**
- **Visitantes**: Acceso limitado a contenido público
- **Clientes**: Dashboard completo con historial de compras, consultas y citas
- **Administradores**: Panel de control total del sistema
- **Afiliados**: Programa de referidos y comisiones

### 🏗️ **Constructor de Sitios Web**
- Constructor visual drag & drop profesional
- Plantillas predefinidas para diferentes tipos de sitios
- Soporte para IA en la creación de contenido
- Diseño responsivo y optimizado para SEO

### 📚 **Gestión de Contenido (CMS)**
- Blog completo con editor enriquecido
- Sistema de categorías y etiquetas
- Gestión de páginas estáticas
- Biblioteca de medios integrada

### 🎓 **Sistema de Cursos**
- Cursos online con lecciones y materiales
- Seguimiento de progreso del estudiante
- Certificados digitales
- Sistema de evaluaciones

### 💰 **E-Commerce y Pagos**
- Catálogo de productos digitales y físicos
- Múltiples pasarelas de pago (PayPal, Stripe, Mercado Pago)
- Sistema de tokens para consultas
- Carrito de compras avanzado

### 📅 **Calendarios y Agendamientos**
- Sistema de citas y reservas
- Calendario integrado
- Recordatorios automáticos
- Gestión de disponibilidad

### 🤖 **Inteligencia Artificial**
- Consultas legales asistidas por IA
- Generación automática de contenido
- Análisis de documentos legales
- Chatbot inteligente

### 📊 **Analíticas y Reportes**
- Dashboard de estadísticas en tiempo real
- Reportes de ventas y usuarios
- Métricas de rendimiento
- Exportación de datos

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mayor robustez
- **Tailwind CSS** - Framework CSS utilitario
- **Vite** - Herramienta de construcción rápida
- **React Router** - Enrutamiento de la aplicación

### Backend
- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **Prisma** - ORM para base de datos
- **Supabase** - Backend como servicio

### Base de Datos
- **PostgreSQL** - Base de datos relacional
- **Redis** - Almacenamiento en caché

### Herramientas de Desarrollo
- **ESLint** - Linter de código
- **Prettier** - Formateador de código
- **Vitest** - Framework de testing
- **Wrangler** - Despliegue en Cloudflare Workers

## 📋 Requisitos del Sistema

### Requisitos Mínimos
- **Node.js**: 18.0.0 o superior
- **npm**: 8.0.0 o superior
- **RAM**: 4GB mínimo
- **Espacio en disco**: 2GB libre

### Requisitos Recomendados
- **Node.js**: 20.0.0 o superior
- **RAM**: 8GB o superior
- **Espacio en disco**: 5GB libre
- **Procesador**: Intel i5 o AMD equivalente

## 🛠️ Instalación

### 1. Clonar el Repositorio
```bash
git clone https://github.com/tu-usuario/abogado-wilson.git
cd abogado-wilson
```

### 2. Instalar Dependencias
```bash
npm install
```

### 3. Configurar Variables de Entorno
```bash
cp env.example .env
# Editar .env con tus configuraciones
```

### 4. Configurar Base de Datos
```bash
npx prisma generate
npx prisma db push
```

### 5. Iniciar en Desarrollo
```bash
npm run dev
```

El sistema estará disponible en: **http://localhost:5173**

## 🚀 Despliegue

### Despliegue Local
```bash
npm run build
npm run preview
```

### Despliegue en Producción
```bash
npm run build
npm run deploy
```

### Despliegue en Cloudflare Workers
```bash
npm run deploy:worker
```

## 📁 Estructura del Proyecto

```
abogado-wilson/
├── src/
│   ├── components/          # Componentes reutilizables
│   │   ├── Admin/          # Componentes de administración
│   │   ├── Auth/           # Componentes de autenticación
│   │   ├── Dashboard/      # Componentes del dashboard
│   │   ├── Common/         # Componentes comunes
│   │   └── ...
│   ├── context/            # Contextos de React
│   ├── middleware/         # Middleware de autenticación
│   ├── services/           # Servicios y APIs
│   ├── utils/              # Utilidades y helpers
│   └── types/              # Definiciones de TypeScript
├── public/                 # Archivos estáticos
├── prisma/                 # Esquemas de base de datos
├── workers/                # Cloudflare Workers
└── docs/                   # Documentación
```

## 🔧 Configuración

### Variables de Entorno
```env
# Base de datos
DATABASE_URL="postgresql://usuario:password@localhost:5432/abogado_wilson"

# Supabase
SUPABASE_URL="https://tu-proyecto.supabase.co"
SUPABASE_ANON_KEY="tu-clave-anonima"

# JWT
JWT_SECRET="tu-secreto-jwt"

# Pagos
PAYPAL_CLIENT_ID="tu-client-id"
STRIPE_SECRET_KEY="tu-clave-secreta"
```

### Configuración de Tailwind
El sistema incluye una paleta de colores profesional y componentes predefinidos:

```javascript
// Colores principales
primary: {
  50: '#eff6ff',
  500: '#3b82f6',
  900: '#1e3a8a'
}

// Colores de estado
success: { 500: '#22c55e' }
warning: { 500: '#f59e0b' }
error: { 500: '#ef4444' }
```

## 📱 Características del Dashboard

### Dashboard de Cliente
- Resumen de consultas y citas
- Gestión de tokens y e-books
- Historial de compras
- Sistema de referidos
- Notificaciones personalizadas

### Dashboard de Administrador
- Gestión completa de usuarios
- Estadísticas de ventas y tráfico
- Gestión de contenido y productos
- Sistema de citas y calendarios
- Reportes y analíticas

## 🔐 Seguridad

- **Autenticación JWT** con refresh tokens
- **Autorización basada en roles** (RBAC)
- **Validación de datos** en frontend y backend
- **Protección CSRF** y XSS
- **Rate limiting** para APIs
- **Encriptación** de datos sensibles

## 📊 Funcionalidades Avanzadas

### Sistema de Notificaciones
- Notificaciones push en tiempo real
- Emails automáticos
- SMS para recordatorios importantes
- WhatsApp Business API

### Integración con APIs Externas
- Google Calendar para citas
- Dropbox/Google Drive para documentos
- Zapier para automatizaciones
- Webhooks para integraciones personalizadas

### Sistema de Backup
- Backup automático de base de datos
- Versionado de archivos
- Recuperación ante desastres
- Sincronización en la nube

## 🧪 Testing

```bash
# Ejecutar tests unitarios
npm run test

# Ejecutar tests de integración
npm run test:integration

# Ejecutar tests E2E
npm run test:e2e

# Cobertura de código
npm run test:coverage
```

## 📈 Monitoreo y Logs

- **Logs estructurados** con Winston
- **Métricas de rendimiento** con Prometheus
- **Alertas automáticas** para errores críticos
- **Dashboard de monitoreo** en tiempo real

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🆘 Soporte

### Canales de Soporte
- **Email**: soporte@abogadowilson.com
- **WhatsApp**: +593 98 883 5269
- **Documentación**: [docs.abogadowilson.com](https://docs.abogadowilson.com)

### Comunidad
- **Discord**: [Unirse al servidor](https://discord.gg/abogadowilson)
- **GitHub Issues**: [Reportar problemas](https://github.com/tu-usuario/abogado-wilson/issues)
- **Wiki**: [Documentación de la comunidad](https://github.com/tu-usuario/abogado-wilson/wiki)

## 🙏 Agradecimientos

- **React Team** por el increíble framework
- **Tailwind CSS** por el sistema de diseño
- **Vite** por la herramienta de construcción
- **Comunidad open source** por las librerías utilizadas

## 📞 Contacto

**Dr. Wilson Ipiales**
- **Email**: contacto@abogadowilson.com
- **Teléfono**: +593 98 883 5269
- **Sitio Web**: [abogadowilson.com](https://abogadowilson.com)

---

⭐ **Si este proyecto te ha sido útil, por favor dale una estrella en GitHub!**
"# Proyecto abg_nueva" 
"# Proyecto abg_nueva" 
"# casi" 
