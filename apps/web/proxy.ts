import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const protectedPaths = ["/", "/jobs:path*"];

  if (protectedPaths.some((path) => pathname.startsWith(path))) {
    const sessionCookie = request.cookies.get("better-auth.session_token");

    if (!sessionCookie) {
      return NextResponse.redirect(new URL("/sign-in", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/", "/jobs:path*"],
};
