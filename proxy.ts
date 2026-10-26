import { NextRequest, NextResponse } from "next/server";
import { auth0 } from "./app/lib/auth/auth0";

export async function proxy(request: Request | NextRequest) {
  if (request.headers.has("next-action")) {
    return NextResponse.next();
  }
    const authResponse = await auth0.middleware(request);
    return authResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};