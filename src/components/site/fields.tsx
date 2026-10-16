import { useId } from 'react'

import { cn } from '@/lib/utils'

export const controlClass =
  'h-11 w-full min-w-0 rounded-xl border border-input bg-background px-3.5 text-[15px] shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-4 focus-visible:ring-ring/15 disabled:opacity-60 aria-invalid:border-destructive'

/** Label + control + hint. The child receives the generated id via render prop. */
export function Field({
  label,
  hint,
  optional,
  className,
  children,
}: {
  label: string
  hint?: string
  optional?: boolean
  className?: string
  children: (id: string) => React.ReactNode
}) {
  const id = useId()
  return (
    <div className={cn('grid content-start gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-semibold text-foreground">
        {label}
        {optional && <span className="ml-1 font-normal text-muted-foreground">(optional)</span>}
      </label>
      {children(id)}
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}

export function Honeypot() {
  return (
    <p hidden>
      <label>
        Leave empty
        <input name="bot-field" tabIndex={-1} autoComplete="off" />
      </label>
    </p>
  )
}

export function todayISO(offsetDays = 0): string {
  const d = new Date()
  d.setDate(d.getDate() + offsetDays)
  const local = new Date(d.getTime() - d.getTimezoneOffset() * 60000)
  return local.toISOString().slice(0, 10)
}
