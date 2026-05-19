import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Nav, Footer } from '@/components/Nav'
import { getBlogPost, getAllBlogSlugs } from '@/lib/blog'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  const slugs = getAllBlogSlugs()
  return slugs.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getBlogPost(params.slug)
  if (!post) return {}
  return {
    title: `${post.title} | Akiya Japan`,
    description: post.description,
    alternates: { canonical: `https://akiya.mitorahub.com/en/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.date,
      url: `https://akiya.mitorahub.com/en/blog/${post.slug}`,
    },
  }
}

export default function BlogPostPage({ params }: Props) {
  const post = getBlogPost(params.slug)
  if (!post) notFound()

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: { '@type': 'Organization', name: 'Akiya Japan' },
    publisher: { '@type': 'Organization', name: 'Akiya Japan', url: 'https://akiya.mitorahub.com' },
    mainEntityOfPage: `https://akiya.mitorahub.com/en/blog/${post.slug}`,
  }

  return (
    <>
      <Nav lang="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <main className="max-w-3xl mx-auto px-4 py-12">
        <div className="mb-6">
          <Link href="/en/blog" className="text-sm text-stone-400 hover:text-stone-700 transition">← All Articles</Link>
        </div>

        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">{post.category}</span>
          <span className="text-xs text-stone-400">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        </div>

        <h1 className="text-3xl font-bold text-stone-900 mb-4 leading-tight">{post.title}</h1>
        <p className="text-lg text-stone-500 mb-8 border-b border-stone-100 pb-8">{post.description}</p>

        <div
          className="prose prose-stone max-w-none prose-headings:font-bold prose-h2:text-xl prose-h3:text-lg prose-a:text-amber-700 prose-a:no-underline hover:prose-a:underline"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        <div className="mt-10 pt-8 border-t border-stone-100">
          <div className="flex flex-wrap gap-1 mb-6">
            {post.tags?.map(tag => (
              <span key={tag} className="text-xs text-stone-400 bg-stone-50 px-2 py-0.5 rounded">#{tag}</span>
            ))}
          </div>
          <Link href="/en/blog" className="text-sm text-amber-700 hover:underline">← Back to all articles</Link>
        </div>
      </main>
      <Footer />
    </>
  )
}
