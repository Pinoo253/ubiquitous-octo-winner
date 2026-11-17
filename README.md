# ADB CREATIVE TEAM
Next.js 15 (App Router) + TypeScript + Tailwind + Supabase.

## Setup
1. `npm install`
2. Copy `.env.example` to `.env.local`, isi `NEXT_PUBLIC_SUPABASE_URL` dan `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`.
3. Supabase Dashboard > SQL Editor: jalankan `supabase/migrations/0001_init.sql`.
4. Buat user di Authentication > Users, lalu jadikan admin: `update public.profiles set role='admin' where id='<USER_UUID>';`
5. `npm run dev`

## Deploy ke Vercel
Import repo GitHub, Framework Preset Next.js, Root Directory = folder berisi package.json. Settings > Environment Variables: tambahkan dua variabel di atas (Production, Preview, Development), lalu Deploy.

## Status
Lihat VALIDATION.md.
