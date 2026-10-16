import { Link, createFileRoute } from '@tanstack/react-router'
import {
  ArrowRight,
  Building2,
  CalendarCheck,
  Check,
  ClipboardList,
  FileLock2,
  FlaskConical,
  House,
  IndianRupee,
  Microscope,
  ShieldCheck,
  Stethoscope,
  Syringe,
  TestTubes,
} from 'lucide-react'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import { HomeCollectionForm } from '@/components/site/HomeCollectionForm'
import { TestSearch } from '@/components/site/TestSearch'
import { PackageCard, TestCard } from '@/components/site/cards'
import { categories, packages, tests } from '@/data/catalogue'
import { faqs } from '@/data/content'
import { img, imgSrcSet } from '@/lib/img'
import { jsonLd, seo } from '@/lib/seo'

export const Route = createFileRoute('/')({
  head: () => ({
    ...seo({
      title: 'DRL DIAGNOSTICS | Pathology Lab in North East Delhi | Blood Test Booking Online',
      description:
        'Book blood tests online with DRL DIAGNOSTICS, a pathology lab in Sabapur, North East Delhi. Affordable blood tests, full body health checkups and FREE home blood sample collection.',
      path: '/',
    }),
    scripts: [
      jsonLd({
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((f) => ({
          '@type': 'Question',
          name: f.q,
          acceptedAnswer: { '@type': 'Answer', text: f.a },
        })),
      }),
    ],
  }),
  component: Home,
})

const highlights = [
  'Pathology and Blood Tests',
  'Free Home Sample Collection',
  'Convenient Online Booking',
  'Secure Digital Reports',
  'Affordable Diagnostic Services',
]

const categoryIcons = [TestTubes, FlaskConical, Stethoscope, ShieldCheck, Syringe, ClipboardList, IndianRupee, TestTubes, ClipboardList, Microscope]

function Home() {
  const popularTests = tests.filter((t) => t.popular).slice(0, 8)
  const popularPackages = packages.filter((p) => p.popular).slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-hero-glow">
        <div className="absolute inset-0 bg-dots opacity-50 [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_70%)]" aria-hidden />
        <div className="relative mx-auto grid max-w-content items-center gap-10 px-4 pt-10 pb-16 sm:px-6 lg:grid-cols-[1.05fr_1fr] lg:gap-14 lg:pt-16 lg:pb-24">
          <div className="animate-rise">
            <p className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-background/70 px-3 py-1 text-xs font-bold tracking-wider text-secondary">
              <span className="size-1.5 rounded-full bg-secondary" /> ACCURATE • AFFORDABLE • ACCEPTABLE
            </p>
            <h1 className="mt-5 text-4xl leading-[1.05] font-semibold text-primary sm:text-5xl lg:text-6xl">
              Accurate Diagnostics.
              <br />
              <span className="text-secondary italic">Better Healthcare.</span>
            </h1>
            <p className="mt-5 text-lg font-semibold text-foreground sm:text-xl">
              Reliable Pathology &amp; Blood Testing Services with FREE Home Sample Collection Across India.
            </p>
            <p className="mt-3 max-w-xl leading-relaxed text-muted-foreground">
              Your health deserves dependable diagnostic care. DRL DIAGNOSTICS makes laboratory testing convenient
              with affordable test options, simple online booking, and secure digital access to your reports.
            </p>

            <TestSearch className="mt-7 max-w-xl" />

            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Button asChild size="lg" className="h-12 rounded-full px-7 font-bold shadow-lg shadow-primary/25">
                <Link to="/book">BOOK A TEST</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="h-12 rounded-full border-primary/30 px-6 font-bold text-primary">
                <Link to="/packages">EXPLORE HEALTH PACKAGES</Link>
              </Button>
              <Button asChild size="lg" variant="secondary" className="h-12 rounded-full px-6 font-bold">
                <Link to="/home-collection"><House className="size-4" /> BOOK FREE HOME COLLECTION</Link>
              </Button>
            </div>
          </div>

          <div className="relative animate-rise [animation-delay:150ms]">
            <div className="absolute -inset-4 -z-10 rotate-2 rounded-[2.5rem] bg-gradient-to-br from-primary/15 to-secondary/20" aria-hidden />
            <img
              src={img('/img/hero-lab.png', 900)}
              srcSet={imgSrcSet('/img/hero-lab.png', [600, 900, 1300])}
              sizes="(min-width: 1024px) 560px, 100vw"
              alt="Modern pathology laboratory with an automated blood analyser and sample tubes, technician working in the background"
              width={1376}
              height={768}
              fetchPriority="high"
              className="aspect-[4/3] w-full rounded-[2rem] object-cover shadow-2xl shadow-primary/20"
            />
            <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border bg-background/95 p-4 shadow-xl backdrop-blur sm:left-auto sm:w-72">
              <p className="flex items-center gap-2 text-sm font-bold text-foreground">
                <span className="grid size-9 place-items-center rounded-xl bg-secondary/10 text-secondary"><House className="size-5" /></span>
                Home collection fee
              </p>
              <p className="mt-1 text-3xl font-extrabold text-secondary">₹0</p>
              <p className="text-xs text-muted-foreground">Wherever free collection is available</p>
            </div>
          </div>
        </div>

        <div className="relative border-y bg-background/80 backdrop-blur">
          <ul className="mx-auto flex max-w-content flex-wrap justify-center gap-x-8 gap-y-3 px-4 py-5 sm:px-6">
            {highlights.map((h) => (
              <li key={h} className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <span className="grid size-5 place-items-center rounded-full bg-secondary text-secondary-foreground"><Check className="size-3" strokeWidth={3} /></span>
                {h}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* POPULAR TESTS */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-20">
        <SectionHeading
          eyebrow="Pathology test price list"
          title="Popular blood tests"
          description="Book individual tests in a few taps. Every test page lists sample type, fasting needs and preparation."
          action={<Link to="/tests" className="inline-flex items-center gap-1 font-bold text-primary hover:underline">View all tests <ArrowRight className="size-4" /></Link>}
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {popularTests.map((t) => <TestCard key={t.slug} test={t} />)}
        </div>
      </section>

      {/* FREE HOME COLLECTION */}
      <section id="home-collection" className="relative overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-15 bg-dots [filter:invert(1)]" aria-hidden />
        <div className="relative mx-auto grid max-w-content gap-10 px-4 py-16 sm:px-6 md:py-20 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-xs font-bold tracking-[0.2em] text-secondary-foreground/80 uppercase">Free Home Sample Collection Across India</p>
            <h2 className="mt-3 text-3xl leading-tight font-semibold sm:text-4xl">Your Health. Your Home. Our Care.</h2>
            <p className="mt-4 max-w-lg leading-relaxed text-primary-foreground/85">
              Book your pathology tests from the comfort of your home. DRL DIAGNOSTICS offers free home sample
              collection across India, subject to service availability and confirmation for your location.
            </p>
            <img
              src={img('/img/home-collection.png', 800)}
              srcSet={imgSrcSet('/img/home-collection.png', [500, 800, 1100])}
              sizes="(min-width: 1024px) 480px, 100vw"
              alt="Phlebotomist in a teal uniform collecting a blood sample from a patient at home"
              loading="lazy"
              width={1200}
              height={896}
              className="mt-8 aspect-[4/3] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/20"
            />
            <ul className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
              {[
                { icon: CalendarCheck, t: 'Pick a slot', d: 'Choose a date and time that suits you.' },
                { icon: Syringe, t: 'Trained collection', d: 'Sterile, single-use collection kit at your door.' },
                { icon: FileLock2, t: 'Secure report', d: 'Download your report online once released.' },
              ].map(({ icon: Icon, t, d }) => (
                <li key={t} className="rounded-2xl bg-white/8 p-4 ring-1 ring-white/15">
                  <Icon className="size-6 text-secondary-foreground" aria-hidden />
                  <p className="mt-2 font-bold">{t}</p>
                  <p className="text-sm text-primary-foreground/75">{d}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="text-foreground">
            <HomeCollectionForm />
          </div>
        </div>
      </section>

      {/* PACKAGES */}
      <section className="bg-soft-blue">
        <div className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-20">
          <SectionHeading
            eyebrow="Full body health checkup"
            title="Preventive health checkups for every family"
            description="Thoughtfully grouped packages so you test what matters, in a single sample visit."
            action={<Link to="/packages" className="inline-flex items-center gap-1 font-bold text-primary hover:underline">All 11 packages <ArrowRight className="size-4" /></Link>}
          />
          <div className="mt-8 grid gap-5 md:grid-cols-3">
            {popularPackages.map((p) => <PackageCard key={p.slug} pkg={p} />)}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto max-w-content px-4 py-16 sm:px-6 md:py-20">
        <SectionHeading eyebrow="Complete test catalogue" title="Browse tests by category" />
        <ul className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c, i) => {
            const Icon = categoryIcons[i % categoryIcons.length]
            const count = tests.filter((t) => t.category === c.id).length
            return (
              <li key={c.id}>
                <Link
                  to="/tests"
                  search={{ category: c.id }}
                  className="group flex h-full flex-col rounded-2xl border bg-card p-4 transition-colors hover:border-primary/40 hover:bg-accent/50 motion-reduce:transition-none"
                >
                  <Icon className="size-6 text-secondary" aria-hidden />
                  <span className="mt-3 font-bold text-foreground group-hover:text-primary">{c.name}</span>
                  <span className="mt-0.5 text-xs text-muted-foreground">{c.blurb}</span>
                  <span className="mt-auto pt-3 text-xs font-semibold text-primary">{count} tests</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </section>

      {/* REPORTS + PARTNERS */}
      <section className="mx-auto grid max-w-content gap-5 px-4 pb-16 sm:px-6 md:grid-cols-2 md:pb-20">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-secondary to-[oklch(0.5_0.1_210)] p-8 text-secondary-foreground">
          <FileLock2 className="size-10 opacity-90" aria-hidden />
          <h2 className="mt-4 text-2xl font-semibold sm:text-3xl">Online lab report download</h2>
          <p className="mt-2 max-w-sm text-secondary-foreground/85">
            Access your released reports through our secure laboratory report portal.
          </p>
          <Button asChild variant="outline" className="mt-6 rounded-full border-white/40 bg-white font-bold text-secondary hover:bg-white/90 hover:text-secondary">
            <Link to="/reports">Download your report <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
        <div className="relative overflow-hidden rounded-3xl border bg-card p-8">
          <img src={img('/img/microscope.png', 500)} alt="" aria-hidden loading="lazy" className="absolute -right-10 -bottom-10 size-56 rounded-full object-cover opacity-20" />
          <Building2 className="size-10 text-primary" aria-hidden />
          <h2 className="mt-4 text-2xl font-semibold text-primary sm:text-3xl">Doctors, clinics &amp; corporates</h2>
          <p className="mt-2 max-w-sm text-muted-foreground">
            Partner with DRL DIAGNOSTICS for sample collection coordination, institutional testing and corporate health checkups.
          </p>
          <Button asChild className="relative mt-6 rounded-full font-bold">
            <Link to="/partners">Partner with us <ArrowRight className="size-4" /></Link>
          </Button>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t bg-soft-blue">
        <div className="mx-auto grid max-w-content gap-10 px-4 py-16 sm:px-6 md:grid-cols-[0.8fr_1.2fr] md:py-20">
          <SectionHeading eyebrow="Help" title="Frequently asked questions" description="Can't find an answer? Our team is happy to help." />
          <Accordion type="single" collapsible className="rounded-2xl border bg-card px-5">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base font-semibold">{f.q}</AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  )
}

function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description?: string
  action?: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-xs font-bold tracking-[0.2em] text-secondary uppercase">{eyebrow}</p>
        <h2 className="mt-2 text-3xl leading-tight font-semibold text-primary sm:text-4xl">{title}</h2>
        {description && <p className="mt-3 max-w-xl text-muted-foreground">{description}</p>}
      </div>
      {action}
    </div>
  )
}
