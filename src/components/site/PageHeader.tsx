import { Link } from '@tanstack/react-router'
import { ChevronRight } from 'lucide-react'

export function PageHeader({
  eyebrow,
  title,
  description,
  crumb,
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  crumb: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-hero-glow">
      <div className="absolute inset-0 bg-dots [mask-image:linear-gradient(to_bottom,black,transparent)] opacity-60" aria-hidden />
      <div className="relative mx-auto max-w-content px-4 pt-8 pb-12 sm:px-6 md:pb-16">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
          <Link to="/" className="hover:text-primary">Home</Link>
          <ChevronRight className="size-3" aria-hidden />
          <span aria-current="page" className="text-foreground">{crumb}</span>
        </nav>
        {eyebrow && (
          <p className="mt-6 text-xs font-bold tracking-[0.2em] text-secondary uppercase">{eyebrow}</p>
        )}
        <h1 className="mt-2 max-w-4xl text-3xl leading-tight font-semibold text-primary sm:text-4xl md:text-5xl animate-rise">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-reading text-base leading-relaxed text-muted-foreground md:text-lg">{description}</p>
        )}
        {children}
      </div>
    </section>
  )
}
