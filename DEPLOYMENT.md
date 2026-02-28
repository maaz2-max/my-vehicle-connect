# Deployment Guide for REACH.MME

## Vercel Deployment

### Prerequisites
1. A Vercel account
2. Supabase project with environment variables

### Steps

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Production ready"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Environment Variables**
   In Vercel dashboard, add these environment variables:
   - `VITE_SUPABASE_URL`: Your Supabase project URL
   - `VITE_SUPABASE_PUBLISHABLE_KEY`: Your Supabase anon/public key

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy your app

### Automatic Configuration
The `vercel.json` file handles:
- SPA routing (all routes redirect to index.html)
- Security headers
- Asset caching

### Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Follow DNS configuration instructions

## Supabase Setup

Make sure your Supabase database has:
1. The `toggle_settings` table created (via migrations)
2. Row Level Security (RLS) policies configured
3. A default row with id='default'

## Troubleshooting

### Blank Page Issue
- Ensure environment variables are set in Vercel
- Check browser console for errors
- Verify Supabase connection

### 404 Errors
- The `vercel.json` rewrites handle SPA routing
- All unknown routes redirect to home page after 3 seconds

### Build Failures
- Run `npm run build` locally to check for errors
- Ensure all dependencies are in `package.json`
