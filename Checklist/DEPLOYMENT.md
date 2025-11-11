# Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Supabase project already configured

## Step 1: Prepare Repository

1. Make sure all changes are committed:
```bash
git add .
git commit -m "Ready for production deployment"
git push
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Configure project:
   - **Framework Preset:** Next.js
   - **Root Directory:** ./
   - **Build Command:** `npm run build`
   - **Output Directory:** .next
4. Add environment variables (see below)
5. Click "Deploy"

### Option B: Deploy via Vercel CLI

1. Install Vercel CLI:
```bash
npm i -g vercel
```

2. Login to Vercel:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

4. For production:
```bash
vercel --prod
```

## Step 3: Configure Environment Variables in Vercel

Go to your Vercel project dashboard → Settings → Environment Variables

Add these variables:

### Database Variables
- `DATABASE_URL`: `postgresql://postgres.hzavtdbiqwtapdcvfftq:pakfof-xamZiw-8wabvi@aws-1-eu-north-1.pooler.supabase.com:5432/postgres`
- `DIRECT_URL`: `postgresql://postgres:pakfof-xamZiw-8wabvi@db.hzavtdbiqwtapdcvfftq.supabase.co:5432/postgres`

### Supabase Storage Variables
- `NEXT_PUBLIC_SUPABASE_URL`: `https://hzavtdbiqwtapdcvfftq.supabase.co`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh6YXZ0ZGJpcXd0YXBkY3ZmZnRxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI4MTcyNzMsImV4cCI6MjA3ODM5MzI3M30.REdlYPrM6BYkk6M_Kw_AoPQfRXEpiCpsrdVGML_r8e4`

**Important:** Make sure to add these to **all environments** (Production, Preview, Development)

## Step 4: Verify Deployment

1. Wait for the build to complete
2. Visit your Vercel URL (e.g., https://your-app.vercel.app)
3. Test the following:
   - ✅ Homepage loads with templates
   - ✅ Can create a new submission
   - ✅ Can upload photos
   - ✅ Can view submissions
   - ✅ Can edit submissions
   - ✅ Can delete submissions
   - ✅ Can download PDFs
   - ✅ Search and filters work

## Troubleshooting

### Build Fails
- Check the build logs in Vercel dashboard
- Verify all environment variables are set correctly
- Make sure `prisma generate` runs during build

### Database Connection Issues
- Verify DATABASE_URL is correct
- Make sure Supabase allows connections from Vercel IPs
- Check Supabase connection pooler is enabled

### Photo Upload Fails
- Verify Supabase Storage bucket exists
- Check bucket is set to "Public"
- Verify storage policies allow INSERT and SELECT
- Confirm NEXT_PUBLIC_SUPABASE_ANON_KEY is correct

### "Internal Server Error" on API Routes
- Check Vercel function logs
- Verify environment variables are set for production
- Ensure Prisma client is generated during build

## Post-Deployment

### Custom Domain (Optional)
1. Go to Vercel project → Settings → Domains
2. Add your custom domain
3. Configure DNS records as instructed

### Monitoring
- Vercel Analytics: Already included
- Supabase Dashboard: Monitor database usage
- Check Vercel function logs for errors

## Support

For issues, check:
- Vercel Documentation: https://vercel.com/docs
- Next.js Documentation: https://nextjs.org/docs
- Supabase Documentation: https://supabase.com/docs
