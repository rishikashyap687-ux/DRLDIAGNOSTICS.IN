import { Link, createFileRoute } from '@tanstack/react-router'
import { SearchX, X } from 'lucide-react'
import { z } from 'zod'

import { PageHeader } from '@/components/site/PageHeader'
import { TestCard } from '@/components/site/cards'
import { Button } from '@/components/ui/button'
import { categories, categoryName, tests, type CategoryId } from '@/data/catalogue'
import { site } from '@/data/site'
import { seo } from '@/lib/seo'
import { cn } from '@/lib/utils'

const categoryIds = categories.map((c) => c.id) as [CategoryId, ...CategoryId[]]

const searchSchema = z.object({
  q: z.string().optional(),
  category: z.enum(categoryIds).optional(),
  fasting: z.enum(['any', 'none', 'fasting']).optional(),
})

export const Route = createFileRoute('/tests/')({
  validateSearch: searchSchema,
  head: () =>
    seo({
      title: 'Pathology Test Price List & Blood Tests in Delhi',
      description:
        'Search the DRL DIAGNOSTICS pathology test catalogue: CBC, thyroid profile, HbA1c, LFT, KFT, lipid profile, vitamin D, B12, urine and stool tests, with prices and preparation.',
      path: '/tests',
    }),
  component: TestsPage,
})

function TestsPage() {
  const { q = '', category, fasting = 'any' } = Route.useSearch()
  const navigate = Route.useNavigate()
  const query = q.trim().toLowerCase()

  const results = tests.filter((t) => {
    if (category && t.category !== category) return false
    if (fasting === 'none' && t.fasting !== 'none') return false
    if (fasting === 'fasting' && t.fasting === 'none') return false
    if (!query) return true
    return [t.name, t.aka, t.code, t.description, categoryName(t.category)].join(' ').toLowerCase().includes(query)
  })

  const update = (next: Partial<z.infer<typeof searchSchema>>) =>
    navigate({ search: (prev) => ({ ...prev, ...next }), replace: true, resetScroll: false })

  return (
    <>
      <PageHeader
        crumb="Our Tests"
        eyebrow="Complete pathology test catalogue"
        title="Find the right test"
        description={`Browse ${tests.length} investigations across ${categories.length} categories. Open any test to see sample type, fasting needs and preparation, then add it to your booking.`}
      >
        <div className="mt-6 flex max-w-xl items-center gap-2 rounded-full border bg-background px-4 shadow-sm focus-within:ring-4 focus-within:ring-ring/15">
          <label htmlFor="test-filter" className="sr-only">Filter tests</label>
          <input
            id="test-filter"
            type="search"
            value={q}
            onChange={(e) => update({ q: e.target.value || undefined })}
            placeholder="Search by test name, code or condition…"
            className="h-13 flex-1 bg-transparent outline-none"
          />
          {q && (
            <button type="button" onClick={() => update({ q: undefined })} aria-label="Clear search" className="text-muted-foreground hover:text-foreground">
              <X className="size-4" />
            </button>
          )}
        </div>
      </PageHeader>

      <div className="mx-auto grid max-w-content gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[240px_1fr]">
        <aside className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="font-sans text-xs font-bold tracking-wider text-muted-foreground uppercase">Categories</h2>
          <ul className="mt-3 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-1 lg:overflow-visible">
            <li>
              <FilterChip active={!category} onClick={() => update({ category: undefined })}>
                All tests <span className="ml-auto text-xs opacity-70">{tests.length}</span>
              </FilterChip>
            </li>
            {categories.map((c) => (
              <li key={c.id}>
                <FilterChip active={category === c.id} onClick={() => update({ category: c.id })}>
                  {c.name}
                  <span className="ml-auto pl-2 text-xs opacity-70">{tests.filter((t) => t.category === c.id).length}</span>
                </FilterChip>
              </li>
            ))}
          </ul>

          <h2 className="mt-6 font-sans text-xs font-bold tracking-wider text-muted-foreground uppercase">Fasting</h2>
          <div className="mt-3 flex gap-2 lg:flex-col lg:gap-1">
            {([
              ['any', 'Any'],
              ['none', 'No fasting needed'],
              ['fasting', 'Fasting required'],
            ] as const).map(([value, label]) => (
              <FilterChip key={value} active={fasting === value} onClick={() => update({ fasting: value === 'any' ? undefined : value })}>
                {label}
              </FilterChip>
            ))}
          </div>
        </aside>

        <section aria-live="polite">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-2xl font-semibold text-primary">
              {category ? categoryName(category) : 'All tests'}
            </h2>
            <p className="text-sm text-muted-foreground">
              {results.length} {results.length === 1 ? 'test' : 'tests'}
              {query && <> matching “{q}”</>}
            </p>
          </div>
          {!site.pricesVerified && (
            <p className="mt-3 rounded-xl border border-secondary/25 bg-secondary/5 px-4 py-2.5 text-sm text-foreground/80">
              Prices are indicative while the laboratory finalises its price list. Our team confirms the exact amount
              before collection.
            </p>
          )}

          {results.length > 0 ? (
            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {results.map((t) => <TestCard key={t.slug} test={t} />)}
            </div>
          ) : (
            <div className="mt-6 grid place-items-center rounded-3xl border border-dashed px-6 py-16 text-center">
              <SearchX className="size-10 text-muted-foreground" aria-hidden />
              <p className="mt-3 font-bold">No tests found</p>
              <p className="mt-1 max-w-sm text-sm text-muted-foreground">
                Try a different name, or ask us — we may offer the test even if it isn’t listed yet.
              </p>
              <div className="mt-5 flex gap-2">
                <Button variant="outline" className="rounded-full" onClick={() => navigate({ search: {} })}>Clear filters</Button>
                <Button asChild className="rounded-full"><Link to="/contact">Ask about a test</Link></Button>
              </div>
            </div>
          )}
        </section>
      </div>
    </>
  )
}

function FilterChip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        'flex w-full items-center rounded-full border px-3.5 py-2 text-sm font-semibold whitespace-nowrap transition-colors lg:rounded-lg lg:border-transparent motion-reduce:transition-none',
        active ? 'border-primary bg-primary text-primary-foreground' : 'bg-background text-foreground/80 hover:bg-accent hover:text-primary',
      )}
    >
      {children}
    </button>
  )
}
