# Kogniora Website — Deployment Guide

## Prerequisites
- Node.js 18 or higher (check: `node -v`)
- A GitHub account (free)
- A Vercel account (free at vercel.com)

---

## Step 1 — Install dependencies

```bash
cd kogniora-website
npm install
```

---

## Step 2 — Set up environment variables

```bash
cp .env.local.example .env.local
```

Open `.env.local` and fill in your two values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

Get these from:
**Supabase Dashboard → Project Settings → API**

---

## Step 3 — Run locally to verify

```bash
npm run dev
```

Open http://localhost:3000

You should see:
- `/courses` — your courses listing (pulls live from Supabase)
- `/courses/pmp-prep` — course detail (replace with your slug)
- `/corporate` — corporate training page
- `/contact` — contact form

---

## Step 4 — Add your logo

Copy your logo file to `public/logo.png`

---

## Step 5 — Deploy to Vercel

### Option A — Vercel CLI (fastest)

```bash
npm install -g vercel
vercel
```

Follow the prompts. When asked about environment variables, add:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Option B — GitHub + Vercel dashboard (recommended for ongoing use)

1. Push this folder to a GitHub repo:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/kogniora-website.git
   git push -u origin main
   ```

2. Go to https://vercel.com/new
3. Import your GitHub repository
4. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
5. Click **Deploy**

Vercel will build and deploy in ~2 minutes.
Every `git push` after that auto-deploys.

---

## Step 6 — Auto-rebuild when you add courses

When you add a new course in the admin portal, the website needs to rebuild
to include the new course page. Set this up with a Vercel Deploy Hook:

1. Vercel Dashboard → Your Project → Settings → Git → Deploy Hooks
2. Create a hook named "Supabase Course Update" — copy the URL
3. In Supabase Dashboard → Database → Webhooks:
   - Table: `courses`
   - Events: INSERT, UPDATE
   - URL: paste the Vercel deploy hook URL
4. Now every time you save a course in the admin portal, Vercel rebuilds
   the site automatically within ~2 minutes.

---

## Custom Domain

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g. `kogniora.com`)
3. Update your DNS records as instructed by Vercel
4. SSL certificate is provisioned automatically (free)

---

## File Structure

```
kogniora-website/
├── app/
│   ├── layout.jsx              ← Root layout (Navbar + Footer on every page)
│   ├── page.jsx                ← Redirects / → /courses
│   ├── globals.css             ← All styles
│   ├── courses/
│   │   ├── page.jsx            ← /courses  (listing + filters)
│   │   └── [slug]/
│   │       ├── page.jsx        ← /courses/pmp-prep  (detail)
│   │       └── not-found.jsx   ← 404 for unknown slugs
│   ├── corporate/
│   │   └── page.jsx            ← /corporate
│   └── contact/
│       └── page.jsx            ← /contact
├── components/
│   ├── Navbar.jsx
│   ├── Footer.jsx
│   ├── CourseCard.jsx          ← Individual course card
│   ├── CourseFilters.jsx       ← Search + filter + grid (client)
│   ├── CourseDetailTabs.jsx    ← Tab switcher (client)
│   ├── CourseOverview.jsx      ← Accordions, modules, learning (client)
│   └── BookingPanel.jsx        ← City picker + Eventbrite widget (client)
├── lib/
│   └── supabase.js             ← Supabase client + all data fetchers
├── public/
│   └── logo.png                ← YOUR LOGO HERE
├── .env.local.example          ← Copy to .env.local and fill in
├── next.config.js
└── package.json
```

---

## Rendering Strategy

| Page | Strategy | Cache |
|------|----------|-------|
| `/courses` | SSG + revalidate | 1 hour |
| `/courses/[slug]` | SSG for all slugs + revalidate | 1 hour |
| `/corporate` | SSG + revalidate | 1 hour |
| `/contact` | Client-side (form) | — |
| City selector | Client-side | — |
| Eventbrite widget | Client-side | — |

SSG = page is pre-built at deploy time. Google can index it immediately.
Revalidate = Next.js rebuilds the page in the background after 1 hour.

---

## Troubleshooting

**"Missing Supabase environment variables"**
→ Check `.env.local` exists and has both variables filled in.
→ Restart `npm run dev` after editing `.env.local`.

**Courses page shows 0 courses**
→ Check Supabase RLS policies — `anon` role needs SELECT on `courses` where `is_active = TRUE`.
→ Run `kogniora-schema-v2.sql` in Supabase SQL Editor if not done yet.

**Eventbrite widget not showing**
→ Check the `eventbrite_event_id` is set for that course+city in the admin portal.
→ The widget loads client-side after city selection — it won't show until a city is clicked.

**Course detail page returns 404**
→ The slug in the URL must exactly match the `slug` column in the `courses` table.
→ Check the slug in the admin portal Courses page.
