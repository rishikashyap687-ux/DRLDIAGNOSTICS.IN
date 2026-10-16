import { Link } from '@tanstack/react-router'

import { site } from '@/data/site'
import { img } from '@/lib/img'
import { cn } from '@/lib/utils'

export function Logo({ className }: { className?: string }) {
  return (
    <Link to="/" className={cn('inline-flex shrink-0 items-center', className)} aria-label={`${site.name} home`}>
      <img
        src={img(site.logo, 240, 85)}
        srcSet={`${img(site.logo, 240, 85)} 1x, ${img(site.logo, 480, 85)} 2x`}
        alt={`${site.name} logo — ${site.tagline}`}
        width={96}
        height={64}
        className="h-14 w-auto mix-blend-multiply"
      />
    </Link>
  )
}
