// @/middleware.ts

// Next Response from Next Server
import { NextResponse } from "next/server";

// Next Request type from Next Server
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL("/add-user", request.url));
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: "/home",
};
