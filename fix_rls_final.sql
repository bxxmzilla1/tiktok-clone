-- Final RLS fix for videos table
-- Run this in Supabase SQL Editor

-- 1) Ensure table exists
CREATE TABLE IF NOT EXISTS public.videos (
  id BIGSERIAL PRIMARY KEY,
  video_url TEXT NOT NULL,
  author_name TEXT NOT NULL,
  description TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- 2) Enable RLS
ALTER TABLE public.videos ENABLE ROW LEVEL SECURITY;

-- 3) Drop ALL existing policies to start fresh
DROP POLICY IF EXISTS "Anyone can read videos" ON public.videos;
DROP POLICY IF EXISTS "Anyone can insert videos" ON public.videos;
DROP POLICY IF EXISTS "Allow public read access" ON public.videos;
DROP POLICY IF EXISTS "Allow public insert access" ON public.videos;
DROP POLICY IF EXISTS "Allow authenticated insert access" ON public.videos;

-- 4) Create policies that work for both anon and authenticated
-- Read policy: Anyone can read
CREATE POLICY "videos_select_policy" ON public.videos
  FOR SELECT
  USING (true);

-- Insert policy: Anyone can insert (both anon and authenticated)
CREATE POLICY "videos_insert_policy" ON public.videos
  FOR INSERT
  WITH CHECK (true);

-- Optional: Update policy if you want users to update their own videos later
-- CREATE POLICY "videos_update_policy" ON public.videos
--   FOR UPDATE
--   USING (true)
--   WITH CHECK (true);

