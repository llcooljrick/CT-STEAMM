import { notFound } from 'next/navigation';
import { curriculum } from '../../../lib/curriculum';
import WeekWorkspace from './workspace';

export const metadata = {
  title: '每週工作站｜CT‑STEAM',
};

export default function WeekPage({ params }: { params: { weekId: string } }) {
  const weekId = Number(params.weekId);
  const week = curriculum.find((w) => w.week === weekId);
  if (!week) return notFound();

  return (
    <main className="mx-auto max-w-6xl px-6 py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">第 {week.week} 週工作站｜{week.programmingConcept}</h1>
          <p className="mt-2 text-sm text-muted-foreground">p5.js 重點：{week.p5Focus}</p>
        </div>

        <a className="rounded-xl border px-3 py-2 text-sm hover:bg-gray-50" href="/curriculum">
          ← 回課程地圖
        </a>
      </div>

      <WeekWorkspace week={week} />
    </main>
  );
}
