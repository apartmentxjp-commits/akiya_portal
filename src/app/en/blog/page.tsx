import type { Metadata } from 'next'
import Link from 'next/link'
import { Nav, Footer } from '@/components/Nav'
import { getAllBlogPosts } from '@/lib/blog'

export const metadata: Metadata = {
  title: 'Blog — Akiya Japan | Guides & Insights for Buying Property in Japan',
  description: 'Expert articles on buying vacant houses (akiya) in Japan, renovation tips, legal guides, regional spotlights, and more for foreign buyers.',
  alternates: {
    canonical: 'https://akiya.mitorahub.com/en/blog',
  },
}

export default function BlogListPage() {
  const posts = getAllBlogPosts()

  return (
    <>
      <Nav lang="en" />
      <main className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-stone-900 mb-2">Akiya Japan Blog</h1>
        <p className="text-stone-500 mb-10 text-lg">Guides, insights, and tips for buying property in Japan as a foreigner.</p>

        {posts.length === 0 ? (
          <p className="text-stone-400">No articles yet. Check back soon.</p>
        ) : (
          <div className="grid gap-8">
            {posts.map(post => (
              <article key={post.slug} className="border-b border-stone-100 pb-8">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-xs font-medium text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full">{post.category}</span>
                  <span className="text-xs text-stone-400">{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <Link href={`/en/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold text-stone-800 hover:text-amber-700 transition mb-2">{post.title}</h2>
                </Link>
                <p className="text-stone-500 text-sm mb-3">{post.description}</p>
                <div className="flex flex-wrap gap-1">
                  {post.tags?.map(tag => (
                    <span key={tag} className="text-xs text-stone-400 bg-stone-50 px-2 py-0.5 rounded">#{tag}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}
