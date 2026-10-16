export const mainNav = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/tests', label: 'Our Tests' },
  { to: '/packages', label: 'Health Packages' },
  { to: '/home-collection', label: 'Free Home Collection' },
  { to: '/reports', label: 'Download Reports' },
  { to: '/partners', label: 'Doctor Partnerships' },
  { to: '/contact', label: 'Contact Us' },
] as const

export const legalNav = [
  { slug: 'privacy-policy', label: 'Privacy Policy' },
  { slug: 'terms-and-conditions', label: 'Terms & Conditions' },
  { slug: 'patient-consent', label: 'Patient Consent' },
  { slug: 'cancellation-policy', label: 'Cancellation Policy' },
  { slug: 'refund-policy', label: 'Refund Policy' },
  { slug: 'medical-disclaimer', label: 'Medical Disclaimer' },
] as const
