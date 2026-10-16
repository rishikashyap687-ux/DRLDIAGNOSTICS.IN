/**
 * Business settings for DRL DIAGNOSTICS.
 *
 * Milestone 1 keeps these in code. A later milestone moves them into the
 * database so staff can edit them from the admin dashboard (see PLAN.md).
 *
 * Leave a contact value as `null` until the business confirms it. The UI hides
 * call/WhatsApp/email actions for missing values instead of showing a fake
 * number.
 */
export const site = {
  name: 'DRL DIAGNOSTICS',
  tagline: 'ACCURATE • AFFORDABLE • ACCEPTABLE',
  url: 'https://drl-diagnostics-website.netlify.app',
  logo: '/img/drl-logo.jpeg',

  address: {
    line1: 'A704, Ground Floor, 1st Pusta, Sabapur',
    locality: 'North East Delhi',
    city: 'Delhi',
    region: 'Delhi',
    postalCode: '110094',
    country: 'India',
    // Still to be checked: Vishwavidyalaya Metro Station is on the Yellow Line
    // in North Delhi, a long way from Sabapur. The landmark stays hidden until
    // `landmarkVerified` is true.
    landmark: 'Near Delhi Vishwavidyalaya Metro Station',
    landmarkVerified: false,
  },

  /** E.164 digits without '+', e.g. '919876543210'. null = not yet confirmed. */
  phone: null as string | null,
  whatsapp: null as string | null,
  email: null as string | null,
  openingHours: null as string | null,

  /** Partner LIS portal where patients download released reports today. */
  reportPortalUrl: 'https://lab.flabslis.com/doctor_report/6ad0c8c3e241e2c49fd0db42',

  /**
   * Prices, turnaround times and package contents in src/data/catalogue.ts are
   * sample data until the laboratory approves them. While false, every price is
   * labelled "indicative" and confirmed by the lab before collection.
   */
  pricesVerified: false,

  homeCollectionFee: 0,
} as const

export const fullAddress = [
  site.address.line1,
  site.address.locality,
  `${site.address.city} - ${site.address.postalCode}`,
  site.address.country,
].join(', ')

export const mapsQuery = encodeURIComponent(`DRL Diagnostics, ${fullAddress}`)
export const mapsEmbedUrl = `https://www.google.com/maps?q=${mapsQuery}&output=embed`
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${mapsQuery}`

export type WhatsAppAction =
  | 'book-test'
  | 'home-collection'
  | 'prices'
  | 'booking-status'
  | 'reports'
  | 'general'

export const whatsappActions: Record<
  WhatsAppAction,
  { label: string; message: string }
> = {
  'book-test': {
    label: 'Book a Test',
    message: 'Hello DRL DIAGNOSTICS, I would like to book a test.',
  },
  'home-collection': {
    label: 'Book Free Home Collection',
    message: 'Hello DRL DIAGNOSTICS, I would like to book a free home sample collection.',
  },
  prices: {
    label: 'Ask About Test Prices',
    message: 'Hello DRL DIAGNOSTICS, could you share the price for a test?',
  },
  'booking-status': {
    label: 'Check Booking Status',
    message: 'Hello DRL DIAGNOSTICS, I would like to check my booking status. My booking reference is: ',
  },
  reports: {
    label: 'Ask About Reports',
    message: 'Hello DRL DIAGNOSTICS, I have a question about my lab report.',
  },
  general: {
    label: 'General Enquiry',
    message: 'Hello DRL DIAGNOSTICS, I have a question.',
  },
}

export function whatsappLink(action: WhatsAppAction, extra = ''): string | null {
  if (!site.whatsapp) return null
  const text = whatsappActions[action].message + extra
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`
}

export function telLink(): string | null {
  return site.phone ? `tel:+${site.phone}` : null
}

export function formatPhone(digits: string): string {
  return digits.startsWith('91') && digits.length === 12
    ? `+91 ${digits.slice(2, 7)} ${digits.slice(7)}`
    : `+${digits}`
}
