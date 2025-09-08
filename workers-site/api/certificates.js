// Certificates API using KV per client
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-ID'
};

const ok = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...CORS } });

export async function handleCertificates(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  const url = new URL(request.url);
  const path = url.pathname.replace('/api', '');
  const clientId = request.headers.get('X-Client-ID');
  if (!clientId) return ok({ error: 'Missing X-Client-ID' }, 400);

  const key = `certificates:${clientId}`;

  if (path === '/certificates' && request.method === 'GET') {
    const raw = await env.ABOGADO_WILSON_KV.get(key, { type: 'json' });
    return ok({ certificates: raw || [] });
  }

  if (path === '/certificates' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const now = new Date().toISOString();
    const cert = {
      id: `cert_${Date.now().toString(36)}`,
      createdAt: now,
      subject: body.subject || 'Certificado',
      name: body.name || 'Cliente',
      details: body.details || {},
      template: body.template || 'basic',
    };
    const raw = await env.ABOGADO_WILSON_KV.get(key, { type: 'json' });
    const list = raw || [];
    list.push(cert);
    await env.ABOGADO_WILSON_KV.put(key, JSON.stringify(list), { expirationTtl: 60 * 60 * 24 * 365 });
    return ok({ success: true, certificate: cert });
  }

  return ok({ error: 'Not found' }, 404);
}
