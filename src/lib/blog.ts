import fs from 'fs'
import path from 'path'

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  category: string
  tags: string[]
  content: string // HTML string
  image?: string
}

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith('.json'))
  const posts = files
    .map(file => {
      try {
        const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf-8')
        return JSON.parse(raw) as BlogPost
      } catch {
        return null
      }
    })
    .filter(Boolean) as BlogPost[]
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getBlogPost(slug: string): BlogPost | null {
  const filePath = path.join(BLOG_DIR, `${slug}.json`)
  if (!fs.existsSync(filePath)) return null
  try {
    const raw = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(raw) as BlogPost
  } catch {
    return null
  }
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter(f => f.endsWith('.json'))
    .map(f => f.replace('.json', ''))
}
