import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vidbiyemknmkfswiucsr.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_Te9UBMPCAklAoErXTuGUNQ_DBGD4cKc';

export const isSupabaseConfigured = (): boolean => {
  return Boolean(supabaseUrl && supabaseAnonKey && !supabaseUrl.includes('placeholder'));
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    flowType: 'pkce',
  },
});

export interface SupabaseConnectionStatus {
  connected: boolean;
  projectUrl: string;
  error?: string;
}

export async function checkSupabaseConnection(): Promise<SupabaseConnectionStatus> {
  if (!isSupabaseConfigured()) {
    return {
      connected: false,
      projectUrl: supabaseUrl,
      error: 'Supabase credentials not configured',
    };
  }

  try {
    // Ping with a lightweight query to verify reachable connection
    const { error } = await supabase.from('study_kits').select('id').limit(1);
    if (error && error.code !== 'PGRST116') {
      // If table doesn't exist yet, the API connection itself is still working!
      if (error.message.includes('relation "study_kits" does not exist') || error.code === '42P01') {
        return {
          connected: true,
          projectUrl: supabaseUrl,
          error: 'Connected to Supabase. Table "study_kits" needs to be created.',
        };
      }
      return {
        connected: false,
        projectUrl: supabaseUrl,
        error: error.message,
      };
    }
    return {
      connected: true,
      projectUrl: supabaseUrl,
    };
  } catch (err) {
    return {
      connected: false,
      projectUrl: supabaseUrl,
      error: err instanceof Error ? err.message : 'Connection failed',
    };
  }
}

