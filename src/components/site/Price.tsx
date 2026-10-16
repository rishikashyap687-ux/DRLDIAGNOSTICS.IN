import { Check, Info, Plus } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { formatINR } from '@/data/catalogue'
import { site } from '@/data/site'
import { useCart, type CartItem } from '@/lib/cart'
import { cn } from '@/lib/utils'

export function Price({
  value,
  original,
  className,
}: {
  value: number | null
  original?: number
  className?: string
}) {
  if (value === null) {
    return <span className={cn('text-sm font-semibold text-muted-foreground', className)}>Price on request</span>
  }
  return (
    <span className={cn('inline-flex items-baseline gap-1.5', className)}>
      <span className="text-xl font-extrabold text-primary tabular-nums">{formatINR(value)}</span>
      {original && original > value && (
        <span className="text-sm text-muted-foreground line-through tabular-nums">{formatINR(original)}</span>
      )}
      {!site.pricesVerified && <IndicativeTag />}
    </span>
  )
}

export function IndicativeTag() {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <button type="button" className="inline-flex items-center gap-0.5 self-center text-[11px] font-medium text-muted-foreground underline decoration-dotted underline-offset-2">
          indicative <Info className="size-3" aria-hidden />
        </button>
      </TooltipTrigger>
      <TooltipContent className="max-w-60">
        Prices are being finalised by the laboratory. Our team confirms the exact amount before your sample is
        collected — you never pay a hidden charge.
      </TooltipContent>
    </Tooltip>
  )
}

export function AddToBooking({
  item,
  className,
  size = 'default',
  label = 'Add to booking',
}: {
  item: CartItem
  label?: string
  className?: string
  size?: 'default' | 'lg' | 'sm'
}) {
  const cart = useCart()
  const added = cart.has(item)
  return (
    <Button
      type="button"
      size={size}
      variant={added ? 'secondary' : 'default'}
      aria-pressed={added}
      onClick={() => cart.toggle(item)}
      className={cn('rounded-full font-bold', className)}
    >
      {added ? <Check className="size-4" /> : <Plus className="size-4" />}
      {added ? 'Added' : label}
    </Button>
  )
}
