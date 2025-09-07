// Para evitar múltiples instancias de GoTrueClient, reexportamos el cliente
// singleton provisto por services/supabaseService.
export { supabase } from '../services/supabaseService';
