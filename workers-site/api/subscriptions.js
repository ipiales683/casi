// Suscripciones y beneficios - basado en KV
// Requiere binding KV: ABOGADO_WILSON_KV en wrangler.toml
// Identidad del cliente: encabezado X-Client-ID enviado por el frontend

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-ID'
};

function ok(body, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json', ...CORS } });
}
function bad(body, status = 400) { return ok(body, status); }

async function getEntitlements(kv, clientId) {
  const raw = await kv.get(`entitlements:${clientId}`, { type: 'json' });
  return raw || { plan: 'free', benefits: { aiDailyFree: 1, aiMonthlyQuota: 0 }, createdAt: new Date().toISOString() };
}

async function setEntitlements(kv, clientId, entitlements) {
  await kv.put(`entitlements:${clientId}`, JSON.stringify(entitlements), { expirationTtl: 60 * 60 * 24 * 365 });
}

async function getUsage(kv, clientId) {
  const todayKey = new Date().toISOString().slice(0, 10);
  const raw = await kv.get(`usage:${clientId}:${todayKey}`, { type: 'json' });
  return raw || { date: todayKey, aiUsedToday: 0 };
}

async function setUsage(kv, clientId, usage) {
  // Expira en 3 días
  await kv.put(`usage:${clientId}:${usage.date}`, JSON.stringify(usage), { expirationTtl: 60 * 60 * 24 * 3 });
}

export async function handleSubscriptions(request, env) {
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  const url = new URL(request.url);
  const path = url.pathname.replace('/api', '');
  const clientId = request.headers.get('X-Client-ID');
  if (!clientId) return bad({ error: 'Missing X-Client-ID' }, 400);

  // GET /api/entitlements -> devuelve plan y beneficios
  if (path === '/entitlements' && request.method === 'GET') {
    const ent = await getEntitlements(env.ABOGADO_WILSON_KV, clientId);
    return ok(ent);
  }

  // GET /api/usage -> devuelve uso de hoy
  if (path === '/usage' && request.method === 'GET') {
    const usage = await getUsage(env.ABOGADO_WILSON_KV, clientId);
    return ok(usage);
  }

  // POST /api/subscriptions/activate -> activa plan por id { planId }
  if (path === '/subscriptions/activate' && request.method === 'POST') {
    const { planId } = await request.json();
    if (!planId) return bad({ error: 'planId requerido' }, 400);

    let ent;
    if (planId === 'plan-normal') {
      ent = { plan: 'normal', benefits: { aiDailyFree: 3, aiMonthlyQuota: 20, certificates: true, blogPremium: false }, activatedAt: new Date().toISOString() };
    } else if (planId === 'plan-intermedio') {
      ent = { plan: 'intermedio', benefits: { aiDailyFree: 5, aiMonthlyQuota: 60, certificates: true, blogPremium: true }, activatedAt: new Date().toISOString() };
    } else if (planId === 'plan-premium') {
      ent = { plan: 'premium', benefits: { aiDailyFree: 10, aiMonthlyQuota: 200, certificates: true, blogPremium: true }, activatedAt: new Date().toISOString() };
    } else {
      return bad({ error: 'planId inválido' }, 400);
    }

    await setEntitlements(env.ABOGADO_WILSON_KV, clientId, ent);
    return ok({ success: true, entitlements: ent });
  }

  // POST /api/ai/consume -> intenta consumir 1 consulta IA
  if (path === '/ai/consume' && request.method === 'POST') {
    const ent = await getEntitlements(env.ABOGADO_WILSON_KV, clientId);
    const usage = await getUsage(env.ABOGADO_WILSON_KV, clientId);

    const freeLimit = ent.plan === 'free' ? 1 : ent.benefits.aiDailyFree || 1;
    if (usage.aiUsedToday >= freeLimit) {
      return ok({ allowed: false, reason: 'quota_exceeded', freeLimit }, 200);
    }

    usage.aiUsedToday += 1;
    await setUsage(env.ABOGADO_WILSON_KV, clientId, usage);
    return ok({ allowed: true, remainingToday: freeLimit - usage.aiUsedToday });
  }

  return bad({ error: 'Ruta no encontrada' }, 404);
}
