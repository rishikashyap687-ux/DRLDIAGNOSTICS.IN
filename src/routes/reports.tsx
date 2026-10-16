import { Link, createFileRoute } from '@tanstack/react-router'
import { BellRing, ExternalLink, FileDown, KeyRound, LockKeyhole, ShieldCheck, UserCheck } from 'lucide-react'

import { PageHeader } from '@/components/site/PageHeader'
import { WhatsAppGlyph } from '@/components/site/SupportFab'
import { Button } from '@/components/ui/button'
import { site, whatsappLink } from '@/data/site'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/reports')({
  head: () =>
    seo({
      title: 'Download Your Lab Report Online',
      description:
        'Download your DRL DIAGNOSTICS laboratory report online through our secure report portal. Reports are released only after laboratory review and approval.',
      path: '/reports',
    }),
  component: ReportsPage,
})

const steps = [
  { icon: FileDown, title: 'Open the report portal', text: 'Use the secure button on this page. It opens our laboratory reporting system.' },
  { icon: KeyRound, title: 'Verify your details', text: 'Enter the details requested by the portal, such as your registered mobile number or report ID.' },
  { icon: ShieldCheck, title: 'Download your PDF', text: 'View and download reports that have been approved and released by the laboratory.' },
]

function ReportsPage() {
  const ask = whatsappLink('reports')
  return (
    <>
      <PageHeader
        crumb="Download Reports"
        eyebrow="Online lab report download"
        title="Download your lab report"
        description="Your reports are released only after laboratory review and approval, and are available through our secure laboratory report portal."
      />

      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
        <section className="relative overflow-hidden rounded-3xl bg-primary p-8 text-primary-foreground sm:p-10">
          <div className="absolute -top-20 -right-20 size-64 rounded-full bg-secondary/40 blur-3xl" aria-hidden />
          <LockKeyhole className="relative size-10" aria-hidden />
          <h2 className="relative mt-4 text-3xl font-semibold">Secure report portal</h2>
          <p className="relative mt-3 max-w-md text-primary-foreground/85">
            DRL DIAGNOSTICS reports are issued through our laboratory information system. Open the portal to view
            and download your released report as a PDF.
          </p>
          <Button asChild size="lg" className="relative mt-8 h-13 rounded-full bg-white px-7 text-base font-bold text-primary hover:bg-white/90">
            <a href={site.reportPortalUrl} target="_blank" rel="noopener noreferrer">
              <FileDown className="size-5" /> Open report portal <ExternalLink className="size-4 opacity-70" />
            </a>
          </Button>
          <p className="relative mt-4 text-xs text-primary-foreground/70">Opens lab.flabslis.com in a new tab.</p>

          <ol className="relative mt-10 grid gap-4 sm:grid-cols-3">
            {steps.map(({ icon: Icon, title, text }, i) => (
              <li key={title} className="rounded-2xl bg-white/10 p-4 ring-1 ring-white/15">
                <span className="text-xs font-bold text-primary-foreground/60">STEP {i + 1}</span>
                <Icon className="mt-2 size-5" aria-hidden />
                <p className="mt-2 font-bold">{title}</p>
                <p className="mt-1 text-sm text-primary-foreground/75">{text}</p>
              </li>
            ))}
          </ol>
        </section>

        <aside className="grid content-start gap-5">
          <div className="rounded-3xl border bg-card p-6">
            <h2 className="text-xl font-semibold text-primary">Your privacy comes first</h2>
            <ul className="mt-4 grid gap-3 text-sm text-foreground/85">
              <li className="flex gap-3"><UserCheck className="size-5 shrink-0 text-secondary" aria-hidden /> Only reports approved by the laboratory are released.</li>
              <li className="flex gap-3"><LockKeyhole className="size-5 shrink-0 text-secondary" aria-hidden /> Never share your report link or verification details with anyone you don’t trust.</li>
              <li className="flex gap-3"><BellRing className="size-5 shrink-0 text-secondary" aria-hidden /> Your DRL patient account — with OTP login, report history and report-ready alerts — is coming soon.</li>
            </ul>
          </div>
          <div className="rounded-3xl border bg-accent/50 p-6">
            <h2 className="font-sans text-base font-bold">Report not showing yet?</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Some tests take longer to process. If your report is not available when expected, contact us with your
              booking reference.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {ask && (
                <Button asChild className="rounded-full bg-whatsapp font-bold text-white hover:bg-whatsapp/90">
                  <a href={ask} target="_blank" rel="noopener noreferrer"><WhatsAppGlyph className="size-4" /> Ask on WhatsApp</a>
                </Button>
              )}
              <Button asChild variant="outline" className="rounded-full font-bold"><Link to="/contact">Contact us</Link></Button>
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
