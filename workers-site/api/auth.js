// API endpoint para autenticación básica
import { corsHeaders } from '../cors-headers';

export async function handleAuthRequest(request) {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { ...corsHeaders, 'Access-Control-Allow-Methods': 'GET, POST, OPTIONS' } });
  }

  try {
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/auth', '');

    if (request.method === 'POST' && path === '/login') {
      const body = await request.json().catch(() => ({}));
      const { email, password } = body || {};

      // Validación mínima
      if (!email || !password) {
        return new Response(JSON.stringify({ success: false, message: 'Email y contraseña son requeridos' }), { status: 400, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
      }

      // Respuesta simulada de éxito (reemplazar con Supabase si deseas)
      const token = 'mock-' + Math.random().toString(36).slice(2);
      const user = { id: 'user_' + Math.random().toString(36).slice(2), email };

      return new Response(JSON.stringify({ success: true, data: { token, user } }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    if (request.method === 'GET' && path === '/check') {
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    return new Response(JSON.stringify({ success: false, message: 'Ruta de auth no encontrada' }), { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  } catch (error) {
    console.error('Error en auth:', error);
    return new Response(JSON.stringify({ success: false, message: 'Error del servidor' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
}
