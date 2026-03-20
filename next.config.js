/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: '*.supabase.co' },
      { protocol: 'https', hostname: '*.supabase.in' },
      // Municipal akiya bank image sources
      { protocol: 'https', hostname: '*.pref.*.jp' },
      { protocol: 'http', hostname: '*.pref.*.jp' },
      { protocol: 'https', hostname: '*.city.*.jp' },
      { protocol: 'http', hostname: '*.city.*.jp' },
      // LIFULL HOME'S
      { protocol: 'https', hostname: 'img01.suumo.com' },
      { protocol: 'https', hostname: 'static.lifull.com' },
      // Catch-all for scraper-sourced images
      { protocol: 'https', hostname: '**' },
    ],
  },
}
module.exports = nextConfig
