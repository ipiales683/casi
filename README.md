# 🏛️ Abogado Wilson - Sistema Legal Completo

Un sistema web profesional y completo para bufete de abogados con todas las funcionalidades modernas necesarias para la gestión legal digital.

## ✨ Características Principales

### 🎨 **Diseño y Experiencia de Usuario**
- **Tema Dinámico**: Cambio entre modo claro y oscuro
- **Paleta de Colores Personalizable**: 5 esquemas de color (Azul, Verde, Púrpura, Rojo, Naranja)
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **Animaciones Suaves**: Transiciones y efectos visuales profesionales
- **Interfaz Moderna**: UI/UX de última generación

### 👤 **Sistema de Usuarios**
- **Registro y Autenticación**: Sistema completo de usuarios
- **Perfiles Personalizables**: Gestión de información personal
- **Roles de Usuario**: Cliente, Administrador, Abogado
- **Dashboard Personalizado**: Panel específico por tipo de usuario

### 🏢 **Dashboard de Administración**
- **Gestión de Usuarios**: CRUD completo de usuarios
- **Gestión de Productos**: Servicios y productos legales
- **Gestión de Cursos**: Sistema de cursos online
- **Gestión de Blog**: Publicación y edición de artículos
- **Gestión de Citas**: Calendario y agenda
- **Configuración del Sistema**: Ajustes generales y de pago
- **Estadísticas en Tiempo Real**: Métricas y reportes

### 💳 **Sistema de Pagos Completo**
- **PayPal**: Integración directa
- **Tarjetas de Crédito/Débito**: Procesamiento seguro
- **Criptomonedas**: Bitcoin, Ethereum, USDT
- **Transferencias Bancarias**: Con comprobante de pago
- **Múltiples Monedas**: Soporte para USD, EUR, etc.

### 🎓 **Sistema de Cursos**
- **Reproductor de Video Avanzado**: Controles completos
- **Seguimiento de Progreso**: Progreso por lección y curso
- **Certificados**: Generación automática de certificados
- **Categorías**: Penal, Civil, Laboral, Tránsito, etc.
- **Niveles**: Básico, Intermedio, Avanzado

### 🤖 **Consultas con IA (Gemini)**
- **API de Google Gemini**: Respuestas inteligentes
- **Categorías Especializadas**: Por área de derecho
- **Plantillas de Consultas**: Consultas comunes predefinidas
- **Historial de Consultas**: Guardado automático
- **Exportación**: Descarga de conversaciones
- **Grabación de Voz**: Entrada por voz (próximamente)

### 📚 **Gestión de Contenido**
- **Blog Profesional**: Artículos legales
- **E-books**: Descargas protegidas
- **Noticias Jurídicas**: Actualizaciones legales
- **Recursos Descargables**: Documentos y plantillas

### 📅 **Sistema de Citas**
- **Calendario Interactivo**: Programación de citas
- **Notificaciones**: Recordatorios automáticos
- **Gestión de Horarios**: Disponibilidad de abogados
- **Confirmaciones**: Sistema de confirmación

### 👥 **Sistema de Afiliados**
- **Programa de Referidos**: Comisiones por referencias
- **Dashboard de Afiliados**: Seguimiento de ganancias
- **Sistema de Comisiones**: Cálculo automático
- **Reportes**: Estadísticas de afiliados

### 💬 **Comunicación**
- **Chat en Vivo**: Comunicación directa
- **WhatsApp Integration**: Conexión directa
- **Sistema de Mensajería**: Mensajes internos
- **Notificaciones Push**: Alertas en tiempo real

### 🔒 **Seguridad y Privacidad**
- **Autenticación Segura**: JWT tokens
- **Encriptación SSL**: 256 bits
- **Protección de Datos**: GDPR compliant
- **Backups Automáticos**: Respaldo de información

## 🚀 Tecnologías Utilizadas

### Frontend
- **React 18**: Framework principal
- **TypeScript**: Tipado estático
- **Tailwind CSS**: Framework de estilos
- **Framer Motion**: Animaciones
- **React Router**: Navegación
- **React Query**: Gestión de estado
- **React Hot Toast**: Notificaciones

### Backend
- **Node.js**: Runtime de JavaScript
- **Express.js**: Framework web
- **Supabase**: Base de datos y autenticación
- **Prisma**: ORM para base de datos
- **Cloudflare Workers**: Edge computing

### APIs y Servicios
- **Google Gemini AI**: Inteligencia artificial
- **PayPal API**: Procesamiento de pagos
- **WhatsApp Business API**: Mensajería
- **Cloudflare**: CDN y hosting

## 📦 Instalación

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Cuenta de Supabase
- API Key de Google Gemini

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/abogado-wilson.git
cd abogado-wilson
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp env.example .env
```

Editar `.env` con tus credenciales:
```env
VITE_SUPABASE_URL=tu_url_de_supabase
VITE_SUPABASE_ANON_KEY=tu_clave_anonima
VITE_GEMINI_API_KEY=tu_api_key_de_gemini
VITE_PAYPAL_CLIENT_ID=tu_client_id_de_paypal
```

4. **Configurar base de datos**
```bash
npx prisma generate
npx prisma db push
```

5. **Ejecutar en desarrollo**
```bash
npm run dev
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/
│   ├── Admin/           # Dashboard de administración
│   ├── Auth/           # Componentes de autenticación
│   ├── Blog/           # Sistema de blog
│   ├── Chat/           # Sistema de chat
│   ├── Common/         # Componentes comunes
│   ├── Consultation/   # Sistema de consultas
│   ├── Courses/        # Sistema de cursos
│   ├── Dashboard/      # Dashboard de clientes
│   ├── Navigation/     # Navegación
│   └── Payment/        # Sistema de pagos
├── context/            # Contextos de React
├── services/           # Servicios y APIs
├── utils/              # Utilidades
└── types/              # Tipos de TypeScript
```

## 🔧 Configuración

### Configuración de Temas
El sistema incluye un sistema de temas completo con:
- Modo claro/oscuro
- 5 paletas de colores
- Transiciones suaves
- Persistencia de preferencias

### Configuración de Pagos
Soporte para múltiples métodos de pago:
- PayPal (sandbox y producción)
- Stripe (tarjetas)
- Criptomonedas
- Transferencias bancarias

### Configuración de IA
Integración con Google Gemini para:
- Consultas legales automatizadas
- Respuestas especializadas
- Análisis de documentos
- Generación de contenido

## 📱 Funcionalidades Móviles

- **Diseño Responsivo**: Optimizado para móviles
- **PWA Ready**: Instalable como app
- **Offline Support**: Funcionalidad sin conexión
- **Touch Gestures**: Gestos táctiles
- **Push Notifications**: Notificaciones push

## 🔄 Despliegue

### Despliegue en Cloudflare Pages
```bash
npm run build
wrangler pages deploy dist
```

### Despliegue en Vercel
```bash
npm run build
vercel --prod
```

### Despliegue en Netlify
```bash
npm run build
netlify deploy --prod
```

## 📊 Monitoreo y Analytics

- **Google Analytics**: Seguimiento de usuarios
- **Error Tracking**: Captura de errores
- **Performance Monitoring**: Monitoreo de rendimiento
- **User Behavior**: Análisis de comportamiento

## 🔒 Seguridad

- **HTTPS**: Conexiones seguras
- **CORS**: Configuración de seguridad
- **Rate Limiting**: Limitación de requests
- **Input Validation**: Validación de entradas
- **SQL Injection Protection**: Protección contra inyección SQL

## 📈 Escalabilidad

- **CDN**: Distribución de contenido
- **Caching**: Caché inteligente
- **Database Optimization**: Optimización de base de datos
- **Load Balancing**: Balanceo de carga
- **Microservices Ready**: Preparado para microservicios

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE.md](LICENSE.md) para detalles.

## 📞 Soporte

- **Email**: contacto@abogadowilson.com
- **WhatsApp**: +593 98 883 5269
- **Teléfono**: +593 98 883 5269

## 🎯 Roadmap

### Próximas Funcionalidades
- [ ] App móvil nativa
- [ ] Integración con más IAs
- [ ] Sistema de videollamadas
- [ ] Blockchain para contratos
- [ ] Machine Learning para análisis de casos
- [ ] Integración con sistemas judiciales
- [ ] Sistema de facturación automática
- [ ] CRM avanzado

---

**Desarrollado con ❤️ para el bufete de abogados Wilson Ipiales**
