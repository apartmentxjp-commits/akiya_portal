import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Domain A: akiya.tacky-consulting.com
 * English data library + Stripe subscription only.
 *
 * Seller-facing paths are not available on this domain.
 * Root "/" redirects to the English library.
 */
// Seller-facing paths not available on the English-only domain.
// /akiya is intentionally excluded — /en/akiya/* is the English library.
const SELLER_PATHS = ['/submit', '/agent', '/admin']

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Root "/" → English data library
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/en', request.url), { status: 301 })
  }

  // Seller paths → 404 (not available on this domain)
  const isSeller = SELLER_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + '/')
  )
  if (isSeller) {
    return NextResponse.redirect(new URL('/en', request.url), { status: 301 })
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon\\.ico|api/).*)'],
}
