import { Link } from '@tanstack/react-router'
import {
  Activity,
  Bean,
  Clock,
  Droplet,
  FlaskConical,
  Heart,
  HeartPulse,
  House,
  Mars,
  Shield,
  TestTubes,
  Users,
  Utensils,
  Venus,
} from 'lucide-react'

import { Badge } from '@/components/ui/badge'
import {
  categoryName,
  fastingLabel,
  testBySlug,
  type HealthPackage,
  type LabTest,
} from '@/data/catalogue'
import { cn } from '@/lib/utils'

import { AddToBooking, Price } from './Price'

const packageIcons = {
  'heart-pulse': HeartPulse,
  activity: Activity,
  shield: Shield,
  droplet: Droplet,
  flask: FlaskConical,
  bean: Bean,
  heart: Heart,
  venus: Venus,
  mars: Mars,
  users: Users,
} as const

export function TestCard({ test, className }: { test: LabTest; className?: string }) {
  return (
    <article
      className={cn(
        'group relative flex flex-col rounded-2xl border bg-card p-5 transition-all hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5 motion-reduce:transition-none motion-reduce:hover:translate-y-0',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-[11px] font-bold tracking-wider text-secondary uppercase">{categoryName(test.category)}</p>
        <span className="font-mono text-[11px] text-muted-foreground">{test.code}</span>
      </div>
      <h3 className="mt-2 font-sans text-base leading-snug font-bold text-foreground">
        <Link to="/tests/$slug" params={{ slug: test.slug }} className="after:absolute after:inset-0 group-hover:text-primary">
          {test.name}
        </Link>
      </h3>
      <p className="mt-1.5 line-clamp-2 text-sm text-muted-foreground">{test.description}</p>
      <ul className="mt-4 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
        <li className="flex items-center gap-1"><Utensils className="size-3.5" aria-hidden /> {fastingLabel[test.fasting]}</li>
        <li className="flex items-center gap-1"><Clock className="size-3.5" aria-hidden /> {test.turnaround}</li>
        {test.homeCollection && (
          <li className="flex items-center gap-1 text-secondary"><House className="size-3.5" aria-hidden /> Home collection</li>
        )}
      </ul>
      <div className="mt-auto flex items-center justify-between gap-3 pt-5">
        <Price value={test.price} />
        {test.price !== null ? (
          <AddToBooking item={{ kind: 'test', slug: test.slug }} size="sm" className="relative z-10" />
        ) : (
          <Link to="/contact" className="relative z-10 text-sm font-bold text-primary hover:underline">Enquire</Link>
        )}
      </div>
    </article>
  )
}

export function PackageCard({ pkg, className }: { pkg: HealthPackage; className?: string }) {
  const Icon = packageIcons[pkg.icon]
  const included = pkg.includes.map((s) => testBySlug.get(s)?.name).filter(Boolean) as string[]
  return (
    <article
      id={pkg.slug}
      className={cn(
        'relative flex scroll-mt-32 flex-col overflow-hidden rounded-3xl border bg-card p-6 transition-shadow hover:shadow-xl hover:shadow-primary/8 target:ring-4 target:ring-secondary/40 motion-reduce:transition-none',
        className,
      )}
    >
      <div className="absolute -top-16 -right-16 size-40 rounded-full bg-accent" aria-hidden />
      <div className="relative flex items-start justify-between gap-3">
        <span className="grid size-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-md shadow-primary/25">
          <Icon className="size-6" aria-hidden />
        </span>
        {pkg.popular && <Badge className="rounded-full bg-secondary text-secondary-foreground">Popular</Badge>}
      </div>
      <h3 className="relative mt-5 text-xl font-semibold text-primary">{pkg.name}</h3>
      <p className="relative mt-1.5 text-sm text-muted-foreground">{pkg.summary}</p>

      <dl className="relative mt-4 grid grid-cols-3 gap-2 rounded-2xl bg-muted p-3 text-center">
        <div>
          <dt className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">Parameters</dt>
          <dd className="font-bold text-foreground tabular-nums">{pkg.parameters}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">Fasting</dt>
          <dd className="text-sm font-bold text-foreground">{pkg.fasting === 'none' ? 'None' : pkg.fasting.replace('-', '–').replace(' hours', 'h')}</dd>
        </div>
        <div>
          <dt className="text-[10px] font-semibold tracking-wide text-muted-foreground uppercase">Report</dt>
          <dd className="text-sm font-bold text-foreground">{pkg.turnaround}</dd>
        </div>
      </dl>

      <details className="group/inc relative mt-4">
        <summary className="flex cursor-pointer list-none items-center gap-1.5 text-sm font-semibold text-foreground [&::-webkit-details-marker]:hidden">
          <TestTubes className="size-4 text-secondary" aria-hidden />
          {included.length} tests included
          <span className="text-xs text-primary group-open/inc:hidden">— view</span>
        </summary>
        <ul className="mt-2 grid gap-1 pl-6 text-sm text-muted-foreground">
          {included.map((name) => (
            <li key={name} className="list-disc marker:text-secondary">{name}</li>
          ))}
        </ul>
      </details>
      <p className="relative mt-3 text-xs text-muted-foreground">Sample: {pkg.sample} · Free home collection available</p>

      <div className="relative mt-auto flex items-center justify-between gap-3 pt-6">
        <Price value={pkg.price} original={pkg.originalPrice} />
        <AddToBooking item={{ kind: 'package', slug: pkg.slug }} label="Book Package" className="h-10 px-5" />
      </div>
    </article>
  )
}
