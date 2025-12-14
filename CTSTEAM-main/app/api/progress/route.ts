import { getSupabaseServerClient } from '../../../lib/supabaseServer';
import { z } from 'zod';

const BodySchema = z.object({
  userId: z.string().min(1),
  weekId: z.number().int().min(1),
  code: z.string().min(1),
  reflection: z.string().optional(),
  meta: z
    .object({
      phase: z.string().optional(), // inspiration | build | judgment | reflection | final
      note: z.string().optional(),
    })
    .optional(),
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get('userId') || '';
    const weekId = Number(searchParams.get('weekId'));

    if (!userId || !Number.isFinite(weekId) || weekId < 1) {
      return Response.json({ success: false, error: 'Missing userId/weekId' }, { status: 400 });
    }

    const supabase = getSupabaseServerClient();

    // 讀最新快照
    const { data, error } = await supabase
      .from('progress')
      .select('code, reflection, updated_at')
      .eq('user_id', userId)
      .eq('week_id', weekId)
      .maybeSingle();

    if (error) {
      return Response.json({ success: false, error: error.message }, { status: 400 });
    }

    return Response.json({ success: true, data: data || null });
  } catch (err: any) {
    return Response.json({ success: false, error: err?.message || 'Internal server error' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const raw = await req.json();
    const parsed = BodySchema.safeParse(raw);
    if (!parsed.success) {
      return Response.json({ error: 'Invalid payload', details: parsed.error.flatten() }, { status: 400 });
    }

    const { userId, weekId, code, reflection, meta } = parsed.data;

    const supabase = getSupabaseServerClient();

    // 1) 更新快照（方便快速載入）
    const { data, error } = await supabase
      .from('progress')
      .upsert({
        user_id: userId,
        week_id: weekId,
        code,
        reflection: reflection ?? null,
        updated_at: new Date().toISOString(),
      })
      .select()
      .maybeSingle();

    if (error) {
      return Response.json({ error: error.message }, { status: 400 });
    }

    // 2) 寫入事件紀錄（研究用：可追版本、phase、時間序列）
    await supabase.from('progress_events').insert({
      user_id: userId,
      week_id: weekId,
      phase: meta?.phase ?? null,
      code,
      reflection: reflection ?? null,
      created_at: new Date().toISOString(),
    });

    return Response.json({ success: true, data });
  } catch (err: any) {
    return Response.json({ error: err?.message || 'Internal server error' }, { status: 500 });
  }
}
