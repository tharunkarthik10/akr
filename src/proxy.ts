import { NextResponse, type NextRequest } from 'next/server'

export async function proxy(request: NextRequest) {
  // Extract Firebase session cookie
  const session = request.cookies.get('session')?.value

  // For protected dashboard routes, if there is no session cookie, redirect to login
  if (request.nextUrl.pathname.includes('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/contact', request.url)) // redirecting to contact for now as login page is not built
    }
  }
  
  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
