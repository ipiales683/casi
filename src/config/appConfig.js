// Configuración simplificada de la aplicación
const config = {
  // Configuración de desarrollo
  isDevelopment: import.meta.env.DEV || false,
  isProduction: import.meta.env.PROD || false,
  
  // URLs de la aplicación
  baseUrl: import.meta.env.VITE_APP_BASE_URL || 'http://localhost:5173',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:5173/api',
  
  // Configuración de Google Gemini
  geminiApiKey: 'AIzaSyCAkIkgslyxArR_kg1kVRREzrjeGWavyyU',
  
  // Configuración de Supabase
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://axueygnrasjvrobaszka.supabase.co',
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4dWV5Z25yYXNqdnJvYmFzemthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyODU5NDIsImV4cCI6MjA3MDg2MTk0Mn0.3DtOPYpas6zSFXaLTljjcDY-qWkQbjapIo8J7b8wTmI',
  
  // Configuración de PayPal
  paypalClientId: import.meta.env.VITE_PAYPAL_CLIENT_ID || 'test',
  
  // Configuración de WhatsApp
  whatsappNumber: '+59398835269',
  
  // Configuración de tema
  defaultTheme: 'light',
  defaultPrimaryColor: 'blue',
  
  // Configuración de paginación
  itemsPerPage: 10,
  
  // Configuración de caché
  cacheTimeout: 5 * 60 * 1000, // 5 minutos
  
  // Configuración de errores
  maxRetries: 3,
  retryDelay: 1000,
  
  // Configuración de WebSocket
  websocketUrl: import.meta.env.VITE_WEBSOCKET_URL || 'ws://localhost:8787',
  
  // Configuración de archivos
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: ['image/jpeg', 'image/png', 'image/gif', 'application/pdf'],
  
  // Configuración de seguridad
  sessionTimeout: 24 * 60 * 60 * 1000, // 24 horas
  passwordMinLength: 8,
  
  // Configuración de notificaciones
  notificationTimeout: 5000,
  
  // Configuración de búsqueda
  searchDebounce: 300,
  
  // Configuración de carga
  loadingTimeout: 10000,
  
  // Configuración de validación
  validationTimeout: 2000,
  
  // Configuración de exportación
  exportFormat: 'xlsx',
  
  // Configuración de backup
  autoBackup: true,
  backupInterval: 24 * 60 * 60 * 1000, // 24 horas
};

// Configuración específica de Supabase para supabaseService.js
export const supabaseConfig = {
  url: config.supabaseUrl,
  key: config.supabaseKey,
  serviceKey: import.meta.env.SUPABASE_SERVICE_ROLE_KEY || 'sbp_db5898ecc094d37ec87562399efe3833e63ab20f'
};

// Función getBaseUrl que necesita supabaseService.js
export const getBaseUrl = () => {
  return config.baseUrl;
};

// Función isProduction que necesita supabaseService.js
export const isProduction = () => {
  return config.isProduction;
};

export default config;

// Exportar configuraciones específicas
export const {
  isDevelopment,
  baseUrl,
  apiUrl,
  geminiApiKey,
  supabaseUrl,
  supabaseKey,
  paypalClientId,
  whatsappNumber,
  defaultTheme,
  defaultPrimaryColor,
  itemsPerPage,
  cacheTimeout,
  maxRetries,
  retryDelay,
  websocketUrl,
  maxFileSize,
  allowedFileTypes,
  sessionTimeout,
  passwordMinLength,
  notificationTimeout,
  searchDebounce,
  loadingTimeout,
  validationTimeout,
  exportFormat,
  autoBackup,
  backupInterval
} = config;
