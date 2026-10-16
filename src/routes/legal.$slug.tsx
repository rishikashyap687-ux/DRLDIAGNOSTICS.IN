import { createFileRoute, notFound } from '@tanstack/react-router'

import { PageHeader } from '@/components/site/PageHeader'
import { legalPages } from '@/data/content'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/legal/$slug')({
  loader: ({ params }) => {
    const page = legalPages[params.slug]
    if (!page) throw notFound()
    return { page, slug: params.slug }
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo({ title: loaderData.page.title, description: loaderData.page.description, path: `/legal/${loaderData.slug}` })
      : {},
  component: LegalPage,
})

function LegalPage() {
  const { page } = Route.useLoaderData()
  return (
    <>
      <PageHeader crumb={page.title} eyebrow="Policies" title={page.title} description={page.description} />
      <article className="mx-auto max-w-reading px-4 py-12 sm:px-6">
        {page.sections.map((s) => (
          <section key={s.heading} className="mb-8">
            <h2 className="text-xl font-semibold text-primary">{s.heading}</h2>
            {s.body.map((p) => (
              <p key={p} className="mt-3 leading-relaxed text-foreground/85">{p}</p>
            ))}
          </section>
        ))}
        <p className="border-t pt-6 text-sm text-muted-foreground">Last updated: 15 October 2026</p>
      </article>
    </>
  )
}
