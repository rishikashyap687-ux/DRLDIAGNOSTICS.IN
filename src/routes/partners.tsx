import { Link, createFileRoute } from '@tanstack/react-router'
import { Briefcase, Building2, ClipboardList, Hospital, Stethoscope, Truck } from 'lucide-react'

import { EnquiryForm } from '@/components/site/EnquiryForm'
import { PageHeader } from '@/components/site/PageHeader'
import { Field, controlClass } from '@/components/site/fields'
import { categories, tests } from '@/data/catalogue'
import { img } from '@/lib/img'
import { seo } from '@/lib/seo'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/partners')({
  head: () =>
    seo({
      title: 'Doctor, Hospital & Corporate Partnerships',
      description:
        'Partner with DRL DIAGNOSTICS for pathology services, sample collection coordination, institutional testing and corporate health checkups in Delhi and across India.',
      path: '/partners',
      image: '/img/microscope.png',
    }),
  component: PartnersPage,
})

const offers = [
  { icon: Stethoscope, title: 'Doctors & clinics', text: 'Refer patients for pathology investigations with coordinated sample collection.' },
  { icon: Hospital, title: 'Hospitals & nursing homes', text: 'Institutional testing support and sample pickup coordination.' },
  { icon: Briefcase, title: 'Corporate health checkups', text: 'Preventive health checkup camps and packages for your employees.' },
  { icon: Truck, title: 'Sample collection coordination', text: 'Scheduled pickups and home collection for your patients.' },
  { icon: ClipboardList, title: 'Full test catalogue', text: `${tests.length}+ investigations across ${categories.length} categories.` },
  { icon: Building2, title: 'Institutional services', text: 'Tell us your requirements and we will design a workflow with you.' },
]

const partnershipTypes = ['Doctor / clinic referral', 'Hospital / nursing home', 'Corporate health checkup', 'Collection partner', 'Institutional services', 'Other']

function PartnersPage() {
  return (
    <>
      <PageHeader
        crumb="Doctor Partnerships"
        eyebrow="For healthcare professionals & organisations"
        title="Partner with DRL DIAGNOSTICS"
        description="We work with doctors, clinics, hospitals, corporate organisations and healthcare partners to make dependable pathology testing simple for their patients and teams."
      />
      <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offers.map(({ icon: Icon, title, text }) => (
            <li key={title} className="rounded-2xl border bg-card p-5">
              <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground"><Icon className="size-5" aria-hidden /></span>
              <p className="mt-4 font-bold">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">{text}</p>
            </li>
          ))}
        </ul>

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <h2 className="text-3xl font-semibold text-primary">Partnership registration</h2>
            <p className="mt-3 text-muted-foreground">
              Share a few details and our partnerships team will contact you. You can also{' '}
              <Link to="/tests" className="font-semibold text-primary hover:underline">browse the test catalogue</Link>.
            </p>
            <img src={img('/img/microscope.png', 700)} alt="Pathologist examining a slide under a microscope" loading="lazy" className="mt-6 aspect-[4/3] w-full rounded-3xl object-cover" />
          </div>
          <EnquiryForm name="partnership-enquiry" submitLabel="Submit partnership enquiry" successTitle="Thank you for your interest">
            <Field label="Organisation name">{(id) => <input id={id} name="organization" required maxLength={150} autoComplete="organization" className={controlClass} />}</Field>
            <Field label="Contact person’s name">{(id) => <input id={id} name="contact-name" required maxLength={100} autoComplete="name" className={controlClass} />}</Field>
            <Field label="Professional role">{(id) => <input id={id} name="role" required maxLength={100} placeholder="e.g. Physician, HR manager" autoComplete="organization-title" className={controlClass} />}</Field>
            <Field label="Mobile number">{(id) => <input id={id} name="mobile" type="tel" inputMode="numeric" required pattern="[6-9][0-9]{9}" maxLength={10} autoComplete="tel-national" className={controlClass} />}</Field>
            <Field label="Email address">{(id) => <input id={id} name="email" type="email" required maxLength={254} autoComplete="email" className={controlClass} />}</Field>
            <Field label="City">{(id) => <input id={id} name="city" required maxLength={80} autoComplete="address-level2" className={controlClass} />}</Field>
            <Field label="Type of partnership" className="sm:col-span-2">
              {(id) => (
                <select id={id} name="partnership-type" required defaultValue="" className={controlClass}>
                  <option value="" disabled>Select a partnership type</option>
                  {partnershipTypes.map((t) => <option key={t}>{t}</option>)}
                </select>
              )}
            </Field>
            <Field label="Enquiry details" className="sm:col-span-2">
              {(id) => <textarea id={id} name="details" required rows={4} maxLength={2000} className={cn(controlClass, 'h-auto py-2.5')} />}
            </Field>
          </EnquiryForm>
        </div>
      </div>
    </>
  )
}
