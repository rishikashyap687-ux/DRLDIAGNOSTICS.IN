import { Link } from '@tanstack/react-router'
import { Home, MapPin, Menu, Phone, ShoppingBag } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { site, formatPhone, telLink } from '@/data/site'
import { useCart } from '@/lib/cart'

import { Logo } from './Logo'
import { TestSearch } from './TestSearch'
import { mainNav } from './nav'

export function SiteHeader() {
  const { count } = useCart()
  const tel = telLink()

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/90 backdrop-blur-md">
      <div className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6">
          <p className="flex items-center gap-1.5 font-medium">
            <Home className="size-3.5" aria-hidden />
            FREE home sample collection — ₹0 collection fee where available
          </p>
          <div className="hidden items-center gap-4 md:flex">
            <span className="flex items-center gap-1.5 opacity-90">
              <MapPin className="size-3.5" aria-hidden /> Sabapur, North East Delhi
            </span>
            {tel && site.phone && (
              <a href={tel} className="flex items-center gap-1.5 font-semibold hover:underline">
                <Phone className="size-3.5" aria-hidden /> {formatPhone(site.phone)}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto flex max-w-content items-center gap-3 px-4 py-2 sm:px-6">
        <Logo />

        <nav aria-label="Main" className="ml-4 hidden flex-1 items-center gap-0.5 xl:flex">
          {mainNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === '/' }}
              className="rounded-md px-2.5 py-2 text-[13px] font-semibold whitespace-nowrap text-foreground/75 transition-colors hover:bg-accent hover:text-primary data-[status=active]:text-primary motion-reduce:transition-none"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Button asChild variant="ghost" size="icon" className="relative" aria-label={`Booking cart, ${count} item${count === 1 ? '' : 's'}`}>
            <Link to="/book">
              <ShoppingBag className="size-5" />
              {count > 0 && (
                <span className="absolute -top-0.5 -right-0.5 grid size-4.5 place-items-center rounded-full bg-secondary text-[10px] font-bold text-secondary-foreground">
                  {count}
                </span>
              )}
            </Link>
          </Button>
          <Button asChild className="hidden h-10 rounded-full px-5 font-bold shadow-md shadow-primary/20 sm:inline-flex">
            <Link to="/book">BOOK A TEST</Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="xl:hidden" aria-label="Open menu">
                <Menu className="size-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[88vw] max-w-sm overflow-y-auto">
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
                <SheetDescription className="sr-only">Site navigation and test search</SheetDescription>
                <Logo />
              </SheetHeader>
              <div className="px-4">
                <TestSearch compact />
              </div>
              <nav aria-label="Mobile" className="flex flex-col px-2 py-2">
                {mainNav.map((item) => (
                  <SheetClose asChild key={item.to}>
                    <Link
                      to={item.to}
                      activeOptions={{ exact: item.to === '/' }}
                      className="rounded-lg px-3 py-3 text-base font-semibold text-foreground/80 hover:bg-accent data-[status=active]:bg-accent data-[status=active]:text-primary"
                    >
                      {item.label}
                    </Link>
                  </SheetClose>
                ))}
              </nav>
              <div className="mt-auto grid gap-2 p-4">
                <SheetClose asChild>
                  <Button asChild size="lg" className="h-12 rounded-full font-bold">
                    <Link to="/book">BOOK A TEST</Link>
                  </Button>
                </SheetClose>
                <SheetClose asChild>
                  <Button asChild size="lg" variant="secondary" className="h-12 rounded-full font-bold">
                    <Link to="/home-collection">BOOK FREE HOME COLLECTION</Link>
                  </Button>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
