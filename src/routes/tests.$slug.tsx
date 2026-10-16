import { Link, createFileRoute, notFound } from '@tanstack/react-router'
import { ArrowRight, Clock, Droplets, House, ListChecks, TestTube, Utensils } from 'lucide-react'

import { PageHeader } from '@/components/site/PageHeader'
import { AddToBooking, Price } from '@/components/site/Price'
import { TestCard } from '@/components/site/cards'
import { Button } from '@/components/ui/button'
import { categoryName, fastingLabel, packages, testBySlug } from '@/data/catalogue'
import { site, whatsappLink } from '@/data/site'
import { useCart } from '@/lib/cart'
import { jsonLd, seo } from '@/lib/seo'

export const Route = createFileRoute('/tests/$slug')({
  loader: ({ params }) => {
    const test = testBySlug.get(params.slug)
    if (!test) throw notFound()
    return { test }
  },
  head: ({ loaderData }) => {
    if (!loaderData) return {}
    const { test } = loaderData
    return {
      ...seo({
        title: `${test.name} Test${test.price ? ' Price' : ''} in Delhi`,
        description: `${test.name} at DRL DIAGNOSTICS, North East Delhi. ${test.description} Sample: ${test.sampleType}. ${fastingLabel[test.fasting]}. Free home sample collection available.`.slice(0, 300),
        path: `/tests/${test.slug}`,
      }),
      scripts: [
        jsonLd({
          '@context': 'https://schema.org',
          '@type': 'MedicalTest',
          name: test.name,
          alternateName: test.aka,
          description: test.description,
          url: `${site.url}/tests/${test.slug}`,
        }),
      ],
    }
  },
  component: TestDetail,
})

function TestDetail() {
  const { test } = Route.useLoaderData()
  const cart = useCart()
  const related = test.related.map((s) => testBySlug.get(s)).filter((t) => t !== undefined)
  const inPackages = packages.filter((p) => p.includes.includes(test.slug))
  const ask = whatsappLink('prices', ` (${test.name}, ${test.code})`)

  const facts = [
    { icon: TestTube, label: 'Test code', value: test.code },
    { icon: Droplets, label: 'Sample type', value: test.sampleType },
    { icon: Utensils, label: 'Fasting', value: fastingLabel[test.fasting] },
    { icon: Clock, label: 'Expected turnaround', value: test.turnaround + (site.pricesVerified ? '' : ' (indicative)') },
    { icon: House, label: 'Home collection', value: test.homeCollection ? 'Available — ₹0 collection fee' : 'Specimen collected by your doctor' },
  ]

  return (
    <>
      <PageHeader crumb={test.name} eyebrow={categoryName(test.category)} title={test.name} description={test.description}>
        {test.aka && <p className="mt-2 text-sm text-muted-foreground">Also known as: {test.aka}</p>}
      </PageHeader>

      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-8">
          <dl className="grid gap-3 sm:grid-cols-2">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex gap-3 rounded-2xl border bg-card p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-accent text-primary"><Icon className="size-5" aria-hidden /></span>
                <div>
                  <dt className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">{label}</dt>
                  <dd className="mt-0.5 font-semibold text-foreground">{value}</dd>
                </div>
              </div>
            ))}
          </dl>

          <section className="rounded-3xl border bg-card p-6">
            <h2 className="text-xl font-semibold text-primary">Sample collection requirements</h2>
            <p className="mt-2 text-muted-foreground">{test.sampleRequirements}</p>
            <h2 className="mt-6 flex items-center gap-2 text-xl font-semibold text-primary">
              <ListChecks className="size-5 text-secondary" aria-hidden /> How to prepare
            </h2>
            <ul className="mt-3 grid gap-2">
              {test.preparation.map((p) => (
                <li key={p} className="flex gap-2 text-foreground/85">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-secondary" /> {p}
                </li>
              ))}
            </ul>
            <p className="mt-6 rounded-xl bg-muted px-4 py-3 text-xs text-muted-foreground">
              This information is general guidance. Your doctor may give you different instructions — please follow them.
            </p>
          </section>

          {inPackages.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-primary">Also included in these packages</h2>
              <ul className="mt-3 flex flex-wrap gap-2">
                {inPackages.map((p) => (
                  <li key={p.slug}>
                    <Link to="/packages" hash={p.slug} className="inline-flex items-center gap-1 rounded-full border bg-card px-4 py-2 text-sm font-semibold hover:border-primary hover:text-primary">
                      {p.name} <ArrowRight className="size-3.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {related.length > 0 && (
            <section>
              <h2 className="text-xl font-semibold text-primary">Related tests</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {related.map((t) => <TestCard key={t.slug} test={t} />)}
              </div>
            </section>
          )}
        </div>

        <aside className="lg:sticky lg:top-32 lg:self-start">
          <div className="rounded-3xl border bg-card p-6 shadow-xl shadow-primary/5">
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">Price</p>
            <Price value={test.price} className="mt-1 [&>span:first-child]:text-3xl" />
            <p className="mt-2 text-sm text-muted-foreground">Home collection fee: <strong className="text-secondary">₹0</strong> where available</p>
            <div className="mt-5 grid gap-2">
              {test.price !== null ? (
                <>
                  <AddToBooking item={{ kind: 'test', slug: test.slug }} size="lg" className="h-12" />
                  <Button asChild size="lg" variant="outline" className="h-12 rounded-full font-bold" onClick={() => cart.add({ kind: 'test', slug: test.slug })}>
                    <Link to="/book">Book Now</Link>
                  </Button>
                </>
              ) : (
                <Button asChild size="lg" className="h-12 rounded-full font-bold">
                  <Link to="/contact">Enquire about availability</Link>
                </Button>
              )}
              {ask && (
                <a href={ask} target="_blank" rel="noopener noreferrer" className="mt-1 text-center text-sm font-semibold text-whatsapp hover:underline">
                  Ask about this test on WhatsApp
                </a>
              )}
            </div>
          </div>
        </aside>
      </div>
    </>
  )
}
