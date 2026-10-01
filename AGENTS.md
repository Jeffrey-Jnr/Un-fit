<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Standards & Learned Rules

## 1. Supabase Webhooks & RLS Bypass
When writing server-side webhooks (like Paystack or Stripe) that need to update protected database tables (e.g., `orders`), **always** instantiate the Supabase client using the `SUPABASE_SERVICE_ROLE_KEY` (service role client). Never use the `anon` key, as Row Level Security (RLS) will silently block `UPDATE` operations and crash the webhook.

## 2. Next.js Build-Time Environment Variables
When initializing Supabase clients in Next.js top-level modules (e.g., `lib/supabaseClient.ts`), always provide dummy fallback strings (e.g., `process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://dummy.supabase.co'`). Next.js evaluates top-level code during static generation, and if variables are missing in Vercel preview environments, the build will crash.

## 3. iOS Safari Form Zooming
When styling forms for mobile viewports, always ensure that `input`, `textarea`, and `select` elements have a font size of at least `16px` (e.g., via Tailwind's `text-base` or a global media query). This explicitly prevents iOS Safari from automatically zooming in on focus, which disrupts the user experience.
