import { createClient } from '@supabase/supabase-js';

// 🌟 CONFIGURACIÓN COMPLETA Y PROFESIONAL DE SUPABASE PARA ABOGADO WILSON 🌟

// Configuración principal de Supabase
const supabaseUrl = 'https://axueygnrasjvrobaszka.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4dWV5Z25yYXNqdnJvYmFzemthIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUyODU5NDIsImV4cCI6MjA3MDg2MTk0Mn0.3DtOPYpas6zSFXaLTljjcDY-qWkQbjapIo8J7b8wTmI';

// Clave de servicio para operaciones del servidor
const supabaseServiceKey = 'sbp_db5898ecc094d37ec87562399efe3833e63ab20f';

// Configuración del proyecto
const projectConfig = {
  projectId: 'axueygnrasjvrobaszka',
  orgId: 'phzldiaohelbyobhjrnc',
  region: 'us-east-1'
};

// Crear cliente de Supabase para el navegador (anon)
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
    flowType: 'pkce'
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  },
  global: {
    headers: {
      'X-Client-Info': 'abogado-wilson-web@2.0.0',
      'X-Client-Version': '2.0.0'
    }
  }
});

// Cliente de servicio para operaciones del servidor (solo usar en backend)
export const supabaseService = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

// Configuración de autenticación
export const authConfig = {
  // Configuración de Google OAuth
  google: {
    clientId: '129545559768-naib291thttn6em69i4o4q33erm7kitt.apps.googleusercontent.com',
    redirectUri: 'https://axueygnrasjvrobaszka.supabase.co/auth/v1/callback'
  },
  
  // Configuración de sesión
  session: {
    refreshThreshold: 60 * 60, // 1 hora
    persistSession: true,
    storageKey: 'abogado-wilson-auth-v2'
  },
  
  // Configuración de seguridad
  security: {
    enablePasswordValidation: true,
    minPasswordLength: 8,
    requireEmailConfirmation: true,
    enableMFA: true
  }
};

// Configuración de la base de datos
export const databaseConfig = {
  // Tablas principales
  tables: {
    users: 'users',
    profiles: 'profiles',
    legal_cases: 'legal_cases',
    appointments: 'appointments',
    consultations: 'consultations',
    documents: 'documents',
    payments: 'payments',
    affiliates: 'affiliates',
    blog_posts: 'blog_posts',
    courses: 'courses',
    ebooks: 'ebooks',
    tokens: 'tokens',
    services: 'services',
    categories: 'categories',
    testimonials: 'testimonials',
    notifications: 'notifications',
    chat_messages: 'chat_messages',
    file_uploads: 'file_uploads'
  },
  
  // Configuración de RLS (Row Level Security)
  rls: {
    enabled: true,
    policies: {
      users: {
        select: 'auth.uid() = id',
        insert: 'auth.uid() = id',
        update: 'auth.uid() = id',
        delete: 'auth.uid() = id'
      },
      profiles: {
        select: 'auth.uid() = user_id',
        insert: 'auth.uid() = user_id',
        update: 'auth.uid() = user_id',
        delete: 'auth.uid() = user_id'
      },
      legal_cases: {
        select: 'auth.uid() = user_id OR auth.uid() IN (SELECT user_id FROM profiles WHERE role = \'admin\')',
        insert: 'auth.uid() = user_id',
        update: 'auth.uid() = user_id OR auth.uid() IN (SELECT user_id FROM profiles WHERE role = \'admin\')',
        delete: 'auth.uid() = user_id OR auth.uid() IN (SELECT user_id FROM profiles WHERE role = \'admin\')'
      }
    }
  }
};

// Configuración de almacenamiento
export const storageConfig = {
  buckets: {
    documents: 'legal-documents',
    images: 'profile-images',
    files: 'case-files',
    avatars: 'user-avatars'
  },
  maxFileSize: 10 * 1024 * 1024, // 10MB
  allowedFileTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ]
};

// Configuración de funciones edge
export const edgeFunctions = {
  baseUrl: 'https://axueygnrasjvrobaszka.supabase.co/functions/v1',
  functions: {
    sendEmail: 'send-email',
    processPayment: 'process-payment',
    generatePDF: 'generate-pdf',
    analyzeDocument: 'analyze-document',
    scheduleAppointment: 'schedule-appointment'
  }
};

// Configuración de webhooks
export const webhookConfig = {
  n8n: {
    baseUrl: 'https://n8nom.onrender.com',
    apiKey: 'eyJhbGciOiJIUzI1NilsInR5cCI6IkpXVCJ9.eyJzdWliOilwYTAyOTI1Yy0wYmQzLTRWZTQtYWU1MC1lMzE4YmFlYjAyMDIiLCJpc3MiOiJuOG4iLCJhdWQiOiJwdWJsaWMtYXBpliwiaWF0IjoxNzQ1MDcwMjQxfQ.qRIKTOe3b6cMnxaIcYaa0QjEzukpgUAp3zgJwR9b6Mw',
    webhooks: {
      test: 'https://n8nom.onrender.com/webhook-test/1cfd2baa-f5ec-4bc4-a99d-dfb36793eabd',
      production: 'https://n8nom.onrender.com/webhook/1cfd2baa-f5ec-4bc4-a99d-dfb36793eabd'
    }
  }
};

// Configuración de integraciones externas
export const integrations = {
  whatsapp: {
    apiKey: '+59398835269',
    webhookUrl: 'https://api.whatsapp.com/webhook'
  },
  paypal: {
    clientId: 'test',
    mode: 'sandbox'
  },
  gemini: {
    apiKey: 'AIzaSyCAkIkgslyxArR_kg1kVRREzrjeGWavyyU'
  }
};

// Función para obtener configuración completa
export const getConfig = () => ({
  supabase: {
    url: supabaseUrl,
    anonKey: supabaseAnonKey,
    serviceKey: supabaseServiceKey
  },
  project: projectConfig,
  auth: authConfig,
  database: databaseConfig,
  storage: storageConfig,
  edgeFunctions,
  webhooks: webhookConfig,
  integrations
});

// Función para verificar conectividad
export const checkConnection = async () => {
  try {
    const { data, error } = await supabase.from('profiles').select('count').limit(1);
    if (error) throw error;
    return { connected: true, message: 'Conexión exitosa a Supabase' };
  } catch (error) {
    return { connected: false, message: `Error de conexión: ${error.message}` };
  }
};

// Función para obtener estadísticas del sistema
export const getSystemStats = async () => {
  try {
    const stats = {};
    
    // Contar usuarios
    const { count: userCount } = await supabase
      .from('profiles')
      .select('*', { count: 'exact', head: true });
    stats.users = userCount || 0;
    
    // Contar casos legales
    const { count: caseCount } = await supabase
      .from('legal_cases')
      .select('*', { count: 'exact', head: true });
    stats.cases = caseCount || 0;
    
    // Contar citas
    const { count: appointmentCount } = await supabase
      .from('appointments')
      .select('*', { count: 'exact', head: true });
    stats.appointments = appointmentCount || 0;
    
    return { success: true, stats };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export default supabase;
