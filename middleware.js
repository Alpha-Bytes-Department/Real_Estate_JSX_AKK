import { NextResponse } from "next/server";

export function middleware(request) {
  // Get tokens from cookies (more secure than localStorage for SSR)
  const token = request.cookies.get("access_token")?.value;
  const user = request.cookies.get("auth_user")?.value;

  // Debug logging - remove this after testing
  console.log("🔍 Middleware Debug:", {
    pathname: request.nextUrl.pathname,
    hasToken: !!token,
    hasUser: !!user,
    token: token ? `${token.substring(0, 20)}...` : "none",
    user: user ? "exists" : "none",
    cookies: request.cookies.getAll().map((c) => c.name),
  });

  // Define protected routes - add/remove routes as needed
  const protectedPaths = [
    "/dashboard",
    "/account-settings",
    "/saved-properties",
    "/listings",
    "/property-details",
    "/view-all-images",
  ];

  // Define public routes that should redirect to dashboard if already logged in
  const authPaths = [
    "/sign-in",
    "/sign-up",
    "/forget-password",
    "/forget-password-via-email",
  ];

  const { pathname } = request.nextUrl;

  // Check if current path is protected
  const isProtectedPath = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  // Check if current path is auth page
  const isAuthPath = authPaths.some((path) => pathname.startsWith(path));

  // If user is not authenticated and trying to access protected route
  if (isProtectedPath && (!token || !user)) {
    console.log("🚫 Blocking access to protected route:", pathname);
    const signInUrl = new URL("/sign-in", request.url);
    // Add redirect parameter to return user to intended page after login
    signInUrl.searchParams.set("redirect", pathname);
    // Indicate that login is required so the client can show a friendly message
    signInUrl.searchParams.set("loginRequired", "1");
    return NextResponse.redirect(signInUrl);
  }

  // If user is authenticated and trying to access auth pages, redirect to dashboard
  if (isAuthPath && token && user) {
    console.log(
      "✅ Redirecting authenticated user from auth page to dashboard"
    );
    const dashboardUrl = new URL("/dashboard", request.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Allow the request to continue
  console.log("✅ Allowing request to continue");
  return NextResponse.next();
}

// Configure which paths the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files (images, etc.)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
