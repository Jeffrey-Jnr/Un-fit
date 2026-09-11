# (un)Fit — Official Book Website

The official web platform and e-commerce experience for **(un)Fit** by **Jeffrey Hughes Jr.** — an honest conversation on brokenness, purpose, grace, and a God who uses imperfect people.

---

## Tech Stack

- **Framework**: [Next.js 16 (App Router)](https://nextjs.org)
- **UI & Styling**: [React 19](https://react.dev), [Tailwind CSS v4](https://tailwindcss.com), [Lucide Icons](https://lucide.dev)
- **Animations**: [GSAP (GreenSock)](https://gsap.com) & `@gsap/react`
- **Database & Auth**: [Supabase](https://supabase.com) (`@supabase/ssr` & `@supabase/supabase-js`)
- **Payments**: [Paystack](https://paystack.com) (`react-paystack` & Webhook verification)
- **Email Delivery**: [Resend](https://resend.com) & [React Email](https://react.email)
- **Newsletter & CRM**: [MailerLite API](https://www.mailerlite.com)
- **Security & Bot Protection**: [Cloudflare Turnstile](https://www.cloudflare.com/products/turnstile/)

---

## Key Features

- **Cinematic Landing Page**: Responsive scroll-driven GSAP typography reveals, video embeds, and author profile.
- **Free Sample Chapter Flow**: Modal-based email signup connected to MailerLite with instant welcome email delivery via Resend.
- **Dynamic Checkout Flow**:
  - Door-to-door (Greater Accra) and Station pick-up tiers across all Ghana regions.
  - Live subtotal and shipping fee calculation.
  - Cloudflare Turnstile bot verification.
  - Seamless Paystack payment processing (Mobile Money & Card).
- **Paystack Webhook Handling**: Cryptographically verified (`x-paystack-signature`) webhook endpoint to fulfill orders and trigger customer/admin emails automatically.
- **Admin Dashboard (`/admin`)**:
  - Secure email/password authentication via Supabase Auth.
  - Metrics overview (Total Revenue, Order Count, Pending Deliveries).
  - Search, filter, and pagination across all orders.
  - Real-time fulfillment status updates (`unfulfilled` → `shipped` → `delivered`) with automated email triggers to customers.
  - Dedicated Customers view summarizing total lifetime spend.
- **Transactional React Email Templates**:
  - `PurchaseReceipt`: Customer purchase confirmation and order reference.
  - `AdminNewOrder`: Instant email alert for admin upon successful payment.
  - `OrderStatusUpdate`: Automatic shipment notification with delivery details.
  - `NewsletterWelcome` & `WaitlistWelcome`: Instant onboarding emails.

---

## Project Structure

```
├── app/
│   ├── (marketing)/         # Public pages: privacy, terms, sample, cookies
│   ├── admin/               # Admin dashboard, login, and password management
│   ├── api/
│   │   ├── mailerlite/      # Newsletter subscriber sync
│   │   ├── orders/          # Status mutation endpoints
│   │   ├── verify-turnstile/# Bot protection validation
│   │   └── webhooks/        # Paystack webhook listener
│   ├── checkout/            # Checkout flow and success page
│   └── page.tsx             # Homepage orchestrator
├── components/
│   ├── admin/               # Modular admin components (Stats, Table, Modal)
│   ├── checkout/            # Checkout sub-components (OrderSummary, constants)
│   ├── sections/            # Landing page sections (Hero, AboutAuthor, etc.)
│   └── ...                  # Global UI components (Navbar, Footer, Modals)
├── emails/                  # React Email templates
├── scripts/                 # Standalone utilities (HTML email pre-rendering)
├── supabase/                # Database schema and RLS policies
└── utils/supabase/          # SSR and browser Supabase clients
```

---

## Getting Started

### 1. Prerequisites
- Node.js 18.17+ or later
- npm, pnpm, or yarn

### 2. Installation
```bash
git clone https://github.com/Jeffrey-Jnr/Un-fit.git
cd Un-fit
npm install
```

### 3. Environment Variables
Create a `.env.local` file in the root directory:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Paystack
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=pk_test_...
PAYSTACK_SECRET_KEY=sk_test_...

# Email & CRM
RESEND_API_KEY=re_...
MAILERLITE_API_KEY=...

# Security (Cloudflare Turnstile)
NEXT_PUBLIC_TURNSTILE_SITE_KEY=...
TURNSTILE_SECRET_KEY=...

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_IS_PRELAUNCH=false
```

### 4. Running Locally
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application.

---

## Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Next.js development server with Turbopack |
| `npm run build` | Builds the production bundle and runs type validation |
| `npm run start` | Starts the production server |
| `npm run lint` | Runs ESLint to check code quality |
| `npx tsc --noEmit` | Runs TypeScript type checker without emitting code |
| `npx tsx scripts/generate-all-emails.tsx` | Pre-renders email templates to HTML previews in `public/` |

---

## Database Setup

Execute [`supabase/schema.sql`](supabase/schema.sql) in your Supabase SQL Editor to initialize the `orders` table and Row Level Security (RLS) policies.
