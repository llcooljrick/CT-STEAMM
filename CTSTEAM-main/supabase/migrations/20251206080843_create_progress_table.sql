/*
  # Create progress table for student learning tracking

  1. New Tables
    - `progress`
      - `id` (uuid, primary key)
      - `user_id` (text, student identifier)
      - `week_id` (int, curriculum week)
      - `code` (text, saved p5.js code)
      - `updated_at` (timestamp, last updated time)

  2. Security
    - Enable RLS on `progress` table
    - Add policy allowing users to read/write their own progress
*/

CREATE TABLE IF NOT EXISTS progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id text NOT NULL,
  week_id int NOT NULL DEFAULT 1,
  code text DEFAULT '',
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, week_id)
);

ALTER TABLE progress ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own progress"
  ON progress FOR SELECT
  TO authenticated
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert own progress"
  ON progress FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update own progress"
  ON progress FOR UPDATE
  TO authenticated
  USING (auth.uid()::text = user_id)
  WITH CHECK (auth.uid()::text = user_id);
