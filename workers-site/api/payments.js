// Payments integration scaffolding for Stripe (and placeholders for PayPal/Binance)
// Uses KV to activate subscriptions on successful webhook events.
const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-ID'
};
const ok = (b, s=200)=> new Response(JSON.stringify(b), { status:s, headers:{'Content-Type':'application/json', ...CORS}});

async function activatePlanInKV(env, clientId, planId){
  if(!clientId || !planId) return;
  let ent;
  if (planId === 'plan-normal') {
    ent = { plan: 'normal', benefits: { aiDailyFree: 3, aiMonthlyQuota: 20, certificates: true, blogPremium: false }, activatedAt: new Date().toISOString() };
  } else if (planId === 'plan-intermedio') {
    ent = { plan: 'intermedio', benefits: { aiDailyFree: 5, aiMonthlyQuota: 60, certificates: true, blogPremium: true }, activatedAt: new Date().toISOString() };
  } else if (planId === 'plan-premium') {
    ent = { plan: 'premium', benefits: { aiDailyFree: 10, aiMonthlyQuota: 200, certificates: true, blogPremium: true }, activatedAt: new Date().toISOString() };
  }
  if (ent){
    await env.ABOGADO_WILSON_KV.put(`entitlements:${clientId}`, JSON.stringify(ent), { expirationTtl: 60*60*24*365 });
  }
}

export async function handlePayments(request, env){
  if (request.method==='OPTIONS') return new Response(null, { status:204, headers:CORS});
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/payments', '');

  // Create Stripe Checkout Session
  if (path === '/stripe/create-session' && request.method==='POST'){
    const body = await request.json().catch(()=>({}));
    const { planId, successUrl, cancelUrl } = body || {};
    const clientId = request.headers.get('X-Client-ID');
    if (!env.STRIPE_SECRET_KEY) return ok({ error: 'Stripe no configurado (STRIPE_SECRET_KEY faltante)' }, 400);
    if (!planId || !successUrl || !cancelUrl || !clientId) return ok({ error:'Datos incompletos' }, 400);

    // Price mapping (configure your Stripe Prices IDs in ENV if desired)
    const priceMap = {
      'plan-normal': env.STRIPE_PRICE_NORMAL || 'price_xxx_normal',
      'plan-intermedio': env.STRIPE_PRICE_INTER || 'price_xxx_intermedio',
      'plan-premium': env.STRIPE_PRICE_PREMIUM || 'price_xxx_premium'
    };
    const price = priceMap[planId];
    if (!price) return ok({ error: 'Plan inválido' }, 400);

    const payload = {
      mode: 'subscription',
      line_items: [{ price, quantity: 1 }],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { clientId, planId }
    };
    const resp = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`, 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(Object.entries(payload).flatMap(([k,v]) => {
        if (typeof v === 'object' && !Array.isArray(v)){
          return Object.entries(v).map(([sk,sv]) => [`${k}[${sk}]`, String(sv)]);
        }
        if (Array.isArray(v)){
          // Only handling single line_item for simplicity
          return [ ['line_items[0][price]', v[0].price], ['line_items[0][quantity]', String(v[0].quantity)] ];
        }
        return [[k, String(v)]];
      }))
    });
    const data = await resp.json();
    if (!resp.ok) return ok({ error: 'Error creando sesión Stripe', details: data }, 400);
    return ok({ id: data.id, url: data.url });
  }

  // Stripe Webhook
  if (path === '/stripe/webhook' && request.method==='POST'){
    // Read raw body for signature verification
    const raw = await request.text();
    let event = null;
    // Verify signature if secret provided
    const sig = request.headers.get('Stripe-Signature');
    if (env.STRIPE_WEBHOOK_SECRET && sig) {
      try {
        // Stripe signature scheme: t=timestamp, v1=signature
        const parts = Object.fromEntries(sig.split(',').map(p=>p.split('=')).map(([k,v])=>[k.trim(), v?.trim()]));
        const signedPayload = `${parts.t}.${raw}`;
        // Compute HMAC SHA256
        const enc = new TextEncoder();
        const key = await crypto.subtle.importKey('raw', enc.encode(env.STRIPE_WEBHOOK_SECRET), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
        const signatureBytes = await crypto.subtle.sign('HMAC', key, enc.encode(signedPayload));
        const signatureHex = Array.from(new Uint8Array(signatureBytes)).map(b=>b.toString(16).padStart(2,'0')).join('');
        // Compare against v1 signatures (can be multiple separated by ";")
        const v1s = (parts.v1 || '').split(' ');
        const match = v1s.some(v => v.trim().toLowerCase() === signatureHex);
        if (!match) {
          return ok({ error:'invalid_signature' }, 400);
        }
      } catch (e) {
        return ok({ error:'signature_verification_failed', details: e.message }, 400);
      }
    }
    // Parse JSON after verification
    try { event = JSON.parse(raw); } catch { event = null; }
    try{
      if (event && (event.type === 'checkout.session.completed' || event.type === 'invoice.paid')){
        const session = event.data?.object;
        const clientId = session?.metadata?.clientId;
        const planId = session?.metadata?.planId;
        await activatePlanInKV(env, clientId, planId);
        return ok({ received: true, activated: { clientId, planId } });
      }
      return ok({ received: true });
    }catch(e){
      return ok({ error:'processing_failed', details: e.message }, 500);
    }
  }

  // Placeholders for PayPal / Binance
  if (path.startsWith('/paypal')){
    return ok({ message: 'PayPal endpoint placeholder' });
  }
  if (path.startsWith('/binance')){
    return ok({ message: 'Binance Pay endpoint placeholder' });
  }

  return ok({ error: 'Not found' }, 404);
}
