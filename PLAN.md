# DRL DIAGNOSTICS — Build Plan

1. **Public website & booking flows — DONE.** Brand theme and logo; homepage; test catalogue with search, filters and detail pages; 11 health packages with filters; cart and online booking; free home collection with PIN availability check and service enquiries for areas not yet covered; reports page linked to the lab's report portal; partnerships, contact (map, directions), About and legal pages; floating WhatsApp/support menu and mobile action bar; per-page SEO and structured data. Bookings and enquiries are sent through Netlify Forms.
2. **SEO files.** `robots.txt` and an XML sitemap generated from the catalogue.
3. **Database & backend.** Netlify Database (Postgres) schema for tests, packages, service areas, bookings, statuses, patients, reports, enquiries, settings and audit logs. Move `src/data/*` into the database, and save bookings through validated, rate-limited server functions.
4. **Staff authentication & admin dashboard.** Netlify Identity with roles (admin, front desk, phlebotomist, pathologist). Modules: overview stats, tests, packages, bookings (search, status, assign staff, CSV export), service areas/slots/partners, patients, enquiries, website content/settings (phone, WhatsApp, hours), users, audit log and analytics.
5. **Patient portal.** Mobile OTP login (SMS provider), booking tracking, report history, contact updates.
6. **Secure report management.** PDF upload to private Netlify Blobs, approval/publish/revision workflow, signed short-lived downloads, access logs; optional LIMS (flabslis) API integration.
7. **Notifications.** SMS, email and WhatsApp Business API confirmations and report-ready alerts.
8. **Launch checks.** Confirm contact details, prices, turnaround times, landmark and legal text with the business; test flows, roles and mobile layouts.
