CTSTEAM


---

## Vercel 部署（保留 OpenAI + Supabase）

### 1) 建議環境變數（Vercel Project → Settings → Environment Variables）

**OpenAI**
- `OPENAI_API_KEY`

**Supabase（Server）**
- `SUPABASE_URL`（可用你的 Supabase project URL）
- `SUPABASE_SERVICE_ROLE_KEY`（⚠️僅限伺服器端，請勿放 NEXT_PUBLIC）

**Supabase（Browser / 可選）**
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

> 目前 `/api/progress` 已改用 `SUPABASE_SERVICE_ROLE_KEY` 於伺服器端寫入，避免 RLS 或未登入造成記錄失敗。

### 2) Supabase 資料表
本 repo 已提供 migrations：
- `supabase/migrations/*_create_progress_table.sql`
- `supabase/migrations/20251214094500_expand_progress_for_research.sql`（第二輪：reflection + progress_events）

### 3) 課程地圖（每週一概念 × 文化博雅 × STEAM）
部署後可開啟：`/curriculum`

### 4) 每週工作站（第二輪）
部署後可開啟：`/week/1` ～ `/week/10`

- 內含：程式編輯/預覽（p5.js）、AI 對話（本週脈絡）、反思文字
- 儲存：`/api/progress` 會寫入
  - `progress`（最新快照：code + reflection）
  - `progress_events`（研究用時間序列：phase + code + reflection）

---

## Next.js 設定檔
此專案使用 ESM 版 Next.js 設定：`next.config.mjs`
