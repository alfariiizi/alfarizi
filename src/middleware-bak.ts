import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { env } from "./env";

export function middleware(request: NextRequest) {
  const url = new URL(request.nextUrl);

  if (env.DOMAIN_URL && url.hostname === "alfarizi.vercel.app") {
    const searchParams = !!url.searchParams.toString()
      ? `?${url.searchParams.toString()}`
      : "";
    const newUrl = new URL(
      `${env.DOMAIN_URL.toString().slice(0, -1)}${url.pathname}${searchParams}`,
    );
    return NextResponse.redirect(newUrl);
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - static (static files that generate by velite.js)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|static|_next/static|_next/image|favicon.ico).*)",
  ],
};
