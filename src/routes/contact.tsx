import { createFileRoute } from '@tanstack/react-router'
import { Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react'

import { EnquiryForm } from '@/components/site/EnquiryForm'
import { PageHeader } from '@/components/site/PageHeader'
import { WhatsAppGlyph } from '@/components/site/SupportFab'
import { Field, controlClass } from '@/components/site/fields'
import { Button } from '@/components/ui/button'
import { formatPhone, fullAddress, mapsDirectionsUrl, mapsEmbedUrl, site, telLink, whatsappLink } from '@/data/site'
import { serviceAreas } from '@/data/service-areas'
import { seo } from '@/lib/seo'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/contact')({
  head: () =>
    seo({
      title: 'Contact & Location — Pathology Lab in Sabapur, North East Delhi',
      description: `Visit or contact DRL DIAGNOSTICS, pathology and blood test laboratory at ${fullAddress}. Get directions, call, WhatsApp or send an enquiry.`,
      path: '/contact',
    }),
  component: ContactPage,
})

function ContactPage() {
  const tel = telLink()
  const wa = whatsappLink('general')
  return (
    <>
      <PageHeader crumb="Contact Us" eyebrow="Contact & location" title="We’re here to help" description="Visit our laboratory in Sabapur, North East Delhi, or send us a message." />
      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:px-6 lg:grid-cols-2">
        <div className="grid content-start gap-5">
          <div className="rounded-3xl border bg-card p-6">
            <h2 className="text-2xl font-semibold text-primary">{site.name}</h2>
            <address className="mt-4 grid gap-4 not-italic">
              <p className="flex gap-3">
                <MapPin className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden />
                <span>
                  {site.address.line1},<br />
                  {site.address.locality}, {site.address.city} - {site.address.postalCode}, {site.address.country}.
                  {site.address.landmarkVerified && (
                    <span className="mt-1 block text-sm text-muted-foreground">Landmark: {site.address.landmark}</span>
                  )}
                </span>
              </p>
              <ContactRow icon={Phone} label="Phone" value={site.phone ? formatPhone(site.phone) : null} href={tel} />
              <ContactRow icon={Mail} label="Email" value={site.email} href={site.email ? `mailto:${site.email}` : null} />
              <ContactRow icon={Clock} label="Opening hours" value={site.openingHours} />
            </address>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button asChild className="rounded-full font-bold">
                <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer"><Navigation className="size-4" /> Get Directions</a>
              </Button>
              {tel && <Button asChild variant="outline" className="rounded-full font-bold"><a href={tel}><Phone className="size-4" /> Call Now</a></Button>}
              {wa && (
                <Button asChild className="rounded-full bg-whatsapp font-bold text-white hover:bg-whatsapp/90">
                  <a href={wa} target="_blank" rel="noopener noreferrer"><WhatsAppGlyph className="size-4" /> WhatsApp</a>
                </Button>
              )}
            </div>
          </div>
          <div className="overflow-hidden rounded-3xl border">
            <iframe title={`Map showing ${site.name}`} src={mapsEmbedUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="aspect-[4/3] w-full border-0" />
          </div>
          <div className="rounded-2xl bg-accent/60 p-5 text-sm">
            <p className="font-bold text-primary">Service area</p>
            <p className="mt-1 text-muted-foreground">
              Laboratory visits at Sabapur, North East Delhi. Free home collection currently covers {serviceAreas.length} PIN codes
              in Delhi NCR and is expanding across India — check your PIN on the Free Home Collection page.
            </p>
          </div>
        </div>

        <div>
          <h2 className="mb-4 text-2xl font-semibold text-primary">Send us a message</h2>
          <EnquiryForm name="contact" submitLabel="Send message" successTitle="Message received">
            <Field label="Your name">{(id) => <input id={id} name="name" required maxLength={100} autoComplete="name" className={controlClass} />}</Field>
            <Field label="Mobile number">{(id) => <input id={id} name="mobile" type="tel" inputMode="numeric" required pattern="[6-9][0-9]{9}" maxLength={10} autoComplete="tel-national" className={controlClass} />}</Field>
            <Field label="Email address" optional className="sm:col-span-2">{(id) => <input id={id} name="email" type="email" maxLength={254} autoComplete="email" className={controlClass} />}</Field>
            <Field label="Topic" className="sm:col-span-2">
              {(id) => (
                <select id={id} name="topic" required defaultValue="" className={controlClass}>
                  <option value="" disabled>Select a topic</option>
                  {['Test prices', 'Booking status', 'Reports', 'Home collection', 'Feedback', 'Other'].map((t) => <option key={t}>{t}</option>)}
                </select>
              )}
            </Field>
            <Field label="Message" className="sm:col-span-2">{(id) => <textarea id={id} name="message" required rows={5} maxLength={2000} className={cn(controlClass, 'h-auto py-2.5')} />}</Field>
          </EnquiryForm>
        </div>
      </div>
    </>
  )
}

function ContactRow({ icon: Icon, label, value, href }: { icon: typeof Phone; label: string; value: string | null; href?: string | null }) {
  return (
    <p className="flex gap-3">
      <Icon className="mt-0.5 size-5 shrink-0 text-secondary" aria-hidden />
      <span>
        <span className="block text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</span>
        {value ? (href ? <a href={href} className="font-semibold hover:text-primary">{value}</a> : <span className="font-semibold">{value}</span>) : <span className="text-muted-foreground">To be published shortly</span>}
      </span>
    </p>
  )
}
