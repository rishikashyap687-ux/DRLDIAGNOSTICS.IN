import { Link } from '@tanstack/react-router'
import { CircleCheck, Loader2, MapPin, SearchCheck, TriangleAlert, X } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { tests } from '@/data/catalogue'
import { findServiceArea, indianStates, type ServiceArea } from '@/data/service-areas'
import { site, whatsappLink } from '@/data/site'
import { useCart } from '@/lib/cart'
import { bookingReference, formDataToFields, indianMobile, pinCode, submitNetlifyForm } from '@/lib/netlify-form'
import { cn } from '@/lib/utils'

import { WhatsAppGlyph } from './SupportFab'
import { Field, Honeypot, controlClass, todayISO } from './fields'

type Availability = { state: 'unchecked' } | { state: 'available'; area: ServiceArea } | { state: 'unavailable' }
type Status = 'idle' | 'pending' | 'error'

const quickTests = tests.filter((t) => t.popular && t.homeCollection).slice(0, 10)

export function HomeCollectionForm({ className }: { className?: string }) {
  const cart = useCart()
  const [pin, setPin] = useState('')
  const [availability, setAvailability] = useState<Availability>({ state: 'unchecked' })
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<{ reference: string; kind: 'booking' | 'enquiry'; name: string } | null>(null)

  function check(value = pin): Availability {
    if (!pinCode.test(value)) {
      setError('Enter a valid 6-digit PIN code to check availability.')
      return { state: 'unchecked' }
    }
    setError(null)
    const area = findServiceArea(value)
    const result: Availability = area ? { state: 'available', area } : { state: 'unavailable' }
    setAvailability(result)
    return result
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'pending') return
    const form = event.currentTarget
    const fields = formDataToFields(form)

    if (!indianMobile.test(fields.mobile)) return setError('Enter a valid 10-digit Indian mobile number.')
    const result = availability.state === 'unchecked' ? check(fields.pin) : availability
    if (result.state === 'unchecked') return
    const selected = cart.items.map((i) => i.name)
    if (selected.length === 0 && !fields['other-tests']) {
      return setError('Choose at least one test, or describe the tests your doctor has prescribed.')
    }

    const kind = result.state === 'available' ? 'booking' : 'enquiry'
    const reference = bookingReference(kind === 'booking' ? 'DRL' : 'ENQ')
    setStatus('pending')
    setError(null)
    try {
      await submitNetlifyForm('home-collection', {
        ...fields,
        reference,
        'request-type': kind === 'booking' ? 'Free home collection booking' : 'Service availability enquiry',
        tests: [...selected, fields['other-tests']].filter(Boolean).join('; '),
        status: kind === 'booking' ? 'Booking Received — Awaiting Confirmation' : 'Service enquiry received',
        'collection-fee': kind === 'booking' ? '₹0' : 'Not yet serviceable',
      })
      setDone({ reference, kind, name: fields.name })
      cart.clear()
      form.reset()
      setPin('')
      setAvailability({ state: 'unchecked' })
      setStatus('idle')
    } catch {
      setStatus('error')
      setError('We could not confirm that your request was received. Your details are still here — please try again in a moment.')
    }
  }

  if (done) return <Confirmation {...done} onReset={() => setDone(null)} className={className} />

  const slots = availability.state === 'available' ? availability.area.slots : []
  const whatsapp = whatsappLink('home-collection')

  return (
    <form
      name="home-collection"
      method="POST"
      action="/__forms.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      className={cn('rounded-3xl border bg-card p-5 shadow-xl shadow-primary/5 sm:p-8', className)}
    >
      <input type="hidden" name="form-name" value="home-collection" />
      <Honeypot />

      <fieldset disabled={status === 'pending'} className="grid gap-6">
        <legend className="sr-only">Free home sample collection request</legend>

        {/* Step 1 — location */}
        <div className="grid gap-3 rounded-2xl bg-accent/60 p-4 sm:p-5">
          <p className="flex items-center gap-2 text-sm font-bold text-primary">
            <span className="grid size-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground">1</span>
            Check your location
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="hc-pin" className="sr-only">PIN code</label>
            <input
              id="hc-pin"
              name="pin"
              inputMode="numeric"
              autoComplete="postal-code"
              maxLength={6}
              required
              pattern="[1-9][0-9]{5}"
              placeholder="Enter 6-digit PIN code"
              value={pin}
              onChange={(e) => {
                setPin(e.target.value.replace(/\D/g, ''))
                setAvailability({ state: 'unchecked' })
              }}
              className={cn(controlClass, 'sm:max-w-56')}
            />
            <Button type="button" variant="outline" className="h-11 rounded-xl font-bold" onClick={() => check()}>
              <SearchCheck className="size-4" /> Check Service Availability
            </Button>
          </div>
          {availability.state === 'available' && (
            <p role="status" className="flex items-start gap-2 text-sm text-foreground">
              <CircleCheck className="mt-0.5 size-4 shrink-0 text-secondary" aria-hidden />
              <span>
                <strong>Great news — free home collection is available</strong> in {availability.area.area},{' '}
                {availability.area.city}. Collection fee: <strong className="text-secondary">₹{site.homeCollectionFee}</strong>.
              </span>
            </p>
          )}
          {availability.state === 'unavailable' && (
            <p role="status" className="flex items-start gap-2 text-sm text-foreground">
              <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden />
              <span>
                <strong>We are not yet collecting at PIN {pin}.</strong> We are expanding across India — send a service
                enquiry below and our team will tell you when and how we can collect. Nothing is confirmed or charged.
              </span>
            </p>
          )}
        </div>

        {/* Step 2 — patient */}
        <div className="grid gap-4">
          <p className="flex items-center gap-2 text-sm font-bold text-primary">
            <span className="grid size-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground">2</span>
            Patient & address
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Patient full name">
              {(id) => <input id={id} name="name" required maxLength={100} autoComplete="name" className={controlClass} />}
            </Field>
            <Field label="Mobile number" hint="10-digit number for confirmation calls">
              {(id) => (
                <input id={id} name="mobile" type="tel" inputMode="numeric" required pattern="[6-9][0-9]{9}" maxLength={10} autoComplete="tel-national" className={controlClass} />
              )}
            </Field>
            <Field label="Email address" optional className="sm:col-span-2">
              {(id) => <input id={id} name="email" type="email" maxLength={254} autoComplete="email" className={controlClass} />}
            </Field>
            <Field label="Complete home address" className="sm:col-span-2">
              {(id) => (
                <textarea id={id} name="address" required rows={2} maxLength={400} autoComplete="street-address" className={cn(controlClass, 'h-auto py-2.5')} />
              )}
            </Field>
            <Field label="City">
              {(id) => <input id={id} name="city" required maxLength={80} autoComplete="address-level2" className={controlClass} />}
            </Field>
            <Field label="State">
              {(id) => (
                <select id={id} name="state" required defaultValue="Delhi" className={controlClass}>
                  {indianStates.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              )}
            </Field>
          </div>
        </div>

        {/* Step 3 — tests and slot */}
        <div className="grid gap-4">
          <p className="flex items-center gap-2 text-sm font-bold text-primary">
            <span className="grid size-6 place-items-center rounded-full bg-primary text-xs text-primary-foreground">3</span>
            Tests & preferred time
          </p>
          <div>
            <p className="text-sm font-semibold">Required blood tests</p>
            {cart.items.length > 0 && (
              <ul className="mt-2 flex flex-wrap gap-2">
                {cart.items.map((item) => (
                  <li key={`${item.kind}-${item.slug}`}>
                    <button
                      type="button"
                      onClick={() => cart.remove(item)}
                      className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"
                      aria-label={`Remove ${item.name}`}
                    >
                      {item.name} <X className="size-3" aria-hidden />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-xs text-muted-foreground">Quick add:</p>
            <ul className="mt-1.5 flex flex-wrap gap-2">
              {quickTests
                .filter((t) => !cart.has({ kind: 'test', slug: t.slug }))
                .map((t) => (
                  <li key={t.slug}>
                    <button
                      type="button"
                      onClick={() => cart.add({ kind: 'test', slug: t.slug })}
                      className="rounded-full border bg-background px-3 py-1.5 text-xs font-semibold text-foreground/80 hover:border-primary hover:text-primary"
                    >
                      + {t.aka?.split(',')[0] ?? t.name}
                    </button>
                  </li>
                ))}
            </ul>
            <p className="mt-2 text-xs text-muted-foreground">
              Need something else? <Link to="/tests" className="font-semibold text-primary underline-offset-2 hover:underline">Browse all tests</Link> or{' '}
              <Link to="/packages" className="font-semibold text-primary underline-offset-2 hover:underline">health packages</Link>.
            </p>
          </div>
          <Field label="Other tests or doctor's prescription" optional>
            {(id) => (
              <input id={id} name="other-tests" maxLength={300} placeholder="e.g. tests written on your prescription" className={controlClass} />
            )}
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Preferred collection date">
              {(id) => <input id={id} name="date" type="date" required min={todayISO()} max={todayISO(60)} className={controlClass} />}
            </Field>
            <Field
              label="Preferred collection time"
              hint={availability.state === 'available' ? undefined : 'Check your PIN code to see available slots'}
            >
              {(id) => (
                <select id={id} name="time" required={availability.state === 'available'} className={controlClass} defaultValue="">
                  <option value="" disabled>
                    {availability.state === 'available' ? 'Select a time slot' : 'Any time / to be arranged'}
                  </option>
                  {slots.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              )}
            </Field>
          </div>
          <Field label="Special collection instructions" optional>
            {(id) => (
              <textarea id={id} name="instructions" rows={2} maxLength={500} placeholder="Floor, gate number, elderly patient, preferred language…" className={cn(controlClass, 'h-auto py-2.5')} />
            )}
          </Field>
        </div>

        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <input type="checkbox" name="consent" value="yes" required className="mt-0.5 size-4 accent-[var(--primary)]" />
          <span>
            I agree to the{' '}
            <Link to="/legal/$slug" params={{ slug: 'patient-consent' }} className="font-semibold text-primary hover:underline">patient consent</Link>{' '}
            and{' '}
            <Link to="/legal/$slug" params={{ slug: 'privacy-policy' }} className="font-semibold text-primary hover:underline">privacy policy</Link>, and to be
            contacted about this request.
          </span>
        </label>

        {error && (
          <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
            {error}
          </p>
        )}

        <div className="flex flex-col gap-3 sm:flex-row">
          <Button type="submit" size="lg" className="h-13 flex-1 rounded-full text-base font-bold shadow-lg shadow-primary/20">
            {status === 'pending' && <Loader2 className="size-4 animate-spin" />}
            {availability.state === 'unavailable' ? 'Send Service Enquiry' : 'Book Free Collection'}
          </Button>
          {whatsapp && (
            <Button asChild size="lg" variant="outline" className="h-13 rounded-full border-whatsapp text-base font-bold text-whatsapp hover:text-whatsapp">
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                <WhatsAppGlyph className="size-5" /> Book on WhatsApp
              </a>
            </Button>
          )}
        </div>
        <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5" aria-hidden />
          Collection fee is ₹0 wherever free collection is available. No hidden charges. Bookings are confirmed by our team.
        </p>
      </fieldset>
    </form>
  )
}

function Confirmation({
  reference,
  kind,
  name,
  onReset,
  className,
}: {
  reference: string
  kind: 'booking' | 'enquiry'
  name: string
  onReset: () => void
  className?: string
}) {
  const whatsapp = whatsappLink('booking-status', reference)
  return (
    <div role="status" className={cn('rounded-3xl border bg-card p-6 text-center shadow-xl shadow-primary/5 sm:p-10', className)}>
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-secondary/10 text-secondary">
        <CircleCheck className="size-9" />
      </span>
      <h3 className="mt-4 text-2xl font-semibold text-primary">
        {kind === 'booking' ? 'Your collection request is received' : 'Your service enquiry is received'}
      </h3>
      <p className="mt-2 text-muted-foreground">Thank you, {name.split(' ')[0]}. Please keep this reference:</p>
      <p className="mx-auto mt-4 inline-block rounded-2xl border-2 border-dashed border-primary/40 bg-accent px-6 py-3 font-mono text-2xl font-bold tracking-wider text-primary">
        {reference}
      </p>
      <ol className="mx-auto mt-6 grid max-w-md gap-2 text-left text-sm">
        <li className="flex gap-2"><CircleCheck className="size-4 shrink-0 text-secondary" /> {kind === 'booking' ? 'Booking Received' : 'Enquiry Received'}</li>
        <li className="flex gap-2 text-muted-foreground"><span className="size-4 shrink-0 rounded-full border-2" /> {kind === 'booking' ? 'Awaiting confirmation — our team calls you to confirm the slot' : 'Our team checks how we can serve your location'}</li>
        <li className="flex gap-2 text-muted-foreground"><span className="size-4 shrink-0 rounded-full border-2" /> {kind === 'booking' ? 'Phlebotomist assigned and sample collected at home (₹0 collection fee)' : 'We contact you with the options available'}</li>
      </ol>
      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <Button onClick={onReset} variant="outline" className="rounded-full font-bold">Make another request</Button>
        {whatsapp && (
          <Button asChild className="rounded-full bg-whatsapp font-bold text-white hover:bg-whatsapp/90">
            <a href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppGlyph className="size-4" /> Share on WhatsApp</a>
          </Button>
        )}
      </div>
    </div>
  )
}
