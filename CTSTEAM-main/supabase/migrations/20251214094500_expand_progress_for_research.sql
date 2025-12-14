/*
  # Expand progress schema for research logging (2nd round)

  1) Add reflection field to `progress` snapshot table
  2) Add `progress_events` for versioned, phase-tagged learning traces

  Notes
  - If you deploy with service role key in API routes, RLS will be bypassed.
  - If you want to use authenticated users later, you can add RLS policies
    similar to the existing `progress` table.
*/

ALTER TABLE IF EXISTS progress
  ADD COLUMN IF NOT EXISTS reflection text;

CREATE TABLE IF NOT EXISTS progress_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  week_id int NOT NULL,
  phase text,
  code text,
  reflection text,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS progress_events_user_week_idx
  ON progress_events(user_id, week_id, created_at DESC);
