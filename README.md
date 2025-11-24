# TikTok Clone

A TikTok-like video feed application built with React, Node.js, and Supabase.

## Features

- 🎥 Full-screen vertical video feed (TikTok-style)
- 📤 Admin page for uploading videos
- 🎨 Modern, dark-themed UI matching TikTok's design
- ⚡ Smooth scrolling with snap-to-video behavior
- 🔄 Auto-play videos when in view

## Setup Instructions

### 1. Install Dependencies

```bash
npm run install:all
```

### 2. Set up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Storage and create a bucket named `videos` (make it public)
3. Go to SQL Editor and run the following to create the videos table:

```sql
CREATE TABLE videos (
  id BIGSERIAL PRIMARY KEY,
  video_url TEXT NOT NULL,
  author_name TEXT NOT NULL,
  description TEXT,
  likes INTEGER DEFAULT 0,
  comments INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security (optional, for public access)
ALTER TABLE videos ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read videos
CREATE POLICY "Anyone can read videos" ON videos
  FOR SELECT USING (true);

-- Create a policy that allows anyone to insert videos (for admin uploads)
CREATE POLICY "Anyone can insert videos" ON videos
  FOR INSERT WITH CHECK (true);
```

4. Get your Supabase URL and anon key from Settings > API

### 3. Configure Environment Variables

Create a `.env` file in the `frontend` directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 4. Run the Application

```bash
npm run dev
```

This will start both the frontend (port 3000) and backend (port 5000).

- Frontend: http://localhost:3000
- Admin Page: http://localhost:3000/admin

## Project Structure

```
.
├── frontend/          # React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── lib/           # Supabase client
│   │   └── App.jsx        # Main app component
│   └── package.json
├── backend/          # Express server
│   └── server.js
└── package.json      # Root package.json
```

## Usage

1. **View Videos**: Navigate to the home page to see the video feed
2. **Upload Videos**: Go to `/admin` to upload new videos
   - Select a video file
   - Enter author name (required)
   - Add description (optional)
   - Click "Upload Video"

## Technologies Used

- React 18
- Vite
- React Router
- Supabase (Storage & Database)
- Express.js
- CSS3

