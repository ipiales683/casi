import { createClient } from '@supabase/supabase-js';

// Este es un cliente supabase con credenciales de ejemplo
// En producción, se recomienda usar variables de entorno
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://xyzcompanyid.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.examplekey';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getSupabase = () => supabase;
