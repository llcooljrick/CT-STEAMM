import { createClient, SupabaseClient } from '@supabase/supabase-js';

type ServerSupabase = SupabaseClient;

export function getSupabaseServerClient(): ServerSupabase {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url) throw new Error('Missing SUPABASE_URL (or NEXT_PUBLIC_SUPABASE_URL).');
  if (!serviceKey) throw new Error('Missing SUPABASE_SERVICE_ROLE_KEY.');

  // Service role key MUST be used only on the server (API routes / server actions).
  return createClient(url, serviceKey, {
    auth: { persistSession: false },
  });
}
