import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'

export async function middleware(request: NextRequest) {
  const response = NextResponse.next()

  const supabase = createMiddlewareClient({
    req: request,
    res: response,
  })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  const pathname = request.nextUrl.pathname

  // ---- PUBLIC ROUTES ----
  const publicRoutes = [
    '/',
    '/auth',
    '/auth/login',
    '/auth/signup',
    '/auth/forgot-password',
    '/auth/callback',
  ]

  const isPublicRoute = publicRoutes.some(
    route =>
      pathname === route || pathname.startsWith(route)
  )

  // ---- PROTECTED ROUTES ----
  const isProtectedRoute = pathname.startsWith('/protected')

  // ---- NOT LOGGED IN & TRYING TO ACCESS PROTECTED ----
  if (!session && isProtectedRoute) {
    const loginUrl = request.nextUrl.clone()
    loginUrl.pathname = '/auth/login'
    loginUrl.searchParams.set('redirectedFrom', pathname)

    return NextResponse.redirect(loginUrl)
  }

  // ---- LOGGED IN & TRYING TO ACCESS AUTH PAGES ----
  if (session && pathname.startsWith('/auth')) {
    const dashboardUrl = request.nextUrl.clone()
    dashboardUrl.pathname = '/protected/dashboard'

    return NextResponse.redirect(dashboardUrl)
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Apply middleware to all routes except:
     * - static files
     * - image optimization
     * - favicon
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}
