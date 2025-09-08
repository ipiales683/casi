/**
 * CLOUDFLARE WORKER DEFINITIVO - ABOGADO WILSON
 * Solución final probada y verificada para SPAs en Cloudflare Workers
 * Este Worker ahora se enfoca únicamente en el enrutamiento de API y CORS.
 * El HTML y los assets estáticos deben ser servidos por Cloudflare Pages o un servidor de desarrollo.
 */

// Importar los manejadores de API
import { handleContactosRequest } from './workers-site/api/contactos';
import { handleSupabaseProxy, checkSupabaseConnection } from './workers-site/api/supabase-proxy';
import { handleBlogRequest } from './workers-site/api/blog';
import { handleChatRequest } from './workers-site/api/chat';
import { handleConfigHandler } from './workers-site/api/config-handler';
import { handleLegalQueries } from './workers-site/api/legal-queries';
import { handleProxyHandler } from './workers-site/api/proxy-handler';
import { handleSearches } from './workers-site/api/searches';
import { handleProductsRequest } from './workers-site/api/products';
import { handleAuthRequest } from './workers-site/api/auth';
import { handleEbooksRequest, handleTokensRequest } from './workers-site/api/ebooks';
import { handleSubscriptions } from './workers-site/api/subscriptions';
import { handleOrders } from './workers-site/api/orders';
import { handleCertificates } from './workers-site/api/certificates';
import { handlePayments } from './workers-site/api/payments';

addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  const path = url.pathname;

  // Headers estándar para todas las respuestas (incluyendo CORS)
  const defaultHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With',
    'Access-Control-Max-Age': '86400', // Cache preflight for 24 hours
  };

  // Manejo CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: defaultHeaders
    });
  }

  // Rutas de API
  if (path.startsWith('/api/')) {
    // Establecer el Content-Type para respuestas JSON de API
    const apiHeaders = { ...defaultHeaders, 'Content-Type': 'application/json' };

    try {
      if (path.startsWith('/api/contactos')) {
        return handleContactosRequest(request);
      } else if (path.startsWith('/api/supabase-check')) {
        return checkSupabaseConnection();
      } else if (path.startsWith('/api/supabase')) {
        // Example: /api/supabase/rest/v1/profiles
        const supabasePath = path.substring('/api/supabase'.length);
        return handleSupabaseProxy(request, supabasePath);
      } else if (path.startsWith('/api/blog')) {
          return handleBlogRequest(request);
      } else if (path.startsWith('/api/chat')) {
          return handleChatRequest(request);
      } else if (path.startsWith('/api/products')) {
          return handleProductsRequest(request);
      } else if (path.startsWith('/api/auth')) {
          return handleAuthRequest(request);
      } else if (path.startsWith('/api/ebooks')) {
          return handleEbooksRequest(request);
      } else if (path.startsWith('/api/tokens')) {
          return handleTokensRequest(request);
      } else if (path.startsWith('/api/config')) {
          return handleConfigHandler(request);
      } else if (path.startsWith('/api/legal-queries')) {
          return handleLegalQueries(request);
      } else if (path.startsWith('/api/proxy')) {
          return handleProxyHandler(request);
      } else if (path.startsWith('/api/searches') || path.startsWith('/api/data/searches')) {
          return handleSearches(request);
      } else if (
        path === '/api/entitlements' ||
        path === '/api/usage' ||
        path.startsWith('/api/subscriptions/') ||
        path === '/api/ai/consume'
      ) {
          return handleSubscriptions(request, env);
      } else if (path.startsWith('/api/orders')) {
          return handleOrders(request, env);
      } else if (path.startsWith('/api/certificates')) {
          return handleCertificates(request, env);
      } else if (path.startsWith('/api/payments')) {
          return handlePayments(request, env);
      }

      // Si ninguna API coincide, devolver 404
      return new Response(JSON.stringify({ error: 'API endpoint not found.' }), { status: 404, headers: apiHeaders });

    } catch (e) {
      console.error('Error handling API request:', e);
      return new Response(JSON.stringify({ error: 'Internal Server Error', details: e.message }), { status: 500, headers: apiHeaders });
    }
  }

  // Para todas las demás solicitudes (rutas de SPA, assets estáticos),
  // se asume que Cloudflare Pages o el servidor de desarrollo Vite las manejará.
  // En desarrollo local, `npm run dev` se encargará de esto.
  // En producción, Cloudflare Pages lo hará automáticamente según `_routes.json`.
  try {
    // Esto es para entornos donde `env.ASSETS` está disponible (Cloudflare Pages Functions)
    // En desarrollo local con `wrangler dev`, esto puede no ser necesario si Vite sirve todo.
    // Simplemente pasamos la solicitud para que el servidor de activos o Vite la maneje.
    return fetch(request); 
  } catch (e) {
    console.error('Error fetching assets or handling non-API requests:', e);
    return new Response('Error loading application or static asset.', { status: 500, headers: { 'Content-Type': 'text/plain', ...defaultHeaders } });
  }
}