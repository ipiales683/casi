import React, { useEffect, useMemo, useState } from 'react';
import api from '../../services/apiService';

// Dashboard con pestañas: Beneficios, Uso IA, Órdenes, Certificados
const DashboardPage = () => {
  const tabs = ['Mis Beneficios', 'Uso de IA', 'Mis Órdenes', 'Mis Certificados'];
  const [active, setActive] = useState(tabs[0]);
  const [entitlements, setEntitlements] = useState(null);
  const [usage, setUsage] = useState(null);
  const [orders, setOrders] = useState([]);
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [certForm, setCertForm] = useState({ name: '', subject: '', template: 'basic' });

  const refreshEntitlements = async () => {
    const { data } = await api.get('/entitlements');
    setEntitlements(data);
  };
  const refreshUsage = async () => {
    const { data } = await api.get('/usage');
    setUsage(data);
  };
  const refreshOrders = async () => {
    const { data } = await api.get('/orders');
    setOrders(data?.orders || []);
  };
  const refreshCerts = async () => {
    const { data } = await api.get('/certificates');
    setCerts(data?.certificates || []);
  };

  useEffect(() => {
    setLoading(true);
    Promise.all([refreshEntitlements(), refreshUsage(), refreshOrders(), refreshCerts()])
      .finally(() => setLoading(false));
  }, []);

  const premiumLabel = useMemo(() => {
    if (!entitlements) return 'Cargando...';
    const plan = entitlements.plan || 'free';
    return plan.charAt(0).toUpperCase() + plan.slice(1);
  }, [entitlements]);

  const createCertificate = async (e) => {
    e.preventDefault();
    if (!certForm.name || !certForm.subject) return;
    await api.post('/certificates', {
      name: certForm.name,
      subject: certForm.subject,
      template: certForm.template,
      details: { issuedBy: 'Estudio Jurídico Wilson Ipiales' }
    });
    setCertForm({ name: '', subject: '', template: 'basic' });
    await refreshCerts();
  };

  const downloadCertificate = (c) => {
    const html = `<!doctype html><html><head><meta charset="utf-8"><title>${c.subject}</title>
      <style>body{font-family:system-ui,Segoe UI,Roboto,Arial;padding:40px;background:#f8fafc;color:#111}
      .card{background:#fff;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 10px 25px rgba(0,0,0,.08);padding:32px}
      h1{font-size:24px;margin:0 0 8px} h2{font-size:18px;margin:0 0 16px;color:#334155}
      .meta{color:#64748b;font-size:12px;margin-top:12px}
      </style></head><body><div class="card">
      <h1>${c.subject}</h1>
      <h2>A nombre de: ${c.name}</h2>
      <p>Certificamos que ${c.name} ha solicitado la emisión de este documento a través del sistema del Estudio Jurídico Wilson Ipiales.</p>
      <div class="meta">ID: ${c.id} · Fecha: ${new Date(c.createdAt).toLocaleString()}</div>
      </div></body></html>`;
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `certificado-${c.id}.html`; a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold">Mi Panel</h1>
        <div className="text-sm rounded-full px-3 py-1 bg-blue-50 text-blue-700 border border-blue-200">Plan: {premiumLabel}</div>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        {tabs.map((t) => (
          <button key={t} onClick={() => setActive(t)}
            className={`px-3 py-2 text-sm font-medium rounded-t ${active===t?'bg-white border-x border-t border-gray-200':'text-gray-600 hover:text-blue-700'}`}>{t}</button>
        ))}
      </div>

      {loading && (<div className="text-gray-500">Cargando datos...</div>)}

      {/* Mis Beneficios */}
      {active === 'Mis Beneficios' && entitlements && (
        <div className="bg-white rounded-xl border border-gray-200 p-6 grid md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-500">Plan actual</div>
            <div className="text-xl font-semibold">{premiumLabel}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Consultas IA gratis por día</div>
            <div className="text-xl font-semibold">{entitlements?.benefits?.aiDailyFree ?? 1}</div>
          </div>
          <div>
            <div className="text-sm text-gray-500">Blog Premium</div>
            <div className="text-xl font-semibold">{entitlements?.benefits?.blogPremium ? 'Sí' : 'No'}</div>
          </div>
        </div>
      )}

      {/* Uso de IA */}
      {active === 'Uso de IA' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="text-sm text-gray-500 mb-2">Hoy</div>
          <div className="text-3xl font-extrabold text-blue-600">{usage?.aiUsedToday ?? 0}</div>
          <div className="text-xs text-gray-500 mt-2">Límite diario según plan: {entitlements?.benefits?.aiDailyFree ?? 1}</div>
        </div>
      )}

      {/* Mis Órdenes */}
      {active === 'Mis Órdenes' && (
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          {orders?.length === 0 ? (
            <div className="text-gray-500">Aún no tienes compras.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-500">
                    <th className="py-2 pr-4">Orden</th>
                    <th className="py-2 pr-4">Fecha</th>
                    <th className="py-2 pr-4">Items</th>
                    <th className="py-2 pr-4">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map(o => (
                    <tr key={o.id} className="border-t border-gray-100">
                      <td className="py-2 pr-4 font-medium">{o.id}</td>
                      <td className="py-2 pr-4">{new Date(o.createdAt).toLocaleString()}</td>
                      <td className="py-2 pr-4">{o.items?.map(i=>i.name).join(', ')}</td>
                      <td className="py-2 pr-4 font-semibold">${(o.total||0).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Mis Certificados */}
      {active === 'Mis Certificados' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Crear Certificado</h3>
            <form onSubmit={createCertificate} className="space-y-3">
              <div>
                <label className="block text-sm text-gray-600 mb-1">Nombre del Titular</label>
                <input value={certForm.name} onChange={e=>setCertForm({...certForm, name:e.target.value})}
                  className="w-full border rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Asunto</label>
                <input value={certForm.subject} onChange={e=>setCertForm({...certForm, subject:e.target.value})}
                  className="w-full border rounded-lg px-3 py-2" required />
              </div>
              <div>
                <label className="block text-sm text-gray-600 mb-1">Plantilla</label>
                <select value={certForm.template} onChange={e=>setCertForm({...certForm, template:e.target.value})}
                  className="w-full border rounded-lg px-3 py-2">
                  <option value="basic">Básica</option>
                  <option value="formal">Formal</option>
                </select>
              </div>
              <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-lg">Guardar</button>
            </form>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h3 className="text-lg font-semibold mb-4">Mis Certificados</h3>
            {certs?.length===0 ? (
              <div className="text-gray-500">Aún no has creado certificados.</div>
            ) : (
              <ul className="divide-y divide-gray-100">
                {certs.map(c => (
                  <li key={c.id} className="py-3 flex items-center justify-between">
                    <div>
                      <div className="font-medium">{c.subject}</div>
                      <div className="text-xs text-gray-500">{new Date(c.createdAt).toLocaleString()} · {c.id}</div>
                    </div>
                    <button onClick={()=>downloadCertificate(c)} className="px-3 py-1.5 bg-gray-100 rounded hover:bg-gray-200">Descargar</button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
