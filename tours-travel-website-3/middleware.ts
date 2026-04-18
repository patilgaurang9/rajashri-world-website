import { NextRequest, NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  const token = req.cookies.get('sb-access-token')?.value;
  const isProtected = req.nextUrl.pathname.startsWith('/admin');

  if (isProtected && !token) {
    // Redirect to home if not authenticated
    return NextResponse.redirect(new URL('/', req.url));
  }
  return NextResponse.next();
}

// Only run on protected routes
export const config = {
  matcher: ['/admin/:path*'],
};
