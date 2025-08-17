# Sistema Legal Profesional - Portal Web Completo

## 🚀 Descripción

Sistema web profesional completo para gestión legal, desarrollado con React, TypeScript y Tailwind CSS. Integra funcionalidades de consultas legales, cursos, e-commerce, gestión de clientes y dashboards administrativos.

## ✨ Características Principales

### 🏠 Páginas Principales
- **Homepage**: Landing page profesional con servicios destacados
- **Servicios**: Catálogo completo de servicios legales
- **Blog**: Sistema de blog con artículos legales
- **Contacto**: Formulario de contacto y información
- **Acerca de**: Información de la firma legal
- **Políticas**: Términos de servicio y política de privacidad

### 🛒 E-commerce Completo
- **Catálogo de Productos**: Ebooks, masterclass y productos digitales
- **Carrito de Compras**: Sistema funcional con persistencia local
- **Checkout**: Proceso de pago integrado
- **Mis Compras**: Historial de compras del usuario
- **Descargas**: Acceso a productos digitales comprados

### 📚 Sistema de Cursos
- **Catálogo de Cursos**: Cursos de derecho civil, penal, comercial
- **Progreso del Usuario**: Seguimiento del avance en cursos
- **Lecciones**: Contenido estructurado por módulos
- **Mis Cursos**: Dashboard personal de cursos inscritos

### 📅 Sistema de Citas
- **Calendario**: Programación de consultas legales
- **Agendamiento**: Reserva de citas en línea
- **Gestión de Citas**: Administración de horarios y disponibilidad
- **Recordatorios**: Notificaciones de citas programadas

### 👥 Gestión de Usuarios
- **Registro/Login**: Sistema de autenticación completo
- **Perfil de Usuario**: Gestión de información personal
- **Dashboard Cliente**: Panel personal con resumen de actividad
- **Dashboard Admin**: Panel administrativo completo

### 📊 Dashboards Administrativos
- **Vista General**: Estadísticas principales del sistema
- **Gestión de Clientes**: Administración de base de clientes
- **Ventas**: Análisis de ventas y productos
- **Calendario**: Gestión de citas y consultas
- **Productos**: Administración del catálogo
- **Cursos**: Gestión de contenido educativo
- **Blog**: Editor de contenido y artículos
- **Configuración**: Ajustes del sistema

### 🔧 Funcionalidades Técnicas
- **Responsive Design**: Optimizado para todos los dispositivos
- **Tema Oscuro/Claro**: Sistema de temas personalizable
- **Persistencia Local**: Datos guardados en localStorage
- **Context API**: Gestión de estado global
- **TypeScript**: Tipado estático para mayor robustez
- **Tailwind CSS**: Framework de estilos moderno

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React 18.2.0**: Biblioteca de interfaz de usuario
- **TypeScript 4.9.3**: Tipado estático
- **Vite 4.1.0**: Build tool y servidor de desarrollo
- **Tailwind CSS 3.2.7**: Framework de CSS utilitario
- **React Router DOM 6.8.0**: Enrutamiento de la aplicación

### UI/UX
- **Headless UI**: Componentes de interfaz accesibles
- **Heroicons**: Iconografía moderna
- **Lucide React**: Iconos adicionales
- **Framer Motion**: Animaciones fluidas
- **Recharts**: Gráficos y visualizaciones

### Estado y Formularios
- **React Context API**: Gestión de estado global
- **React Hook Form**: Manejo de formularios
- **Zod**: Validación de esquemas
- **React Hot Toast**: Notificaciones

### Utilidades
- **Axios**: Cliente HTTP
- **Date-fns**: Manipulación de fechas
- **Lodash**: Utilidades de JavaScript
- **UUID**: Generación de identificadores únicos

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js 16+ 
- npm 8+

### Instalación
```bash
# Clonar el repositorio
git clone <repository-url>
cd sistema-legal-profesional

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Scripts Disponibles
```bash
npm run dev          # Servidor de desarrollo
npm run build        # Construir para producción
npm run preview      # Vista previa de producción
npm run start        # Servidor en puerto 3000
```

## 📁 Estructura del Proyecto

```
src/
├── components/          # Componentes reutilizables
│   ├── Dashboard/      # Dashboards administrativos
│   ├── Cart/          # Componentes del carrito
│   ├── Services/      # Componentes de servicios
│   └── ui/            # Componentes de interfaz
├── pages/              # Páginas de la aplicación
├── context/            # Contextos de React
├── data/               # Datos estáticos y mock
├── services/           # Servicios y APIs
├── types/              # Definiciones de TypeScript
├── utils/              # Utilidades y helpers
├── layouts/            # Layouts de la aplicación
└── assets/             # Recursos estáticos
```

## 🎯 Funcionalidades por Rol

### 👤 Usuario Cliente
- Registro y autenticación
- Explorar servicios legales
- Comprar productos digitales
- Inscribirse en cursos
- Agendar consultas
- Acceder a dashboard personal
- Descargar productos comprados

### 👨‍💼 Administrador
- Dashboard administrativo completo
- Gestión de clientes
- Administración de productos
- Gestión de cursos
- Análisis de ventas
- Configuración del sistema
- Gestión de citas

## 🔐 Autenticación y Seguridad

- Sistema de login/registro
- Contextos de autenticación
- Protección de rutas
- Gestión de tokens
- Sistema de créditos
- Roles de usuario

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints optimizados
- Componentes adaptativos
- Navegación móvil
- Touch-friendly interfaces

## 🌙 Temas y Personalización

- Tema claro/oscuro
- Variables CSS personalizables
- Componentes temáticos
- Transiciones suaves
- Accesibilidad mejorada

## 🚀 Despliegue

### Desarrollo Local
```bash
npm run dev
# Acceder a http://localhost:5173
```

### Producción
```bash
npm run build
npm run preview
```

## 📊 Estado del Proyecto

✅ **Completado:**
- Estructura base del proyecto
- Sistema de autenticación
- Dashboards administrativos
- Sistema de carrito de compras
- Gestión de productos
- Sistema de cursos
- Calendario de citas
- Blog y contenido
- Responsive design

🔄 **En Desarrollo:**
- Integración con APIs reales
- Sistema de pagos
- Notificaciones push
- Analytics avanzados

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature
3. Commit tus cambios
4. Push a la rama
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 📞 Soporte

Para soporte técnico o consultas:
- Email: soporte@firmalegal.com
- Teléfono: +593 XX XXX XXXX
- Horario: Lunes a Viernes 9:00 - 18:00

---

**Desarrollado con ❤️ por el equipo de desarrollo legal** 
