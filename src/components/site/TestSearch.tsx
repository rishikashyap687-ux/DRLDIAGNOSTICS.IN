import { useId, useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { FlaskConical, Package, Search } from 'lucide-react'

import { searchCatalogue } from '@/data/catalogue'
import { cn } from '@/lib/utils'

export function TestSearch({ compact = false, className }: { compact?: boolean; className?: string }) {
  const navigate = useNavigate()
  const listId = useId()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState(-1)
  const hits = useMemo(() => searchCatalogue(query), [query])

  function go(index: number) {
    const hit = hits[index]
    setOpen(false)
    setQuery('')
    if (hit?.kind === 'test') navigate({ to: '/tests/$slug', params: { slug: hit.slug } })
    else if (hit?.kind === 'package') navigate({ to: '/packages', hash: hit.slug })
    else navigate({ to: '/tests', search: { q: query.trim() || undefined } })
  }

  return (
    <form
      role="search"
      className={cn('relative', className)}
      onSubmit={(e) => {
        e.preventDefault()
        go(active)
      }}
    >
      <label htmlFor={`${listId}-input`} className="sr-only">
        Search tests and packages
      </label>
      <div
        className={cn(
          'flex items-center gap-2 rounded-full border border-input bg-background shadow-sm transition-shadow focus-within:border-ring focus-within:ring-4 focus-within:ring-ring/15',
          compact ? 'h-11 pl-4 pr-1' : 'h-15 pl-5 pr-1.5 shadow-lg shadow-primary/5',
        )}
      >
        <Search className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <input
          id={`${listId}-input`}
          role="combobox"
          aria-expanded={open && hits.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          autoComplete="off"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setOpen(true)
            setActive(-1)
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          onKeyDown={(e) => {
            if (e.key === 'ArrowDown') {
              e.preventDefault()
              setActive((a) => Math.min(a + 1, hits.length - 1))
            } else if (e.key === 'ArrowUp') {
              e.preventDefault()
              setActive((a) => Math.max(a - 1, -1))
            } else if (e.key === 'Escape') setOpen(false)
          }}
          placeholder={compact ? 'Search tests…' : 'Search for a blood test, health package, or investigation...'}
          className="min-w-0 flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted-foreground/80"
        />
        <button
          type="submit"
          className={cn(
            'shrink-0 rounded-full bg-primary font-bold text-primary-foreground transition-colors hover:bg-primary/90',
            compact ? 'h-9 px-4 text-sm' : 'h-12 px-6 text-sm',
          )}
        >
          Search
        </button>
      </div>

      {open && hits.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute inset-x-0 top-full z-50 mt-2 max-h-80 overflow-y-auto rounded-2xl border bg-popover p-1.5 shadow-xl"
        >
          {hits.map((hit, i) => (
            <li
              key={`${hit.kind}-${hit.slug}`}
              role="option"
              aria-selected={i === active}
              onMouseDown={(e) => {
                e.preventDefault()
                go(i)
              }}
              className={cn(
                'flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5',
                i === active ? 'bg-accent' : 'hover:bg-muted',
              )}
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent text-primary">
                {hit.kind === 'test' ? <FlaskConical className="size-4" /> : <Package className="size-4" />}
              </span>
              <span className="min-w-0">
                <span className="block truncate text-sm font-semibold">{hit.name}</span>
                <span className="block text-xs text-muted-foreground">{hit.detail}</span>
              </span>
            </li>
          ))}
        </ul>
      )}
    </form>
  )
}
