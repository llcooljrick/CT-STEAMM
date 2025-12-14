'use client';

import { useChat } from '@ai-sdk/react';
import { useEffect, useState } from 'react';

type Health = {
  ok: boolean;
  required: Record<string, boolean>;
  runtime: string;
};

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const [health, setHealth] = useState<Health | null>(null);
  const [healthError, setHealthError] = useState<string | null>(null);

  useEffect(() => {
    async function run() {
      try {
        const res = await fetch('/api/health', { cache: 'no-store' });
        const json = (await res.json()) as Health;
        setHealth(json);
      } catch (e: any) {
        setHealthError(e?.message || 'health check failed');
      }
    }
    run();
  }, []);

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="mb-6 rounded-2xl border p-4 text-sm">
        <div className="font-semibold">系統狀態</div>
        {healthError ? (
          <div className="mt-2 text-red-600">Health check 失敗：{healthError}</div>
        ) : !health ? (
          <div className="mt-2 text-muted-foreground">檢查中…</div>
        ) : (
          <div className="mt-2 space-y-1">
            <div>
              伺服器設定：{health.ok ? <span className="text-green-700">OK</span> : <span className="text-red-700">缺少環境變數</span>}
              <span className="ml-2 text-xs text-muted-foreground">({health.runtime})</span>
            </div>
            <div className="text-xs text-muted-foreground">
              你也可以開啟 <a className="underline" href="/curriculum">/curriculum</a> 檢視課程地圖。
            </div>
          </div>
        )}
      </div>

      {messages.map((m) => (
        <div key={m.id} className="whitespace-pre-wrap mb-4">
          <strong>{m.role === 'user' ? '你：' : 'AI：'}</strong>
          {m.content}
        </div>
      ))}

      <form onSubmit={handleSubmit} className="fixed bottom-0 w-full max-w-md mb-8 bg-white p-2 border-t">
        <input
          className="w-full max-w-md p-2 border border-gray-300 rounded shadow-xl text-black"
          value={input}
          placeholder="說點什麼..."
          onChange={handleInputChange}
        />
      </form>
    </div>
  );
}
