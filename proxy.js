import { createServerClient } from "@supabase/ssr";
import { NextResponse } from "next/server";

export async function middleware(request) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabase = createServerClient(
    process.env.SUPABASE_URL?.trim(),
    process.env.SUPABASE_PUBLISHABLE_KEY?.trim(),
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value));
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data, error } = await supabase.auth.getUser();
  const user = data?.user;

  const isAuthPage = request.nextUrl.pathname === "/admin/login";
  const isAdminPage = request.nextUrl.pathname.startsWith("/admin");

  if (isAdminPage && !isAuthPage && !user) {
    const loginUrl = request.nextUrl.clone();
    loginUrl.pathname = "/admin/login";
    return NextResponse.redirect(loginUrl);
  }

  if (isAuthPage && user) {
    const adminUrl = request.nextUrl.clone();
    adminUrl.pathname = "/admin";
    return NextResponse.redirect(adminUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};

