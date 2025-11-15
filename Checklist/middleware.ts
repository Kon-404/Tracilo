import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: req.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return req.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          req.cookies.set({
            name,
            value: '',
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: req.headers,
            },
          });
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isAuthPage =
    req.nextUrl.pathname.startsWith('/auth/login') ||
    req.nextUrl.pathname.startsWith('/auth/signup') ||
    req.nextUrl.pathname.startsWith('/auth/forgot-password') ||
    req.nextUrl.pathname.startsWith('/auth/reset-password');

  const isLandingPage = req.nextUrl.pathname === '/landing';

  const isProtectedPage =
    req.nextUrl.pathname === '/' ||
    req.nextUrl.pathname.startsWith('/form/') ||
    req.nextUrl.pathname.startsWith('/submissions') ||
    req.nextUrl.pathname.startsWith('/profile');

  // If user is not logged in and trying to access protected page
  if (!session && isProtectedPage) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/landing';
    return NextResponse.redirect(redirectUrl);
  }

  // If user is logged in and trying to access auth pages or landing page
  if (session && (isAuthPage || isLandingPage)) {
    const redirectUrl = req.nextUrl.clone();
    redirectUrl.pathname = '/';
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - manifest.json (PWA manifest)
     * - apple-touch-icon files
     * - public files (public folder)
     */
    '/((?!_next/static|_next/image|favicon.ico|manifest.json|apple-touch-icon|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
