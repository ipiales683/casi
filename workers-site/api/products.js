// API endpoint para gestionar productos
import { corsHeaders } from '../cors-headers';

/**
 * Maneja solicitudes para productos
 */
export async function handleProductsRequest(request) {
  // Manejar preflight OPTIONS
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        ...corsHeaders,
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
      }
    });
  }

  try {
    const url = new URL(request.url);
    const path = url.pathname.replace('/api/products', '');

    // Datos simulados de productos (alineados con src/data/productsData.ts)
    const products = [
      {
        id: 'ebook-derecho-civil',
        name: 'Guía Completa de Derecho Civil',
        description: 'Manual completo sobre derecho civil ecuatoriano con casos prácticos.',
        price: 25,
        category: 'Ebooks',
        type: 'digital',
        downloadUrl: '/downloads/ebook-derecho-civil.pdf',
        imageUrl: '/images/products/ebook-civil.jpg',
        featured: true,
        tags: ['derecho civil', 'contratos', 'ecuador'],
        author: 'Dr. Wilson Ipiales'
      },
      {
        id: 'ebook-derecho-penal',
        name: 'Manual de Derecho Penal',
        description: 'Guía práctica sobre derecho penal y procedimientos judiciales.',
        price: 30,
        category: 'Ebooks',
        type: 'digital',
        downloadUrl: '/downloads/ebook-derecho-penal.pdf',
        imageUrl: '/images/products/ebook-penal.jpg',
        featured: true,
        tags: ['derecho penal', 'delitos', 'ecuador'],
        author: 'Dr. Wilson Ipiales'
      }
    ];

    if (path === '' || path === '/') {
      return new Response(JSON.stringify({ data: products, status: 'success' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    if (path.startsWith('/') && path.length > 1) {
      const id = path.substring(1); // remove leading '/'
      const product = products.find(p => p.id === id);

      if (!product) {
        return new Response(JSON.stringify({ message: 'Producto no encontrado', status: 'error' }), {
          status: 404,
          headers: { 'Content-Type': 'application/json', ...corsHeaders }
        });
      }

      return new Response(JSON.stringify({ data: product, status: 'success' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json', ...corsHeaders }
      });
    }

    return new Response(JSON.stringify({ message: 'Ruta de productos no válida', status: 'error' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  } catch (error) {
    console.error('Error al gestionar solicitud de productos:', error);
    return new Response(JSON.stringify({ message: 'Error al procesar la solicitud', status: 'error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', ...corsHeaders }
    });
  }
}
