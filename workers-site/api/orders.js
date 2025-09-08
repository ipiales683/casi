// Orders API using KV storage per client (X-Client-ID)
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-ID'
};

const ok = (body, status = 200) => new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...CORS } });

export async function handleOrders(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  const url = new URL(request.url);
  const path = url.pathname.replace('/api', '');
  const clientId = request.headers.get('X-Client-ID');
  if (!clientId) return ok({ error: 'Missing X-Client-ID' }, 400);

  const key = `orders:${clientId}`;

  if (path === '/orders' && request.method === 'GET') {
    const raw = await env.ABOGADO_WILSON_KV.get(key, { type: 'json' });
    return ok({ orders: raw || [] });
  }

  if (path === '/orders' && request.method === 'POST') {
    const body = await request.json().catch(() => ({}));
    const now = new Date().toISOString();
    const order = {
      id: `ord_${Date.now().toString(36)}`,
      createdAt: now,
      ...body
    };
    const raw = await env.ABOGADO_WILSON_KV.get(key, { type: 'json' });
    const list = raw || [];
    list.push(order);
    await env.ABOGADO_WILSON_KV.put(key, JSON.stringify(list), { expirationTtl: 60 * 60 * 24 * 365 });
    return ok({ success: true, order });
  }

  return ok({ error: 'Not found' }, 404);
}
