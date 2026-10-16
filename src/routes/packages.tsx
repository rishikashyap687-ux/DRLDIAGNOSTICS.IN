import { createFileRoute } from '@tanstack/react-router'
import { PackageSearch } from 'lucide-react'
import { useState } from 'react'

import { PageHeader } from '@/components/site/PageHeader'
import { PackageCard } from '@/components/site/cards'
import { Button } from '@/components/ui/button'
import { packageCategories, packages, type PackageCategory } from '@/data/catalogue'
import { site } from '@/data/site'
import { seo } from '@/lib/seo'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/packages')({
  head: () =>
    seo({
      title: 'Full Body Health Checkup & Health Packages in Delhi',
      description:
        'Preventive health checkup packages from DRL DIAGNOSTICS: full body checkup, diabetes, thyroid, liver, kidney, heart, women’s, men’s and senior citizen packages with free home sample collection.',
      path: '/packages',
    }),
  component: PackagesPage,
})

const priceBands = [
  { id: 'any', label: 'Any price', test: () => true },
  { id: 'u1000', label: 'Under ₹1,000', test: (p: number) => p < 1000 },
  { id: '1000-2000', label: '₹1,000 – ₹2,000', test: (p: number) => p >= 1000 && p <= 2000 },
  { id: 'o2000', label: 'Above ₹2,000', test: (p: number) => p > 2000 },
] as const

const sizeBands = [
  { id: 'any', label: 'Any', test: () => true },
  { id: 'small', label: 'Up to 5 tests', test: (n: number) => n <= 5 },
  { id: 'medium', label: '6–9 tests', test: (n: number) => n >= 6 && n <= 9 },
  { id: 'large', label: '10+ tests', test: (n: number) => n >= 10 },
] as const

type Sort = 'popular' | 'price-asc' | 'price-desc' | 'tests'

function PackagesPage() {
  const [category, setCategory] = useState<PackageCategory | 'all'>('all')
  const [price, setPrice] = useState<(typeof priceBands)[number]['id']>('any')
  const [size, setSize] = useState<(typeof sizeBands)[number]['id']>('any')
  const [popularOnly, setPopularOnly] = useState(false)
  const [sort, setSort] = useState<Sort>('popular')

  const priceTest = priceBands.find((b) => b.id === price)!.test
  const sizeTest = sizeBands.find((b) => b.id === size)!.test
  const results = packages
    .filter((p) => (category === 'all' || p.category === category) && priceTest(p.price) && sizeTest(p.includes.length) && (!popularOnly || p.popular))
    .sort((a, b) => {
      if (sort === 'price-asc') return a.price - b.price
      if (sort === 'price-desc') return b.price - a.price
      if (sort === 'tests') return b.includes.length - a.includes.length
      return Number(!!b.popular) - Number(!!a.popular)
    })

  const reset = () => {
    setCategory('all')
    setPrice('any')
    setSize('any')
    setPopularOnly(false)
  }

  return (
    <>
      <PageHeader
        crumb="Health Packages"
        eyebrow="Health checkup packages"
        title="Preventive health checkups for every family"
        description="Grouped tests for a complete picture of your health in a single sample visit — with free home sample collection wherever available."
      />

      <div className="mx-auto max-w-content px-4 py-10 sm:px-6">
        <div className="rounded-3xl border bg-card p-4 sm:p-5">
          <div className="flex gap-2 overflow-x-auto pb-1">
            <Chip active={category === 'all'} onClick={() => setCategory('all')}>All packages</Chip>
            {packageCategories.map((c) => (
              <Chip key={c.id} active={category === c.id} onClick={() => setCategory(c.id)}>{c.name}</Chip>
            ))}
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <SelectBox label="Price" value={price} onChange={(v) => setPrice(v as typeof price)} options={priceBands.map((b) => [b.id, b.label])} />
            <SelectBox label="Number of tests" value={size} onChange={(v) => setSize(v as typeof size)} options={sizeBands.map((b) => [b.id, b.label])} />
            <SelectBox
              label="Sort by"
              value={sort}
              onChange={(v) => setSort(v as Sort)}
              options={[['popular', 'Most popular'], ['price-asc', 'Price: low to high'], ['price-desc', 'Price: high to low'], ['tests', 'Most tests']]}
            />
            <label className="flex h-full items-center gap-3 self-end rounded-xl border px-3.5 py-2.5 text-sm font-semibold">
              <input type="checkbox" checked={popularOnly} onChange={(e) => setPopularOnly(e.target.checked)} className="size-4 accent-[var(--primary)]" />
              Popular packages only
            </label>
          </div>
        </div>

        <p className="mt-6 text-sm text-muted-foreground" aria-live="polite">
          Showing {results.length} of {packages.length} packages
          {!site.pricesVerified && ' · Prices are indicative and confirmed by our team before collection.'}
        </p>

        {results.length > 0 ? (
          <div className="mt-4 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {results.map((p) => <PackageCard key={p.slug} pkg={p} />)}
          </div>
        ) : (
          <div className="mt-4 grid place-items-center rounded-3xl border border-dashed px-6 py-16 text-center">
            <PackageSearch className="size-10 text-muted-foreground" aria-hidden />
            <p className="mt-3 font-bold">No packages match these filters</p>
            <Button variant="outline" className="mt-4 rounded-full" onClick={reset}>Reset filters</Button>
          </div>
        )}
      </div>
    </>
  )
}

function Chip({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={cn(
        'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition-colors motion-reduce:transition-none',
        active ? 'border-primary bg-primary text-primary-foreground' : 'bg-background hover:border-primary/40 hover:text-primary',
      )}
    >
      {children}
    </button>
  )
}

function SelectBox({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: (readonly [string, string])[] }) {
  return (
    <label className="grid gap-1 text-xs font-semibold text-muted-foreground">
      {label}
      <select value={value} onChange={(e) => onChange(e.target.value)} className="h-11 rounded-xl border bg-background px-3 text-sm font-semibold text-foreground">
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  )
}
