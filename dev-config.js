// Configuración para entorno de desarrollo
// Este archivo centraliza las configuraciones de puertos, endpoints y fallbacks
// para facilitar el desarrollo local y resolver problemas comunes.

// Configuración de puertos
const BACKEND_PORT = 8787;
const FRONTEND_PORT = 5173;

// Configuración de URLs
const BACKEND_URL = `http://localhost:${BACKEND_PORT}`;
const FRONTEND_URL = `http://localhost:${FRONTEND_PORT}`;
const WEBSOCKET_URL = `ws://localhost:${BACKEND_PORT}/ws`;
const API_URL = `${BACKEND_URL}/api`;

// Tiempos de espera y reintentos
const CONNECTION_TIMEOUT = 5000; // 5 segundos
const MAX_RECONNECT_ATTEMPTS = 5;
const RECONNECT_INTERVAL = 2000; // 2 segundos

// Rutas para fallback de módulos
const MODULE_FALLBACK_PATHS = {
  // Si un módulo no se encuentra en la ruta principal, se buscará en estas rutas alternativas
  // Formato: 'nombre-módulo': ['ruta-alternativa-1', 'ruta-alternativa-2']
  'consultas': ['./components', './pages'],
  'auth': ['./components/Auth', './pages/Auth'],
  'consultation': ['./components/Consultation', './pages/Consultation']
};

// Configuración de debug
const DEBUG = {
  websocket: true,
  api: true,
  auth: true,
  modules: true
};

// Exportar configuración
export default {
  // Configuración básica
  ports: {
    frontend: FRONTEND_PORT,     // Puerto de Vite
    backend: BACKEND_PORT,      // Puerto de Wrangler Worker (debe ser 8787 para compatibilidad)
    websocket: BACKEND_PORT     // Puerto de WebSocket (debe coincidir con backend)
  },
  
  // Endpoints API para desarrollo local
  endpoints: {
    api: API_URL,
    websocket: WEBSOCKET_URL
  },
  
  // Configuración avanzada
  connectionTimeout: CONNECTION_TIMEOUT,
  maxReconnectAttempts: MAX_RECONNECT_ATTEMPTS,
  reconnectInterval: RECONNECT_INTERVAL,
  moduleFallbackPaths: MODULE_FALLBACK_PATHS,
  debug: DEBUG,
  
  // Configuración para deshabilitar conexiones WebSocket en modo offline
  offline: {
    enabled: false,
    fallbackDelay: 500
  }
};
