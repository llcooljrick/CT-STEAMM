export async function GET() {
  const required = {
    OPENAI_API_KEY: Boolean(process.env.OPENAI_API_KEY),
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
  };

  const ok = Object.values(required).every(Boolean);

  return Response.json({
    ok,
    required,
    runtime: process.env.VERCEL ? 'vercel' : 'local',
  });
}
