import { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { packageBySlug, testBySlug } from '@/data/catalogue'

export interface CartItem {
  kind: 'test' | 'package'
  slug: string
}

export interface ResolvedCartItem extends CartItem {
  name: string
  price: number | null
}

interface CartValue {
  items: ResolvedCartItem[]
  total: number
  count: number
  has: (item: CartItem) => boolean
  add: (item: CartItem) => void
  remove: (item: CartItem) => void
  toggle: (item: CartItem) => void
  clear: () => void
}

const CartContext = createContext<CartValue | null>(null)
const STORAGE_KEY = 'drl-cart-v1'
const same = (a: CartItem, b: CartItem) => a.kind === b.kind && a.slug === b.slug

function resolve(item: CartItem): ResolvedCartItem | null {
  const source = item.kind === 'test' ? testBySlug.get(item.slug) : packageBySlug.get(item.slug)
  return source ? { ...item, name: source.name, price: source.price } : null
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [raw, setRaw] = useState<CartItem[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
      if (Array.isArray(stored)) setRaw(stored)
    } catch {
      // Ignore unreadable cart data.
    }
    setLoaded(true)
  }, [])

  useEffect(() => {
    if (loaded) localStorage.setItem(STORAGE_KEY, JSON.stringify(raw))
  }, [raw, loaded])

  const value = useMemo<CartValue>(() => {
    const items = raw.map(resolve).filter((i): i is ResolvedCartItem => i !== null)
    return {
      items,
      count: items.length,
      total: items.reduce((sum, i) => sum + (i.price ?? 0), 0),
      has: (item) => raw.some((r) => same(r, item)),
      add: (item) => setRaw((r) => (r.some((x) => same(x, item)) ? r : [...r, item])),
      remove: (item) => setRaw((r) => r.filter((x) => !same(x, item))),
      toggle: (item) =>
        setRaw((r) => (r.some((x) => same(x, item)) ? r.filter((x) => !same(x, item)) : [...r, item])),
      clear: () => setRaw([]),
    }
  }, [raw])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart(): CartValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside CartProvider')
  return ctx
}
