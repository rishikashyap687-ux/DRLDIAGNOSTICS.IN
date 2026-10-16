import { Link, createFileRoute } from '@tanstack/react-router'
import { BadgeIndianRupee, Eye, FlaskConical, House, Microscope, ShieldCheck, Target } from 'lucide-react'

import { PageHeader } from '@/components/site/PageHeader'
import { Button } from '@/components/ui/button'
import { img, imgSrcSet } from '@/lib/img'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/about')({
  head: () =>
    seo({
      title: 'About Us — Committed to Better Diagnostic Care',
      description:
        'DRL DIAGNOSTICS is a pathology and blood testing laboratory in North East Delhi, committed to accurate, affordable and acceptable diagnostic care with free home sample collection.',
      path: '/about',
      image: '/img/microscope.png',
    }),
  component: AboutPage,
})

const pillars = [
  { icon: FlaskConical, title: 'Our diagnostic services', text: 'Hematology, biochemistry, thyroid, hormone, vitamin, serology, immunology, urine and stool investigations, plus preventive health packages.' },
  { icon: ShieldCheck, title: 'Our approach to quality', text: 'Careful sample handling, standardised processes and review of every report before it is released to the patient.' },
  { icon: House, title: 'Patient convenience', text: 'Simple online booking, free home sample collection wherever available, and secure digital access to reports.' },
  { icon: BadgeIndianRupee, title: 'Our commitment to affordability', text: 'Transparent pricing with no hidden collection charges, so quality diagnostics stay within reach for every family.' },
]

function AboutPage() {
  return (
    <>
      <PageHeader crumb="About Us" eyebrow="About DRL DIAGNOSTICS" title="DRL DIAGNOSTICS — Committed to Better Diagnostic Care" />

      <section className="mx-auto grid max-w-content items-center gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        <img
          src={img('/img/microscope.png', 800)}
          srcSet={imgSrcSet('/img/microscope.png', [500, 800, 1100])}
          sizes="(min-width: 1024px) 560px, 100vw"
          alt="Pathologist examining a sample slide under a binocular microscope"
          className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
        />
        <div>
          <p className="text-xs font-bold tracking-[0.2em] text-secondary uppercase">Our story</p>
          <h2 className="mt-2 text-3xl font-semibold text-primary">Accurate. Affordable. Acceptable.</h2>
          <div className="mt-4 grid gap-4 leading-relaxed text-muted-foreground">
            <p>
              DRL DIAGNOSTICS is a pathology and blood testing laboratory based in Sabapur, North East Delhi. We
              started with a simple belief: every family should be able to get dependable laboratory tests without
              difficulty, delay or unnecessary cost.
            </p>
            <p>
              Our three promises — accurate, affordable and acceptable — guide how we collect samples, run
              investigations and communicate with patients. Bringing sample collection to your home, free of charge
              wherever available, is part of that promise.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-soft-blue">
        <div className="mx-auto grid max-w-content gap-5 px-4 py-14 sm:px-6 md:grid-cols-2">
          <div className="rounded-3xl bg-primary p-8 text-primary-foreground">
            <Target className="size-9" aria-hidden />
            <h2 className="mt-4 text-2xl font-semibold">Our mission</h2>
            <p className="mt-3 leading-relaxed text-primary-foreground/85">
              Our mission is to make pathology and blood testing accessible, convenient, and affordable while
              maintaining a strong commitment to quality, professionalism, and patient-focused service.
            </p>
          </div>
          <div className="rounded-3xl bg-secondary p-8 text-secondary-foreground">
            <Eye className="size-9" aria-hidden />
            <h2 className="mt-4 text-2xl font-semibold">Our vision</h2>
            <p className="mt-3 leading-relaxed text-secondary-foreground/90">
              Our vision is to build a trusted diagnostic healthcare brand that combines dependable laboratory
              services with convenient technology and accessible healthcare.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-content px-4 py-14 sm:px-6">
        <ul className="grid gap-5 sm:grid-cols-2">
          {pillars.map(({ icon: Icon, title, text }) => (
            <li key={title} className="flex gap-4 rounded-3xl border bg-card p-6">
              <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent text-primary"><Icon className="size-6" aria-hidden /></span>
              <span>
                <h2 className="font-sans text-lg font-bold">{title}</h2>
                <p className="mt-1 text-muted-foreground">{text}</p>
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-col items-start gap-4 rounded-3xl border bg-hero-glow p-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <Microscope className="size-10 text-primary" aria-hidden />
            <p className="text-lg font-semibold">Ready to book a test or a health checkup?</p>
          </div>
          <div className="flex gap-2">
            <Button asChild className="rounded-full font-bold"><Link to="/book">Book a test</Link></Button>
            <Button asChild variant="outline" className="rounded-full font-bold"><Link to="/packages">View packages</Link></Button>
          </div>
        </div>
      </section>
    </>
  )
}
