// Importar Prisma Client
import { PrismaClient } from '@prisma/client';

// Declarar una variable global para el cliente de Prisma
let prisma;

/**
 * Cloudflare Worker limpio y compatible para Abogado Wilson
 * Este archivo resuelve los problemas de sintaxis del worker original
 */

// Función para obtener variables de entorno o valores por defecto
function getEnvVariable(env, name, defaultValue) {
  return env && env[name] !== undefined ? env[name] : defaultValue;
}

// Inicialización tardía de variables globales
let ENV = null;

// Función para inicializar variables globales
function initEnv(env) {
  return {
    SUPABASE_URL: getEnvVariable(env, 'SUPABASE_URL', ''),
    SUPABASE_KEY: getEnvVariable(env, 'SUPABASE_KEY', ''),
    ENVIRONMENT: getEnvVariable(env, 'ENVIRONMENT', 'development'), // Default to development for local
    API_ENABLED: getEnvVariable(env, 'API_ENABLED', 'true') === 'true',
    CORS_ORIGIN: getEnvVariable(env, 'CORS_ORIGIN', '*'),
    WHATSAPP_NUMBER: getEnvVariable(env, 'WHATSAPP_NUMBER', '+59398835269'),
    N8N_WEBHOOK_URL: getEnvVariable(env, 'N8N_WEBHOOK_URL', 'https://n8nom.onrender.com/webhook/1cfd2baa-f5ec-4bc4-a99d-dfb36793eabd'),
    CONTACT_EMAIL: getEnvVariable(env, 'CONTACT_EMAIL', 'Wifirmalegal@gmail.com'),
  };
}

// Configuración estándar de CORS
const standardHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Cache-Control': 'no-cache', // No cache for API
  'X-Content-Type-Options': 'nosniff'
};

// --- API ROUTER ---
async function handleApiRequest(request, env) {
    const url = new URL(request.url);
    const path = url.pathname;

    // Inicializar Prisma Client si aún no está inicializado
    if (!prisma) {
        prisma = new PrismaClient({
            datasources: {
                db: {
                    // For local development, we point to the local SQLite file
                    url: "file:./prisma/dev.db",
                },
            },
        });
    }

    try {
        if (path === '/api/appointments' && request.method === 'GET') {
            const appointments = await prisma.appointment.findMany({
                orderBy: {
                    startTime: 'asc',
                },
                take: 10, // Limit to 10 upcoming appointments
            });
            return new Response(JSON.stringify(appointments), {
                headers: { 'Content-Type': 'application/json', ...standardHeaders }
            });
        }

        // --- Add other API routes here ---

        // Fallback for unknown API routes
        return new Response(JSON.stringify({ error: 'Not Found' }), {
            status: 404,
            headers: { 'Content-Type': 'application/json', ...standardHeaders }
        });

    } catch (error) {
        console.error('API Error:', error);
        return new Response(JSON.stringify({ error: 'Internal Server Error', details: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', ...standardHeaders }
        });
    }
}


/**
 * Renderiza la página de mantenimiento en caso de problemas
 */
function renderMaintenancePage(env) {
  // Asegurar que ENV esté inicializado
  const config = ENV || initEnv(env);
  
  const html = `<!DOCTYPE html>
  <html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Estamos en mantenimiento - Abogado Wilson</title>
    <style>
      body { font-family: system-ui, sans-serif; line-height: 1.5; margin: 0; padding: 0; }
      .container { max-width: 800px; margin: 0 auto; padding: 2rem; }
      .header { color: #2563eb; }
      .message { background-color: #f9fafb; border-left: 4px solid #2563eb; padding: 1rem; }
      .contact { margin-top: 2rem; }
    </style>
  </head>
  <body>
    <div class="container">
      <h1 class="header">Abogado Wilson</h1>
      <div class="message">
        <p>Estamos realizando mejoras en nuestro sitio. Por favor, inténtelo de nuevo en unos minutos.</p>
      </div>
      <div class="contact">
        <p>Para consultas inmediatas:</p>
        <ul>
          <li>Email: ${config.CONTACT_EMAIL}</li>
          <li>WhatsApp: ${config.WHATSAPP_NUMBER}</li>
        </ul>
      </div>
    </div>
  </body>
  </html>`;

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html;charset=UTF-8'
    }
  });
}

/**
 * Maneja las solicitudes a recursos estáticos
 */
async function handleStaticRequest(request, url) {
  // Verificar si es una solicitud de favicon
  if (url.pathname === '/favicon.ico') {
    // Servir el favicon desde la carpeta /dist/favicon.ico
    try {
      return fetch(request);
    } catch (error) {
      console.error('Error al servir favicon:', error);
      // Fallback - responder con una imagen vacía
      return new Response(null, {
        status: 204
      });
    }
  }

  // Intentar servir el archivo estático
  try {
    return fetch(request);
  } catch (error) {
    console.error('Error al servir archivo estático:', error);
    return new Response('Recurso no encontrado', {
      status: 404,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}

/**
 * Función principal del worker para manejar solicitudes
 */
export default {
  async fetch(request, env, ctx) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    };
    
    // Inicializar variables de entorno
    ENV = initEnv(env);
    
    try {
      // Desactivar modo mantenimiento - Sitio listo para producción
      const MAINTENANCE_MODE = false; // Cambiar a true solo cuando sea necesario
      
      if (MAINTENANCE_MODE) {
        return renderMaintenancePage(env);
      }
      
      const url = new URL(request.url);
      
      // Manejar solicitudes CORS OPTIONS
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          status: 204,
          headers: corsHeaders
        });
      }
      
      // Manejar rutas de API
      if (url.pathname.startsWith('/api/')) {
        return handleApiRequest(request, env);
      }
      
      // Manejar recursos estáticos y SPA
      return handleStaticRequest(request, url);
    } catch (error) {
      console.error('Error en worker:', error);
      
      // Respuesta de emergencia en caso de error crítico
      return new Response('Error interno del servidor', {
        status: 500,
        headers: {
          'Content-Type': 'text/plain',
          ...corsHeaders
        }
      });
    }
  }
};
