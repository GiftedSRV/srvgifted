import { createClient } from '@supabase/supabase-js';

// Retrieve credentials from environment variables or custom runtime configuration
const envUrl = import.meta.env.VITE_SUPABASE_URL || '';
const envAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Allow runtime override for testing and Lovable / self-hosted setup
const runtimeUrl = typeof window !== 'undefined' ? localStorage.getItem('gifted_supabase_url') || '' : '';
const runtimeAnonKey = typeof window !== 'undefined' ? localStorage.getItem('gifted_supabase_anon_key') || '' : '';

export const SUPABASE_URL = runtimeUrl || envUrl;
export const SUPABASE_ANON_KEY = runtimeAnonKey || envAnonKey;

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    SUPABASE_URL && 
    SUPABASE_ANON_KEY && 
    SUPABASE_URL.startsWith('http') &&
    SUPABASE_URL !== 'https://your-project.supabase.co'
  );
};

// Fallback dummy client if credentials aren't set yet, so app never crashes
export const supabase = createClient(
  SUPABASE_URL || 'https://placeholder.supabase.co',
  SUPABASE_ANON_KEY || 'placeholder-key',
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: true,
    },
  }
);
