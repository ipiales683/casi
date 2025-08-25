export const globalConfig = {
  supabaseUrl: import.meta.env.VITE_SUPABASE_URL || 'https://phzldiaohelbyobhjrnc.supabase.co',
  supabaseKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'sbp_db5898ecc094d37ec87562399efe3833e63ab20f',
  apiUrl: import.meta.env.VITE_API_URL || 'http://localhost:8787',
  isDevelopment: import.meta.env.DEV || false,
  isProduction: import.meta.env.PROD || false,
  VITE_SUPABASE_CLIENT_INSTANCE_ID: 'default-instance'
};

export default globalConfig;
