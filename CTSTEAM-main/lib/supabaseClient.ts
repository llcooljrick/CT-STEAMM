import { createClient, SupabaseClient } from '@supabase/supabase-js';

/**
 * Public (browser-safe) Supabase client.
 * - Uses NEXT_PUBLIC_* vars (anon key)
 * - Safe to import in client components ONLY when you really need direct browser access.
 *
 * Note: For research logging / protected tables, prefer server routes using the service role key.
 */
export function getSupabaseBrowserClient(): SupabaseClient | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !anonKey) return null;
  return createClient(url, anonKey);
}
