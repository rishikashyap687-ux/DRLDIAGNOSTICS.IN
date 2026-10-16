import { createFileRoute } from '@tanstack/react-router'
import { BadgeIndianRupee, CalendarClock, MapPinned, ShieldCheck } from 'lucide-react'

import { HomeCollectionForm } from '@/components/site/HomeCollectionForm'
import { PageHeader } from '@/components/site/PageHeader'
import { serviceAreas } from '@/data/service-areas'
import { img, imgSrcSet } from '@/lib/img'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/home-collection')({
  head: () =>
    seo({
      title: 'Free Home Blood Sample Collection in Delhi & Across India',
      description:
        'Book free home blood sample collection with DRL DIAGNOSTICS. ₹0 collection fee wherever available. Check your PIN code, choose a time slot and get a booking reference instantly.',
      path: '/home-collection',
      image: '/img/home-collection.png',
    }),
  component: HomeCollectionPage,
})

const points = [
  { icon: BadgeIndianRupee, title: '₹0 collection fee', text: 'Free wherever home collection is available. No hidden charges.' },
  { icon: CalendarClock, title: 'Choose your slot', text: 'Early-morning slots for fasting tests.' },
  { icon: ShieldCheck, title: 'Safe & hygienic', text: 'Sterile, single-use collection materials.' },
  { icon: MapPinned, title: 'Growing across India', text: 'Not covered yet? Send an enquiry and we will get back to you.' },
]

function HomeCollectionPage() {
  const cities = [...new Set(serviceAreas.map((a) => `${a.city}, ${a.state}`))]
  return (
    <>
      <PageHeader
        crumb="Free Home Collection"
        eyebrow="Free home sample collection across India"
        title="Your Health. Your Home. Our Care."
        description="Book your pathology tests from the comfort of your home. DRL DIAGNOSTICS offers free home sample collection across India, subject to service availability and confirmation for your location."
      />
      <div className="mx-auto grid max-w-content gap-10 px-4 py-10 sm:px-6 lg:grid-cols-[1.15fr_0.85fr]">
        <HomeCollectionForm />
        <aside className="grid content-start gap-5">
          <img
            src={img('/img/home-collection.png', 700)}
            srcSet={imgSrcSet('/img/home-collection.png', [480, 700, 1000])}
            sizes="(min-width: 1024px) 420px, 100vw"
            alt="Phlebotomist collecting a blood sample from a patient at home"
            width={1200}
            height={896}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-xl"
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {points.map(({ icon: Icon, title, text }) => (
              <li key={title} className="flex gap-3 rounded-2xl border bg-card p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary/10 text-secondary"><Icon className="size-5" aria-hidden /></span>
                <span>
                  <span className="block font-bold">{title}</span>
                  <span className="block text-sm text-muted-foreground">{text}</span>
                </span>
              </li>
            ))}
          </ul>
          <div className="rounded-2xl bg-accent/60 p-5">
            <p className="text-sm font-bold text-primary">Currently collecting in</p>
            <p className="mt-1 text-sm text-muted-foreground">{cities.join(' · ')} — {serviceAreas.length} PIN codes, with more being added.</p>
          </div>
        </aside>
      </div>
    </>
  )
}
