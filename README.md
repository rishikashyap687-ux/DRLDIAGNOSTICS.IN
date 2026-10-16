# DRL DIAGNOSTICS website

Website for DRL DIAGNOSTICS, a pathology and blood testing laboratory in Sabapur, North East Delhi (ACCURATE • AFFORDABLE • ACCEPTABLE).

## Stack
TanStack Start (React 19, Vite 8), Tailwind CSS 4, shadcn/ui, Netlify Forms, Netlify Image CDN. Deployed on Netlify.

## Run locally
```bash
pnpm install
netlify dev   # or: npm run dev
```

## Configuration
- Business details (phone, WhatsApp, email, hours, report portal URL): `src/data/site.ts`. Values left `null` stay hidden on the site.
- Catalogue and packages (sample data): `src/data/catalogue.ts`. Serviceable PIN codes: `src/data/service-areas.ts`.
- Optional environment variables: `VITE_GA_MEASUREMENT_ID` (Google Analytics), `VITE_GOOGLE_SITE_VERIFICATION` (Search Console).
- Form submissions (bookings, home collection, contact, partnerships) show up under Forms in the Netlify dashboard.

## Roadmap
See [PLAN.md](PLAN.md): database, admin dashboard, patient OTP portal, secure report uploads and notifications.
