import { HeadContent, Scripts, createRootRoute } from '@tanstack/react-router'

import { Toaster } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { NotFoundPage } from '@/components/error-pages'
import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { SupportFab } from '@/components/site/SupportFab'
import { fullAddress, site } from '@/data/site'
import { CartProvider } from '@/lib/cart'
import { jsonLd } from '@/lib/seo'

import '../styles.css'

const siteName =
  'DRL DIAGNOSTICS | Pathology Lab in North East Delhi | Free Home Sample Collection'
// Optional integrations, set as build-time environment variables on Netlify.
const gaId = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined
const searchConsoleToken = import.meta.env.VITE_GOOGLE_SITE_VERIFICATION as string | undefined

const localBusiness = {
  '@context': 'https://schema.org',
  '@type': ['MedicalBusiness', 'DiagnosticLab'],
  name: site.name,
  slogan: site.tagline,
  url: site.url,
  logo: `${site.url}${site.logo}`,
  image: `${site.url}/img/hero-lab.png`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: site.address.line1,
    addressLocality: site.address.locality,
    addressRegion: site.address.region,
    postalCode: site.address.postalCode,
    addressCountry: 'IN',
  },
  ...(site.phone ? { telephone: `+${site.phone}` } : {}),
  ...(site.email ? { email: site.email } : {}),
  areaServed: 'IN',
  medicalSpecialty: 'Pathology',
  description: fullAddress,
}

const siteDescription =
  'DRL DIAGNOSTICS is a pathology and blood test laboratory in Sabapur, North East Delhi. Book blood tests online, choose full body health checkups and get free home sample collection.'

export const Route = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: 'utf-8',
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        title: siteName,
      },
      {
        name: 'description',
        content: siteDescription,
      },
      {
        property: 'og:title',
        content: siteName,
      },
      {
        property: 'og:description',
        content: siteDescription,
      },
      {
        property: 'og:type',
        content: 'website',
      },
      {
        name: 'twitter:card',
        content: 'summary_large_image',
      },
      { name: 'theme-color', content: '#1f3f99' },
      { property: 'og:site_name', content: site.name },
      { property: 'og:locale', content: 'en_IN' },
      ...(searchConsoleToken
        ? [{ name: 'google-site-verification', content: searchConsoleToken }]
        : []),
    ],
    links: [
      { rel: 'icon', href: '/favicon.ico' },
      { rel: 'apple-touch-icon', href: '/.netlify/images?url=/img/drl-logo.jpeg&w=180&h=180&fit=contain&fm=png' },
      { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
      { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossOrigin: 'anonymous' },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap',
      },
    ],
    scripts: [
      jsonLd(localBusiness),
      ...(gaId
        ? [
            { src: `https://www.googletagmanager.com/gtag/js?id=${gaId}`, async: true },
            {
              children: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config',${JSON.stringify(gaId)},{anonymize_ip:true});`,
            },
          ]
        : []),
    ],
  }),
  shellComponent: RootDocument,
  notFoundComponent: NotFoundPage,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN">
      <head>
        <HeadContent />
      </head>
      <body>
        <TooltipProvider>
          <CartProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
            >
              Skip to content
            </a>
            <div className="flex min-h-screen flex-col">
              <SiteHeader />
              <main id="main" className="flex-1">
                {children}
              </main>
              <SiteFooter />
            </div>
            <SupportFab />
          </CartProvider>
        </TooltipProvider>
        <Toaster />
        <Scripts />
      </body>
    </html>
  )
}
