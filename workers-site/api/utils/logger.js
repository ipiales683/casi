import { handleSupabaseProxy } from '../supabase-proxy';

/**
 * Envía un log al backend para ser guardado en la tabla 'system_logs'.
 * @param {string} level - Nivel del log (e.g., 'INFO', 'WARN', 'ERROR').
 * @param {string} message - Mensaje del log.
 * @param {object} [context={}] - Objeto de contexto adicional para el log.
 */
export async function logEvent(level, message, context = {}) {
  try {
    const logData = {
      nivel: level,
      mensaje: message,
      contexto: JSON.stringify(context),
      created_at: new Date().toISOString(),
    };

    const request = new Request('https://placeholder.com/log', { // Placeholder URL, actual URL handled by proxy
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(logData),
    });

    // Usar el proxy para enviar el log a la tabla 'system_logs' de Supabase
    // La ruta real de Supabase será /rest/v1/system_logs
    const response = await handleSupabaseProxy(request, '/rest/v1/system_logs');

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Failed to log event to Supabase: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error('Error en el sistema de logging:', error);
  }
}

export const Logger = {
  info: (message, context) => logEvent('INFO', message, context),
  warn: (message, context) => logEvent('WARN', message, context),
  error: (message, context) => logEvent('ERROR', message, context),
};