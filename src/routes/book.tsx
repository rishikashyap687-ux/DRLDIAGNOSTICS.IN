import { Link, createFileRoute } from '@tanstack/react-router'
import { Building2, CircleCheck, House, Loader2, ShoppingBag, Trash2, TriangleAlert } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { Field, Honeypot, controlClass, todayISO } from '@/components/site/fields'
import { IndicativeTag } from '@/components/site/Price'
import { TestSearch } from '@/components/site/TestSearch'
import { WhatsAppGlyph } from '@/components/site/SupportFab'
import { Button } from '@/components/ui/button'
import { formatINR } from '@/data/catalogue'
import { allSlots, findServiceArea } from '@/data/service-areas'
import { fullAddress, site, whatsappLink } from '@/data/site'
import { useCart } from '@/lib/cart'
import { bookingReference, formDataToFields, indianMobile, pinCode, submitNetlifyForm } from '@/lib/netlify-form'
import { img } from '@/lib/img'
import { seo } from '@/lib/seo'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/book')({
  head: () =>
    seo({
      title: 'Book a Blood Test Online',
      description:
        'Book blood tests and health packages online with DRL DIAGNOSTICS. Choose free home sample collection or a laboratory visit in Sabapur, North East Delhi, and pick a convenient time.',
      path: '/book',
    }),
  component: BookPage,
})

type Method = 'home' | 'lab'

function BookPage() {
  const cart = useCart()
  const [method, setMethod] = useState<Method>('home')
  const [pin, setPin] = useState('')
  const [status, setStatus] = useState<'idle' | 'pending' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [done, setDone] = useState<{ reference: string; name: string; method: Method; items: string[]; total: number } | null>(null)

  const area = method === 'home' && pinCode.test(pin) ? findServiceArea(pin) : undefined
  const pinUnserviceable = method === 'home' && pinCode.test(pin) && !area

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'pending') return
    const form = event.currentTarget
    const fields = formDataToFields(form)
    if (cart.items.length === 0) return setError('Add at least one test or package to your booking.')
    if (!indianMobile.test(fields.mobile)) return setError('Enter a valid 10-digit Indian mobile number.')
    if (method === 'home' && !pinCode.test(fields.pin)) return setError('Enter a valid 6-digit PIN code.')

    const reference = bookingReference()
    const items = cart.items.map((i) => i.name)
    setStatus('pending')
    setError(null)
    try {
      await submitNetlifyForm('test-booking', {
        ...fields,
        reference,
        method: method === 'home' ? 'Home sample collection' : 'Laboratory visit',
        tests: items.join('; '),
        'estimated-total': formatINR(cart.total) + (site.pricesVerified ? '' : ' (indicative)'),
        serviceable: method === 'home' ? (area ? `Yes — ${area.area}` : 'No — check before confirming') : 'n/a',
        status: 'Booking Received — Awaiting Confirmation',
      })
      setDone({ reference, name: fields.name, method, items, total: cart.total })
      cart.clear()
      setStatus('idle')
    } catch {
      setStatus('error')
      setError('We could not confirm that your booking was received. Your details are still here — please try again.')
    }
  }

  if (done) return <BookingDone {...done} />

  return (
    <div className="bg-soft-blue">
      <div className="mx-auto max-w-content px-4 py-10 sm:px-6 md:py-14">
        <p className="text-xs font-bold tracking-[0.2em] text-secondary uppercase">Online test booking</p>
        <h1 className="mt-2 text-3xl font-semibold text-primary sm:text-4xl">Book a test</h1>
        <p className="mt-2 max-w-reading text-muted-foreground">
          Select your tests, choose home collection or a lab visit, and pick a time. Our team confirms every booking
          before collection.
        </p>

        <form
          name="test-booking"
          method="POST"
          action="/__forms.html"
          data-netlify="true"
          netlify-honeypot="bot-field"
          onSubmit={submit}
          className="mt-8 grid gap-6 lg:grid-cols-[1fr_380px]"
        >
          <input type="hidden" name="form-name" value="test-booking" />
          <Honeypot />

          <fieldset disabled={status === 'pending'} className="grid min-w-0 gap-6">
            <legend className="sr-only">Booking details</legend>

            <Step n={1} title="Selected tests">
              <TestSearch compact />
              {cart.items.length === 0 ? (
                <div className="mt-4 rounded-2xl border border-dashed p-6 text-center text-sm text-muted-foreground">
                  <ShoppingBag className="mx-auto size-8 opacity-60" aria-hidden />
                  <p className="mt-2">Your booking is empty. Search above, or browse{' '}
                    <Link to="/tests" className="font-semibold text-primary hover:underline">tests</Link> and{' '}
                    <Link to="/packages" className="font-semibold text-primary hover:underline">packages</Link>.
                  </p>
                </div>
              ) : (
                <ul className="mt-4 divide-y rounded-2xl border">
                  {cart.items.map((item) => (
                    <li key={`${item.kind}-${item.slug}`} className="flex items-center gap-3 px-4 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">{item.name}</p>
                        <p className="text-xs text-muted-foreground">{item.kind === 'package' ? 'Health package' : 'Test'}</p>
                      </div>
                      <span className="font-bold tabular-nums">{item.price === null ? 'On request' : formatINR(item.price)}</span>
                      <Button type="button" variant="ghost" size="icon-sm" aria-label={`Remove ${item.name}`} onClick={() => cart.remove(item)}>
                        <Trash2 className="size-4" />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </Step>

            <Step n={2} title="Collection method">
              <div role="radiogroup" aria-label="Collection method" className="grid gap-3 sm:grid-cols-2">
                {([
                  ['home', House, 'Free home collection', '₹0 collection fee where available'],
                  ['lab', Building2, 'Visit the laboratory', 'Sabapur, North East Delhi'],
                ] as const).map(([value, Icon, title, sub]) => (
                  <label
                    key={value}
                    className={cn(
                      'flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition-colors motion-reduce:transition-none',
                      method === value ? 'border-primary bg-accent/60' : 'border-border hover:border-primary/40',
                    )}
                  >
                    <input type="radio" name="collection" value={value} checked={method === value} onChange={() => setMethod(value)} className="sr-only" />
                    <Icon className={cn('size-6 shrink-0', method === value ? 'text-primary' : 'text-muted-foreground')} aria-hidden />
                    <span>
                      <span className="block font-bold">{title}</span>
                      <span className="block text-sm text-muted-foreground">{sub}</span>
                    </span>
                  </label>
                ))}
              </div>
              {method === 'lab' && (
                <p className="mt-3 text-sm text-muted-foreground">Laboratory address: {fullAddress}</p>
              )}
            </Step>

            <Step n={3} title="Patient information">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full name">
                  {(id) => <input id={id} name="name" required maxLength={100} autoComplete="name" className={controlClass} />}
                </Field>
                <Field label="Mobile number">
                  {(id) => <input id={id} name="mobile" type="tel" inputMode="numeric" required pattern="[6-9][0-9]{9}" maxLength={10} autoComplete="tel-national" className={controlClass} />}
                </Field>
                <Field label="Email address" optional>
                  {(id) => <input id={id} name="email" type="email" maxLength={254} autoComplete="email" className={controlClass} />}
                </Field>
                <div className="grid grid-cols-2 gap-4">
                  <Field label="Age" hint="Needed for reference ranges">
                    {(id) => <input id={id} name="age" type="number" min={0} max={120} required className={controlClass} />}
                  </Field>
                  <Field label="Gender">
                    {(id) => (
                      <select id={id} name="gender" required defaultValue="" className={controlClass}>
                        <option value="" disabled>Select</option>
                        <option>Female</option>
                        <option>Male</option>
                        <option>Other</option>
                      </select>
                    )}
                  </Field>
                </div>

                {method === 'home' && (
                  <>
                    <Field label="Address" className="sm:col-span-2">
                      {(id) => <textarea id={id} name="address" required rows={2} maxLength={400} autoComplete="street-address" className={cn(controlClass, 'h-auto py-2.5')} />}
                    </Field>
                    <Field label="City">
                      {(id) => <input id={id} name="city" required maxLength={80} autoComplete="address-level2" className={controlClass} />}
                    </Field>
                    <Field label="PIN code">
                      {(id) => (
                        <input id={id} name="pin" required inputMode="numeric" maxLength={6} pattern="[1-9][0-9]{5}" autoComplete="postal-code" value={pin} onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} className={controlClass} />
                      )}
                    </Field>
                    {area && (
                      <p role="status" className="flex items-center gap-2 text-sm sm:col-span-2">
                        <CircleCheck className="size-4 text-secondary" aria-hidden /> Free home collection is available in {area.area}. Collection fee ₹0.
                      </p>
                    )}
                    {pinUnserviceable && (
                      <p role="status" className="flex items-start gap-2 text-sm sm:col-span-2">
                        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-amber-600" aria-hidden />
                        We don’t collect at this PIN code yet. You can still submit — our team will check what’s possible and
                        call you before anything is confirmed. Or choose a laboratory visit.
                      </p>
                    )}
                  </>
                )}
              </div>
            </Step>

            <Step n={4} title="Date & time">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Preferred date">
                  {(id) => <input id={id} name="date" type="date" required min={todayISO()} max={todayISO(60)} className={controlClass} />}
                </Field>
                <Field label="Preferred time">
                  {(id) => (
                    <select id={id} name="time" required defaultValue="" className={controlClass}>
                      <option value="" disabled>Select a time slot</option>
                      {(area?.slots ?? allSlots).map((s) => <option key={s}>{s}</option>)}
                    </select>
                  )}
                </Field>
                <Field label="Additional instructions" optional className="sm:col-span-2">
                  {(id) => <textarea id={id} name="instructions" rows={2} maxLength={500} placeholder="Doctor’s name, prescription notes, accessibility needs…" className={cn(controlClass, 'h-auto py-2.5')} />}
                </Field>
              </div>
            </Step>
          </fieldset>

          <aside className="lg:sticky lg:top-32 lg:self-start">
            <div className="rounded-3xl border bg-card p-6 shadow-xl shadow-primary/5">
              <h2 className="font-sans text-lg font-bold">Booking summary</h2>
              <dl className="mt-4 grid gap-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Tests & packages</dt><dd className="font-semibold">{cart.count}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Tests subtotal</dt><dd className="font-semibold tabular-nums">{formatINR(cart.total)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Home collection fee</dt><dd className="font-semibold text-secondary">{method === 'home' ? '₹0' : '—'}</dd></div>
                <div className="mt-2 flex items-baseline justify-between border-t pt-3">
                  <dt className="font-bold">Estimated total</dt>
                  <dd className="flex items-baseline gap-1.5 text-2xl font-extrabold text-primary tabular-nums">{formatINR(cart.total)} {!site.pricesVerified && <IndicativeTag />}</dd>
                </div>
              </dl>
              <p className="mt-3 text-xs text-muted-foreground">Pay at collection or at the lab after our team confirms the final amount.</p>

              <label className="mt-5 flex items-start gap-3 text-xs text-muted-foreground">
                <input type="checkbox" name="consent" value="yes" required className="mt-0.5 size-4 accent-[var(--primary)]" />
                <span>I agree to the <Link to="/legal/$slug" params={{ slug: 'patient-consent' }} className="font-semibold text-primary hover:underline">patient consent</Link>, <Link to="/legal/$slug" params={{ slug: 'terms-and-conditions' }} className="font-semibold text-primary hover:underline">terms</Link> and <Link to="/legal/$slug" params={{ slug: 'privacy-policy' }} className="font-semibold text-primary hover:underline">privacy policy</Link>.</span>
              </label>

              {error && <p role="alert" className="mt-4 rounded-xl border border-destructive/30 bg-destructive/5 px-3 py-2.5 text-sm text-destructive">{error}</p>}

              <Button type="submit" size="lg" disabled={status === 'pending'} className="mt-5 h-12 w-full rounded-full text-base font-bold shadow-lg shadow-primary/20">
                {status === 'pending' && <Loader2 className="size-4 animate-spin" />} Submit booking
              </Button>
            </div>
            <img src={img('/img/lab-analyzer.png', 760)} alt="Blood sample tubes being loaded into a diagnostic analyser" loading="lazy" className="mt-5 hidden aspect-[16/10] w-full rounded-3xl object-cover lg:block" />
          </aside>
        </form>
      </div>
    </div>
  )
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border bg-card p-5 sm:p-6">
      <h2 className="mb-4 flex items-center gap-2.5 font-sans text-lg font-bold">
        <span className="grid size-7 place-items-center rounded-full bg-primary text-sm text-primary-foreground">{n}</span>
        {title}
      </h2>
      {children}
    </section>
  )
}

const timeline = [
  'Booking Received',
  'Awaiting Confirmation',
  'Confirmed',
  'Phlebotomist Assigned',
  'Sample Collected',
  'Processing',
  'Report Ready',
]

function BookingDone({ reference, name, method, items, total }: { reference: string; name: string; method: Method; items: string[]; total: number }) {
  const whatsapp = whatsappLink('booking-status', reference)
  return (
    <div className="bg-soft-blue">
      <div className="mx-auto max-w-2xl px-4 py-14 sm:px-6" role="status">
        <div className="rounded-3xl border bg-card p-6 text-center shadow-xl shadow-primary/5 sm:p-10">
          <span className="mx-auto grid size-16 place-items-center rounded-full bg-secondary/10 text-secondary"><CircleCheck className="size-9" /></span>
          <h1 className="mt-4 text-3xl font-semibold text-primary">Booking received</h1>
          <p className="mt-2 text-muted-foreground">Thank you, {name.split(' ')[0]}. Your booking reference is:</p>
          <p className="mx-auto mt-4 inline-block rounded-2xl border-2 border-dashed border-primary/40 bg-accent px-6 py-3 font-mono text-2xl font-bold tracking-wider text-primary">{reference}</p>
          <p className="mt-3 text-sm text-muted-foreground">Our team will call you to confirm your {method === 'home' ? 'home collection slot' : 'lab visit'} and the final amount.</p>

          <div className="mt-8 rounded-2xl bg-muted p-5 text-left">
            <p className="text-sm font-bold">Your tests</p>
            <ul className="mt-2 grid gap-1 text-sm text-muted-foreground">{items.map((i) => <li key={i}>• {i}</li>)}</ul>
            <p className="mt-3 text-sm">Estimated total: <strong>{formatINR(total)}</strong>{method === 'home' && ' · Collection fee ₹0'}</p>
          </div>

          <ol className="mt-8 grid gap-0 text-left">
            {timeline.map((step, i) => (
              <li key={step} className="flex items-center gap-3 py-1.5 text-sm">
                <span className={cn('grid size-6 shrink-0 place-items-center rounded-full border-2', i === 0 ? 'border-secondary bg-secondary text-white' : i === 1 ? 'border-secondary text-secondary' : 'text-muted-foreground')}>
                  {i === 0 ? <CircleCheck className="size-3.5" /> : <span className="size-1.5 rounded-full bg-current" />}
                </span>
                <span className={i <= 1 ? 'font-semibold' : 'text-muted-foreground'}>{step}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button asChild variant="outline" className="rounded-full font-bold"><Link to="/">Back to home</Link></Button>
            {whatsapp && (
              <Button asChild className="rounded-full bg-whatsapp font-bold text-white hover:bg-whatsapp/90">
                <a href={whatsapp} target="_blank" rel="noopener noreferrer"><WhatsAppGlyph className="size-4" /> Check status on WhatsApp</a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
