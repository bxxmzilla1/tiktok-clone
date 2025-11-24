# Deployment Guide

## Deploy to Vercel (Recommended - Easiest)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Push your code to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Configure the project:
     - **Root Directory:** `frontend`
     - **Framework Preset:** Vite
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - Add Environment Variables:
     - `VITE_SUPABASE_URL` = your Supabase URL
     - `VITE_SUPABASE_ANON_KEY` = your Supabase anon key
   - Click "Deploy"

3. **Your app will be live!** Vercel will give you a URL like `your-app.vercel.app`

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

3. **Deploy:**
   ```bash
   vercel
   ```
   - Follow the prompts
   - When asked for environment variables, add:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

4. **For production deployment:**
   ```bash
   vercel --prod
   ```

## Deploy to Netlify

1. **Push code to GitHub** (same as Vercel step 1)

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login with GitHub
   - Click "Add new site" → "Import an existing project"
   - Select your repository
   - Configure build settings:
     - **Base directory:** `frontend`
     - **Build command:** `npm run build`
     - **Publish directory:** `frontend/dist`
   - Add Environment Variables:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`
   - Click "Deploy site"

## Deploy to Render

1. **Push code to GitHub**

2. **Create a new Web Service on Render:**
   - Go to [render.com](https://render.com)
   - Sign up/login
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Configure:
     - **Name:** tiktok-clone
     - **Environment:** Node
     - **Build Command:** `cd frontend && npm install && npm run build`
     - **Start Command:** `cd frontend && npm run preview`
   - Add Environment Variables
   - Click "Create Web Service"

## Important Notes

- **Environment Variables:** Make sure to add your Supabase credentials as environment variables on your hosting platform
- **CORS:** Supabase should work out of the box, but if you have CORS issues, check your Supabase project settings
- **Backend:** Your Express backend (if you need it) can be deployed separately to Render, Railway, or Heroku

## Quick Deploy Commands (Vercel CLI)

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from frontend directory
cd frontend
vercel

# Deploy to production
vercel --prod
```

