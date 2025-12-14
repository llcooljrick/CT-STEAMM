import Link from 'next/link';
import { curriculum } from '../../lib/curriculum';

export const metadata = {
  title: 'CT-STEAM 課程地圖',
};

export default function CurriculumPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <h1 className="text-2xl font-semibold">CT‑STEAM 課程地圖（國中｜每週一概念｜文化×博雅）</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        這裡呈現每週「程式設計基礎概念」如何連結在地文化與博雅提問，並對應 STEAM 五向度。
      </p>

      <div className="mt-8 space-y-6">
        {curriculum.map((w) => (
          <section key={w.week} className="rounded-2xl border p-6 shadow-sm">
            <div className="flex flex-wrap items-baseline justify-between gap-3">
              <h2 className="text-xl font-medium">第 {w.week} 週｜{w.programmingConcept}</h2>
              <div className="flex items-center gap-3">
                <div className="text-xs text-muted-foreground">p5.js：{w.p5Focus}</div>
                <Link
                  className="rounded-xl border px-3 py-1 text-xs hover:bg-gray-50"
                  href={`/week/${w.week}`}
                >
                  進入本週工作站 →
                </Link>
              </div>
            </div>

            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="text-sm font-semibold">文化／博雅引導</h3>
                <p className="mt-2 text-sm leading-relaxed">{w.culturalLiberalArtsPrompt}</p>

                <h3 className="mt-4 text-sm font-semibold">小任務</h3>
                <p className="mt-2 text-sm leading-relaxed">{w.miniTask}</p>

                <h3 className="mt-4 text-sm font-semibold">反思題（研究可用）</h3>
                <p className="mt-2 text-sm leading-relaxed">{w.reflectionPrompt}</p>
              </div>

              <div>
                <h3 className="text-sm font-semibold">STEAM 對應</h3>
                <div className="mt-2 space-y-2 text-sm">
                  <div><span className="font-semibold">S</span>：{w.steamMapping.S}</div>
                  <div><span className="font-semibold">T</span>：{w.steamMapping.T}</div>
                  <div><span className="font-semibold">E</span>：{w.steamMapping.E}</div>
                  <div><span className="font-semibold">A</span>：{w.steamMapping.A}</div>
                  <div><span className="font-semibold">M</span>：{w.steamMapping.M}</div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
