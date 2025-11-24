-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Anyone can read videos" ON videos;
DROP POLICY IF EXISTS "Anyone can insert videos" ON videos;

-- Create new policies that explicitly allow anonymous access
CREATE POLICY "Allow public read access" ON videos
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Allow public insert access" ON videos
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Alternative: If you want to disable RLS completely for this table (less secure but simpler)
-- ALTER TABLE videos DISABLE ROW LEVEL SECURITY;

