import { NextResponse, NextRequest } from 'next/server'
import { verifySession } from './lib/session'

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl
  const isAdminRoute = pathname.startsWith('/admin')
  const isApiRoute = pathname.startsWith('/api')

  // Skip middleware for public GET requests to menu/categories API
  if (isApiRoute && (pathname.startsWith('/api/menu-items') || pathname.startsWith('/api/categories'))) {
    if (request.method === 'GET') {
      return NextResponse.next()
    }
  }

  // Protect admin routes and non-GET API requests
  if (isAdminRoute || (isApiRoute && request.method !== 'GET')) {
    try {
      await verifySession()
    } catch (error) {
      return NextResponse.redirect(new URL('/auth/signin', origin))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/menu-items',
    '/api/categories'
  ]
}