'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useMemo, useState } from 'react';
import type { CurriculumWeek } from '../../../lib/curriculum';

type LoadResponse = {
  success: boolean;
  data?: {
    code?: string | null;
    reflection?: string | null;
    updated_at?: string | null;
  };
  error?: string;
};

const DEFAULT_TEMPLATE = `// p5.js starter\nfunction setup() {\n  createCanvas(600, 400);\n}\n\nfunction draw() {\n  background(240);\n  // TODO: 在這裡開始你的創作\n}`;

export default function WeekWorkspace({ week }: { week: CurriculumWeek }) {
  const [userId, setUserId] = useState<string>('');
  const [code, setCode] = useState<string>(DEFAULT_TEMPLATE);
  const [reflection, setReflection] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [runKey, setRunKey] = useState<number>(0);

  // Chat：把「本週」脈絡傳進 /api/chat
  const chat = useChat({
    api: '/api/chat',
    body: {
      weekId: week.week,
      weekContext: {
        programmingConcept: week.programmingConcept,
        p5Focus: week.p5Focus,
        culturalLiberalArtsPrompt: week.culturalLiberalArtsPrompt,
        miniTask: week.miniTask,
        reflectionPrompt: week.reflectionPrompt,
      },
    },
  });

  // userId：用 localStorage 記住（研究現場可用座號/代碼）
  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('ctsteam_userId') : null;
    if (stored) setUserId(stored);
  }, []);

  useEffect(() => {
    if (userId) localStorage.setItem('ctsteam_userId', userId);
  }, [userId]);

  // 讀取本週既有紀錄
  useEffect(() => {
    async function load() {
      if (!userId) return;
      setStatus('載入中…');
      try {
        const res = await fetch(`/api/progress?userId=${encodeURIComponent(userId)}&weekId=${week.week}`, {
          cache: 'no-store',
        });
        const json = (await res.json()) as LoadResponse;
        if (json.success && json.data) {
          if (json.data.code) setCode(json.data.code);
          if (json.data.reflection) setReflection(json.data.reflection);
          setStatus(json.data.updated_at ? `已載入（最後更新：${json.data.updated_at}）` : '已載入');
        } else {
          setStatus(json.error ? `載入失敗：${json.error}` : '尚無紀錄');
        }
      } catch (e: any) {
        setStatus(e?.message || '載入失敗');
      }
    }
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId, week.week]);

  const iframeSrcDoc = useMemo(() => {
    const safeCode = code.replace(/<\//g, '<\\/');
    return `<!doctype html><html><head><meta charset="utf-8" />
<script src="https://cdn.jsdelivr.net/npm/p5@1.9.0/lib/p5.min.js"></script>
<style>html,body{margin:0;padding:0;overflow:hidden;background:#fff}canvas{display:block}</style>
</head><body>
<script>${safeCode}</script>
</body></html>`;
  }, [code]);

  async function save(phase: string) {
    if (!userId.trim()) {
      setStatus('請先輸入學習者代碼（userId）。');
      return;
    }
    setStatus('儲存中…');
    try {
      const res = await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: userId.trim(),
          weekId: week.week,
          code,
          reflection,
          meta: { phase },
        }),
      });
      const json = await res.json();
      if (json?.success) {
        setStatus('已儲存 ✅');
      } else {
        setStatus(`儲存失敗：${json?.error || 'unknown'}`);
      }
    } catch (e: any) {
      setStatus(`儲存失敗：${e?.message || 'unknown'}`);
    }
  }

  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <section className="rounded-2xl border p-6">
        <h2 className="text-base font-semibold">文化／博雅引導</h2>
        <p className="mt-2 text-sm leading-relaxed">{week.culturalLiberalArtsPrompt}</p>
        <h3 className="mt-4 text-sm font-semibold">本週小任務</h3>
        <p className="mt-2 text-sm leading-relaxed">{week.miniTask}</p>
        <h3 className="mt-4 text-sm font-semibold">反思題（研究可用）</h3>
        <p className="mt-2 text-sm leading-relaxed">{week.reflectionPrompt}</p>

        <div className="mt-6 rounded-xl bg-gray-50 p-4">
          <label className="block text-xs font-semibold">學習者代碼（userId）</label>
          <input
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="mt-2 w-full rounded-lg border px-3 py-2 text-sm"
            placeholder="例如：701-05 或 A12"
          />
          <div className="mt-2 text-xs text-muted-foreground">這會保存在你的瀏覽器（localStorage）。</div>
        </div>

        <div className="mt-4 text-xs text-muted-foreground">{status}</div>
      </section>

      <section className="rounded-2xl border p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">程式編輯與預覽（p5.js）</h2>
          <div className="flex gap-2">
            <button
              className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
              onClick={() => setRunKey((k) => k + 1)}
              type="button"
            >
              執行 ▶
            </button>
            <button
              className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
              onClick={() => save('build')}
              type="button"
            >
              儲存進度 💾
            </button>
          </div>
        </div>

        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="mt-3 h-52 w-full rounded-xl border p-3 font-mono text-sm"
          spellCheck={false}
        />

        <div className="mt-4 rounded-xl border">
          <iframe
            key={runKey}
            title="p5 preview"
            className="h-64 w-full rounded-xl"
            sandbox="allow-scripts"
            srcDoc={iframeSrcDoc}
          />
        </div>

        <h3 className="mt-6 text-sm font-semibold">反思文字（會一起存進研究資料）</h3>
        <textarea
          value={reflection}
          onChange={(e) => setReflection(e.target.value)}
          className="mt-2 h-28 w-full rounded-xl border p-3 text-sm"
          placeholder="請用幾句話說明：你想表達什麼？你採用了 AI 哪些建議？你拒絕了哪些？為什麼？"
        />

        <div className="mt-3 flex justify-end">
          <button
            className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50"
            onClick={() => save('reflection')}
            type="button"
          >
            儲存反思 ✍️
          </button>
        </div>
      </section>

      <section className="rounded-2xl border p-6 lg:col-span-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-base font-semibold">AI 對話（本週導師模式）</h2>
          <div className="text-xs text-muted-foreground">提示：你可以把你的程式碼片段貼上來問「為什麼」或「如何改得更像某種意象」。</div>
        </div>

        <div className="mt-4 space-y-3">
          {chat.messages.map((m) => (
            <div key={m.id} className="rounded-xl border p-3 text-sm whitespace-pre-wrap">
              <div className="text-xs font-semibold">{m.role === 'user' ? '你' : 'AI'}</div>
              <div className="mt-1">{m.content}</div>
            </div>
          ))}
        </div>

        <form onSubmit={chat.handleSubmit} className="mt-4 flex gap-2">
          <input
            value={chat.input}
            onChange={chat.handleInputChange}
            className="flex-1 rounded-xl border px-3 py-2 text-sm"
            placeholder="例如：我想把稻浪做成更有節奏感的圖樣，要怎麼用 for loop 調參？"
          />
          <button className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50" type="submit">
            送出
          </button>
        </form>
      </section>
    </div>
  );
}
