import { Link } from '@tanstack/react-router'
import { ChevronRight, House, MessageCircle, Phone, X } from 'lucide-react'
import { useState } from 'react'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { telLink, whatsappActions, whatsappLink, type WhatsAppAction } from '@/data/site'

/** Where each support action goes while no WhatsApp number is configured. */
const fallbackRoute: Record<WhatsAppAction, '/book' | '/home-collection' | '/tests' | '/reports' | '/contact'> = {
  'book-test': '/book',
  'home-collection': '/home-collection',
  prices: '/tests',
  'booking-status': '/contact',
  reports: '/reports',
  general: '/contact',
}

export function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.25-8.23 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.12-.16.25-.64.81-.79.98-.14.16-.29.18-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.5.11-.11.25-.29.37-.43.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48a.92.92 0 0 0-.66.31c-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28Z" />
    </svg>
  )
}

export function SupportFab() {
  const [open, setOpen] = useState(false)
  const configured = whatsappLink('general') !== null
  const tel = telLink()

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={open ? 'Close support options' : 'Open WhatsApp and support options'}
            className="fixed right-4 bottom-20 z-50 grid size-14 place-items-center rounded-full bg-whatsapp text-white shadow-xl shadow-black/15 ring-4 ring-white transition-transform hover:scale-105 motion-reduce:transition-none md:right-6 md:bottom-6"
          >
            {open ? <X className="size-6" /> : <WhatsAppGlyph className="size-7" />}
          </button>
        </PopoverTrigger>
        <PopoverContent side="top" align="end" sideOffset={12} className="w-80 overflow-hidden rounded-2xl p-0">
          <div className="bg-whatsapp px-4 py-3 text-white">
            <p className="font-bold">How can we help?</p>
            <p className="text-xs opacity-90">
              {configured ? 'Chat with DRL DIAGNOSTICS on WhatsApp' : 'WhatsApp chat is being set up — use these quick links meanwhile'}
            </p>
          </div>
          <ul className="p-1.5">
            {(Object.keys(whatsappActions) as WhatsAppAction[]).map((key) => {
              const href = whatsappLink(key)
              const content = (
                <>
                  <MessageCircle className="size-4 text-whatsapp" aria-hidden />
                  <span className="flex-1 text-sm font-semibold">{whatsappActions[key].label}</span>
                  <ChevronRight className="size-4 text-muted-foreground" aria-hidden />
                </>
              )
              const cls = 'flex items-center gap-3 rounded-xl px-3 py-2.5 hover:bg-muted'
              return (
                <li key={key}>
                  {href ? (
                    <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                      {content}
                    </a>
                  ) : (
                    <Link to={fallbackRoute[key]} onClick={() => setOpen(false)} className={cls}>
                      {content}
                    </Link>
                  )}
                </li>
              )
            })}
          </ul>
        </PopoverContent>
      </Popover>

      {/* Mobile quick-action bar */}
      <nav
        aria-label="Quick actions"
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-[1fr_1fr_auto] gap-2 border-t bg-background/95 p-2 pr-20 backdrop-blur md:hidden"
      >
        <Link to="/book" className="grid h-12 place-items-center rounded-xl bg-primary text-sm font-bold text-primary-foreground">
          BOOK A TEST
        </Link>
        <Link
          to="/home-collection"
          className="flex h-12 items-center justify-center gap-1.5 rounded-xl bg-secondary text-sm font-bold text-secondary-foreground"
        >
          <House className="size-4" aria-hidden /> Home Visit
        </Link>
        {tel && (
          <a href={tel} aria-label="Call DRL DIAGNOSTICS" className="grid size-12 place-items-center rounded-xl border text-primary">
            <Phone className="size-5" />
          </a>
        )}
      </nav>
    </>
  )
}
