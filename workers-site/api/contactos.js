// API para manejar operaciones CRUD en la tabla 'contactos'
import { handleSupabaseProxy } from './supabase-proxy';

/**
 * Maneja las solicitudes API para la tabla 'contactos'.
 * @param {Request} request - La solicitud original.
 * @returns {Promise<Response>} - La respuesta HTTP.
 */
export async function handleContactosRequest(request) {
  const url = new URL(request.url);
  const pathSegments = url.pathname.split('/').filter(segment => segment !== '');
  const id = pathSegments[pathSegments.length - 1]; // Assuming ID is the last segment if present

  switch (request.method) {
    case 'POST':
      return createContacto(request);
    case 'GET':
      if (id && id !== 'contactos') { // Check if 'contactos' itself is not mistaken for an ID
        return getContactoById(request, id);
      }
      return getAllContactos(request);
    case 'PUT':
      if (id && id !== 'contactos') {
        return updateContacto(request, id);
      }
      return new Response(JSON.stringify({ error: 'ID de contacto no proporcionado para actualizar.' }), { status: 400 });
    case 'DELETE':
      if (id && id !== 'contactos') {
        return deleteContacto(request, id);
      }
      return new Response(JSON.stringify({ error: 'ID de contacto no proporcionado para eliminar.' }), { status: 400 });
    case 'OPTIONS':
      return handleOptions(request);
    default:
      return new Response(JSON.stringify({ error: 'Método no permitido.' }), { status: 405 });
  }
}

/**
 * Crea un nuevo registro en la tabla 'contactos'.
 * @param {Request} request - La solicitud HTTP.
 * @returns {Promise<Response>}
 */
async function createContacto(request) {
  try {
    const newContacto = await request.json();
    if (!newContacto.nombre || !newContacto.email || !newContacto.telefono) {
      return new Response(JSON.stringify({ error: \'Faltan campos obligatorios: nombre, email, telefono.\' }), { status: 400 });
    }

    if (typeof newContacto.nombre !== \'string\' || newContacto.nombre.trim().length < 2) {
        return new Response(JSON.stringify({ error: \'El nombre debe ser una cadena de texto y tener al menos 2 caracteres.\' }), { status: 400 });
    }
    if (typeof newContacto.email !== \'string\' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newContacto.email)) {
        return new Response(JSON.stringify({ error: \'El formato del email no es válido.\' }), { status: 400 });
    }
    if (typeof newContacto.telefono !== \'string\' || newContacto.telefono.trim().length < 7) {
        return new Response(JSON.stringify({ error: \'El teléfono debe ser una cadena de texto y tener al menos 7 dígitos.\' }), { status: 400 });
    }

    // Optional: Validate asunto and mensaje if they are provided
    if (newContacto.asunto && typeof newContacto.asunto !== \'string\') {
        return new Response(JSON.stringify({ error: \'El asunto debe ser una cadena de texto.\' }), { status: 400 });
    }
    if (newContacto.mensaje && typeof newContacto.mensaje !== \'string\') {
        return new Response(JSON.stringify({ error: \'El mensaje debe ser una cadena de texto.\' }), { status: 400 });
    }
    const proxyResponse = await handleSupabaseProxy(request, '/rest/v1/contactos');
    if (proxyResponse.ok) {
        Logger.info('Contacto creado exitosamente', newContacto);
    } else {
        const errorDetails = await proxyResponse.text();
        Logger.error('Fallo al crear contacto a través de Supabase proxy', { newContacto, status: proxyResponse.status, details: errorDetails });
    }
    return proxyResponse;
  } catch (error) {
    Logger.error('Error al crear contacto', { error: error.message, stack: error.stack });
    return new Response(JSON.stringify({ error: 'Error al procesar la solicitud para crear contacto.', details: error.message }), { status: 500 });
  }
}

/**
 * Obtiene todos los registros de la tabla 'contactos'.
 * @param {Request} request - La solicitud HTTP.
 * @returns {Promise<Response>}
 */
async function getAllContactos(request) {
  // Supabase expects a GET to the table name
  const proxyResponse = await handleSupabaseProxy(request, '/rest/v1/contactos');
  if (proxyResponse.ok) {
    Logger.info('Contactos obtenidos exitosamente');
  } else {
    const errorDetails = await proxyResponse.text();
    Logger.error('Fallo al obtener contactos a través de Supabase proxy', { status: proxyResponse.status, details: errorDetails });
  }
  return proxyResponse;
}

/**
 * Obtiene un registro específico de la tabla 'contactos' por ID.
 * @param {Request} request - La solicitud HTTP.
 * @param {string} id - El ID del contacto.
 * @returns {Promise<Response>}
 */
async function getContactoById(request, id) {
  // Supabase expects a GET to the table name with a filter
  const proxyResponse = await handleSupabaseProxy(request, `/rest/v1/contactos?id=eq.${id}`);
  if (proxyResponse.ok) {
    Logger.info(`Contacto ${id} obtenido exitosamente`);
  } else {
    const errorDetails = await proxyResponse.text();
    Logger.error(`Fallo al obtener contacto ${id} a través de Supabase proxy`, { id, status: proxyResponse.status, details: errorDetails });
  }
  return proxyResponse;
}

/**
 * Actualiza un registro en la tabla 'contactos' por ID.
 * @param {Request} request - La solicitud HTTP.
 * @param {string} id - El ID del contacto a actualizar.
 * @returns {Promise<Response>}
 */
async function updateContacto(request, id) {
  try {
    const updatedFields = await request.json();
    // Add validation for updated fields here as well, similar to createContacto
    // For brevity, re-using a simplified check, but in a real app, validate each field type/format.
    if (Object.keys(updatedFields).length === 0) {
        Logger.warn('Empty update payload for contact', { id, updatedFields });
        return new Response(JSON.stringify({ error: 'No se proporcionaron campos para actualizar.' }), { status: 400 });
    }

    const modifiedRequest = new Request(request.url, {
      method: 'PATCH', // Change method to PATCH for update
      headers: request.headers,
      body: JSON.stringify(updatedFields)
    });
    const proxyResponse = await handleSupabaseProxy(modifiedRequest, `/rest/v1/contactos?id=eq.${id}`);
    if (proxyResponse.ok) {
        Logger.info(`Contacto ${id} actualizado exitosamente`, updatedFields);
    } else {
        const errorDetails = await proxyResponse.text();
        Logger.error(`Fallo al actualizar contacto ${id} a través de Supabase proxy`, { id, updatedFields, status: proxyResponse.status, details: errorDetails });
    }
    return proxyResponse;
  } catch (error) {
    Logger.error(`Error al actualizar contacto ${id}`, { error: error.message, stack: error.stack });
    return new Response(JSON.stringify({ error: 'Error al procesar la solicitud para actualizar contacto.', details: error.message }), { status: 500 });
  }
}

/**
 * Elimina un registro de la tabla 'contactos' por ID.
 * @param {Request} request - La solicitud HTTP.
 * @param {string} id - El ID del contacto a eliminar.
 * @returns {Promise<Response>}
 */
async function deleteContacto(request, id) {
  // Supabase expects a DELETE to the table name with a filter
  const proxyResponse = await handleSupabaseProxy(request, `/rest/v1/contactos?id=eq.${id}`);
  if (proxyResponse.ok) {
    Logger.info(`Contacto ${id} eliminado exitosamente`);
  } else {
    const errorDetails = await proxyResponse.text();
    Logger.error(`Fallo al eliminar contacto ${id} a través de Supabase proxy`, { id, status: proxyResponse.status, details: errorDetails });
  }
  return proxyResponse;
}

/**
 * Maneja las solicitudes OPTIONS para CORS.
 * @param {Request} request - La solicitud HTTP.
 * @returns {Response}
 */
function handleOptions(request) {
  const headers = new Headers();
  headers.set('Access-Control-Allow-Origin', '*');
  headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  headers.set('Access-Control-Allow-Headers', request.headers.get('Access-Control-Request-Headers') || '*');
  headers.set('Access-Control-Max-Age', '86400'); // Cache preflight for 24 hours
  return new Response(null, { status: 204, headers });
}