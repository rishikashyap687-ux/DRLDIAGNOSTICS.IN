import { site } from '@/data/site'

/** Per-page <head> entries: unique title, description, canonical URL and OG tags. */
export function seo({
  title,
  description,
  path,
  image = '/img/hero-lab.png',
}: {
  title: string
  description: string
  path: string
  image?: string
}) {
  const fullTitle = title.includes(site.name) ? title : `${title} | ${site.name}`
  const url = `${site.url}${path}`
  const imageUrl = `${site.url}${image}`
  return {
    meta: [
      { title: fullTitle },
      { name: 'description', content: description },
      { property: 'og:title', content: fullTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:image', content: imageUrl },
      { name: 'twitter:title', content: fullTitle },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: imageUrl },
    ],
    links: [{ rel: 'canonical', href: url }],
  }
}

export function jsonLd(data: unknown) {
  return { type: 'application/ld+json', children: JSON.stringify(data) }
}
