import { MetadataRoute } from 'next'
import { readdirSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

const BASE_URL = 'https://akiya.mitorahub.com'

function getBlogPosts(): { slug: string; date?: string }[] {
  try {
    const blogDir = join(process.cwd(), 'content', 'blog')
    if (!existsSync(blogDir)) return []
    return readdirSync(blogDir)
      .filter((f) => f.endsWith('.json'))
      .map((f) => {
        try {
          const d = JSON.parse(readFileSync(join(blogDir, f), 'utf8'))
          return { slug: d.slug || f.replace('.json', ''), date: d.date }
        } catch {
          return { slug: f.replace('.json', '') }
        }
      })
  } catch {
    return []
  }
}

// IMPORTANT: "/" and "/submit" are intentionally excluded.
// middleware.ts redirects "/" → "/en" and "/submit" → "/en" (301).
// Including redirect URLs in the sitemap causes GSC "Pages have redirects" errors.
export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/en/akiya`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/en/faq`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/en/guide`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${BASE_URL}/en/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/tokusho`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]

  const blogPages: MetadataRoute.Sitemap = getBlogPosts().map(({ slug, date }) => ({
    url: `${BASE_URL}/en/blog/${slug}`,
    lastModified: date ? new Date(date) : new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.65,
  }))

  return [...staticPages, ...blogPages]
}
