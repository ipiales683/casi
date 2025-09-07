import { corsHeaders } from '../cors-headers';

export async function handleEbooksRequest(request) {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { ...corsHeaders, 'Access-Control-Allow-Methods': 'GET, OPTIONS' } });
  }

  try {
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/ebooks', '');

    // Datos simulados
    const ebooks = [
      { id: 1, title: 'Guía Legal para Emprendedores', description: 'Todo lo que necesitas saber para iniciar tu negocio desde una perspectiva legal.', author: 'Wilson Alexander Ipiales Guerrón', price: 25, tokenPrice: 30, category: 'emprendimiento', coverImage: '/images/ebooks/ebook-emprendedores.jpg', pageCount: 120, releaseDate: '2025-01-15', isFree: false },
      { id: 2, title: 'Derechos Fundamentales: Lo que Debes Saber', description: 'Una guía completa sobre los derechos fundamentales y cómo protegerlos en el sistema legal ecuatoriano.', author: 'Wilson Alexander Ipiales Guerrón', price: 19.99, tokenPrice: 25, category: 'derechos', coverImage: '/images/ebooks/ebook-derechos.jpg', pageCount: 85, releaseDate: '2025-02-10', isFree: false },
      { id: 3, title: 'Derecho de Familia: Guía Práctica', description: 'Aprende todo sobre el derecho de familia, divorcios, custodia de hijos y pensiones alimenticias.', author: 'Wilson Alexander Ipiales Guerrón', price: 22.5, tokenPrice: 28, category: 'familia', coverImage: '/images/ebooks/ebook-familia.jpg', pageCount: 95, releaseDate: '2025-01-20', isFree: false },
      { id: 4, title: 'Contratos Civiles y Mercantiles', description: 'Todo sobre contratos, cláusulas, términos legales y su aplicación práctica en el mundo empresarial.', author: 'Wilson Alexander Ipiales Guerrón', price: 29.99, tokenPrice: 35, category: 'contratos', coverImage: '/images/ebooks/ebook-contratos.jpg', pageCount: 150, releaseDate: '2025-01-30', isFree: false },
      { id: 5, title: 'Introducción al Derecho Penal', description: 'Conceptos básicos del derecho penal para entender el sistema de justicia criminal.', author: 'Wilson Alexander Ipiales Guerrón', price: 0, tokenPrice: 0, category: 'penal', coverImage: '/images/ebooks/ebook-penal.jpg', pageCount: 50, releaseDate: '2024-12-20', isFree: true }
    ];

    const categories = [
      { id: 'all', name: 'Todas las categorías' },
      { id: 'emprendimiento', name: 'Emprendimiento' },
      { id: 'derechos', name: 'Derechos Fundamentales' },
      { id: 'familia', name: 'Derecho de Familia' },
      { id: 'contratos', name: 'Contratos' },
      { id: 'penal', name: 'Derecho Penal' },
      { id: 'laboral', name: 'Derecho Laboral' }
    ];

    if (path === '' || path === '/') {
      return new Response(JSON.stringify(ebooks), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    if (path === '/categories') {
      return new Response(JSON.stringify(categories), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    if (path === '/user') {
      // Simular ebooks del usuario autenticado
      const userEbooks = [
        { id: 2, title: 'Derechos Fundamentales: Lo que Debes Saber', coverImage: '/images/ebooks/ebook-derechos.jpg', progress: 30, downloadedAt: '2025-04-10T15:30:00' },
        { id: 5, title: 'Introducción al Derecho Penal', coverImage: '/images/ebooks/ebook-penal.jpg', progress: 75, downloadedAt: '2025-04-05T09:45:00' }
      ];
      return new Response(JSON.stringify(userEbooks), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    return new Response(JSON.stringify({ error: 'Ruta de ebooks no encontrada' }), { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  } catch (error) {
    console.error('Error en ebooks:', error);
    return new Response(JSON.stringify({ error: 'Error del servidor' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
}

export async function handleTokensRequest(request) {
  // CORS preflight
  if (request.method === 'OPTIONS') {
    return new Response(null, { status: 204, headers: { ...corsHeaders, 'Access-Control-Allow-Methods': 'GET, OPTIONS' } });
  }

  try {
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/tokens', '');

    if (path === '/balance') {
      return new Response(JSON.stringify({ balance: 50 }), { status: 200, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
    }

    return new Response(JSON.stringify({ error: 'Ruta de tokens no encontrada' }), { status: 404, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  } catch (error) {
    console.error('Error en tokens:', error);
    return new Response(JSON.stringify({ error: 'Error del servidor' }), { status: 500, headers: { 'Content-Type': 'application/json', ...corsHeaders } });
  }
}
