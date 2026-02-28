# REACH.MME Deployment Guide

## Production-Ready Setup Complete

Your app is now production-ready with the following improvements:

### Key Changes Made

1. **Vercel Configuration (`vercel.json`)**
   - All routes redirect to index.html for SPA routing
   - Security headers added
   - Asset caching optimized

2. **Loading State**
   - Added loading spinner in index.html
   - Loading state in Index component
   - Better error handling for Supabase queries

3. **404 Handling**
   - Auto-redirect to home page after 3 seconds
   - Improved UI with better styling
   - Manual "Go Home" button

4. **Build Optimizations**
   - Code splitting for vendor, supabase, and UI libraries
   - Minification with esbuild
   - No source maps in production

5. **Environment Variables**
   - Better error handling for missing variables
   - `.env.example` file created

## Deploy to Vercel

### Step 1: Prepare Your Repository

```bash
git add .
git commit -m "Production ready deployment"
git push origin main
```

### Step 2: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click "New Project"
3. Import your GitHub repository
4. Configure settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`

### Step 3: Add Environment Variables

In Vercel project settings, add these environment variables:

```
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

Get these values from your Supabase dashboard:
1. Go to your Supabase project
2. Click on Settings → API
3. Copy "Project URL" and "anon public" key

### Step 4: Deploy

Click "Deploy" - Vercel will build and deploy automatically.

## Troubleshooting

### Blank Page After Deployment

**Check:**
1. Environment variables are set in Vercel
2. Open browser console for errors
3. Verify Supabase URL and key are correct

**Solution:**
- The loading spinner shows while the app initializes
- Check that your Supabase database has the `toggle_settings` table
- Ensure RLS policies allow public read access

### 404 Errors on Routes

**Fix Applied:**
- `vercel.json` handles all route redirects
- All unknown routes now redirect to home page
- 404 page auto-redirects after 3 seconds

### Build Failures

**Common Issues:**
1. Missing environment variables during build
2. TypeScript errors

**Solution:**
```bash
npm run build
```
Run this locally to catch errors before deployment.

## Custom Domain (Optional)

1. Go to Vercel Project Settings → Domains
2. Add your domain
3. Follow DNS configuration
4. SSL certificate is automatic

## Database Setup Checklist

Make sure your Supabase setup includes:

- ✓ `toggle_settings` table exists
- ✓ Default row with id='default' exists
- ✓ RLS policies configured
- ✓ Realtime enabled for the table

To verify, run this SQL in Supabase SQL Editor:

```sql
SELECT * FROM toggle_settings WHERE id = 'default';
```

If no row exists, create it:

```sql
INSERT INTO toggle_settings (id, phone_visible, location_visible)
VALUES ('default', false, false);
```

## Post-Deployment

### Test Your Deployment

1. Visit your Vercel URL
2. Check that the page loads
3. Test the toggle switches (requires PIN: 26112002)
4. Verify phone/location visibility changes work

### Monitor

- Check Vercel deployment logs for errors
- Monitor Supabase dashboard for database activity
- Use browser console to debug any issues

## Performance

Your app now uses:
- Code splitting for faster initial load
- Optimized bundle sizes
- Efficient caching headers
- Minified production builds

Expected load times:
- Initial load: ~1-2 seconds
- Subsequent loads: <500ms (cached)

## Security

Security headers are configured:
- X-Content-Type-Options: nosniff
- X-Frame-Options: DENY
- X-XSS-Protection: enabled

## Support

If issues persist:
1. Check Vercel deployment logs
2. Check browser console
3. Verify Supabase connection
4. Test locally with `npm run build && npm run preview`

---

**Ready to deploy!** Follow the steps above to get your REACH.MME app live on Vercel.
