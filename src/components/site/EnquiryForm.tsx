import { CircleCheck, Loader2 } from 'lucide-react'
import { useState, type FormEvent } from 'react'

import { Button } from '@/components/ui/button'
import { bookingReference, formDataToFields, indianMobile, submitNetlifyForm } from '@/lib/netlify-form'
import { cn } from '@/lib/utils'

import { Honeypot } from './fields'

/**
 * Netlify Forms wrapper for simple enquiries (contact, partnership). Field
 * markup is passed as children; the form name must be registered in
 * public/__forms.html.
 */
export function EnquiryForm({
  name,
  submitLabel,
  successTitle,
  children,
  className,
}: {
  name: string
  submitLabel: string
  successTitle: string
  children: React.ReactNode
  className?: string
}) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'error'>('idle')
  const [error, setError] = useState<string | null>(null)
  const [reference, setReference] = useState<string | null>(null)

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === 'pending') return
    const form = event.currentTarget
    const fields = formDataToFields(form)
    if (fields.mobile && !indianMobile.test(fields.mobile)) return setError('Enter a valid 10-digit Indian mobile number.')
    const ref = bookingReference('ENQ')
    setStatus('pending')
    setError(null)
    try {
      await submitNetlifyForm(name, { ...fields, reference: ref, status: 'New' })
      setReference(ref)
      form.reset()
      setStatus('idle')
    } catch {
      setStatus('error')
      setError('We could not confirm that your message was sent. Your details are still here — please try again.')
    }
  }

  if (reference) {
    return (
      <div role="status" className={cn('rounded-3xl border bg-card p-8 text-center', className)}>
        <CircleCheck className="mx-auto size-12 text-secondary" aria-hidden />
        <h3 className="mt-3 text-2xl font-semibold text-primary">{successTitle}</h3>
        <p className="mt-2 text-muted-foreground">Our team will get back to you soon. Your reference:</p>
        <p className="mt-3 font-mono text-xl font-bold text-primary">{reference}</p>
        <Button variant="outline" className="mt-6 rounded-full" onClick={() => setReference(null)}>Send another message</Button>
      </div>
    )
  }

  return (
    <form
      name={name}
      method="POST"
      action="/__forms.html"
      data-netlify="true"
      netlify-honeypot="bot-field"
      onSubmit={submit}
      className={cn('rounded-3xl border bg-card p-5 shadow-xl shadow-primary/5 sm:p-8', className)}
    >
      <input type="hidden" name="form-name" value={name} />
      <Honeypot />
      <fieldset disabled={status === 'pending'} className="grid gap-4 sm:grid-cols-2">
        {children}
        {error && (
          <p role="alert" className="rounded-xl border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive sm:col-span-2">{error}</p>
        )}
        <Button type="submit" size="lg" className="h-12 rounded-full text-base font-bold sm:col-span-2">
          {status === 'pending' && <Loader2 className="size-4 animate-spin" />} {submitLabel}
        </Button>
      </fieldset>
    </form>
  )
}
