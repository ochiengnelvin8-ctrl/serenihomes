import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function proxy(request: NextRequest) {

  // PUBLIC ROUTES
  // Users can access these without login

  const publicRoutes = [
    '/',
    '/about',
    '/services',
    '/contact',
    '/blog',
    '/login',
    '/signup',
    '/membership'
  ]

  const pathname = request.nextUrl.pathname

  // CHECK IF ROUTE IS PUBLIC

  const isPublicRoute =
    publicRoutes.includes(pathname)

  // ALLOW PROPERTY PAGES

  const isPropertyPage =
    pathname.startsWith('/properties')

  // ALLOW PUBLIC ACCESS

  if (isPublicRoute || isPropertyPage) {

    return NextResponse.next()
  }

  // CHECK AUTH TOKEN

  const token =
    request.cookies.get(
      'sb-access-token'
    )?.value

  // REDIRECT IF NOT LOGGED IN

  if (!token) {

    return NextResponse.redirect(
      new URL('/login', request.url)
    )
  }

  // ALLOW ACCESS

  return NextResponse.next()
}

// ROUTES TO PROTECT

export const config = {

  matcher: [

    /*
      Protect dashboard routes
    */

    '/dashboard/:path*',

    /*
      Protect membership pages if needed
    */

    '/membership/:path*'

  ]
}