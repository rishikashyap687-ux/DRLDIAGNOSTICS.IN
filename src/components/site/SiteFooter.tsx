import { Link } from '@tanstack/react-router'
import { Clock, Mail, MapPin, Phone } from 'lucide-react'

import { categories } from '@/data/catalogue'
import { fullAddress, formatPhone, site, telLink } from '@/data/site'

import { Logo } from './Logo'
import { legalNav, mainNav } from './nav'

export function SiteFooter() {
  const tel = telLink()
  return (
    <footer className="mt-auto border-t bg-soft-blue pb-24 md:pb-0">
      <div className="mx-auto grid max-w-content gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="inline-block rounded-2xl bg-background p-2 shadow-sm">
            <Logo />
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Pathology and blood testing laboratory in North East Delhi, with free home sample collection where
            service is available.
          </p>
          <p className="mt-4 text-xs font-bold tracking-[0.2em] text-primary">{site.tagline}</p>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold tracking-wide text-foreground uppercase">Explore</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {mainNav.slice(1).map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="text-muted-foreground hover:text-primary">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold tracking-wide text-foreground uppercase">Test categories</h2>
          <ul className="mt-4 space-y-2 text-sm">
            {categories.slice(0, 8).map((c) => (
              <li key={c.id}>
                <Link to="/tests" search={{ category: c.id }} className="text-muted-foreground hover:text-primary">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h2 className="font-sans text-sm font-bold tracking-wide text-foreground uppercase">Visit the lab</h2>
          <address className="mt-4 space-y-3 text-sm not-italic text-muted-foreground">
            <p className="flex gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden />
              <span>
                <strong className="text-foreground">{site.name}</strong>
                <br />
                {fullAddress}
              </span>
            </p>
            {tel && site.phone && (
              <p className="flex gap-2">
                <Phone className="size-4 shrink-0 text-secondary" aria-hidden />
                <a href={tel} className="hover:text-primary">{formatPhone(site.phone)}</a>
              </p>
            )}
            {site.email && (
              <p className="flex gap-2">
                <Mail className="size-4 shrink-0 text-secondary" aria-hidden />
                <a href={`mailto:${site.email}`} className="hover:text-primary">{site.email}</a>
              </p>
            )}
            {site.openingHours && (
              <p className="flex gap-2">
                <Clock className="size-4 shrink-0 text-secondary" aria-hidden />
                {site.openingHours}
              </p>
            )}
          </address>
        </div>
      </div>

      <div className="border-t">
        <div className="mx-auto flex max-w-content flex-col gap-3 px-4 py-6 text-xs text-muted-foreground sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {legalNav.map((l) => (
              <li key={l.slug}>
                <Link to="/legal/$slug" params={{ slug: l.slug }} className="hover:text-primary">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
