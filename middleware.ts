// // @/middleware.ts

// // Import NextResponse to control the response (redirects, rewrites, etc.)
// import { NextResponse } from "next/server";

// // Import NextRequest type for better type safety
// import type { NextRequest } from "next/server";

// // Store
// import { useUserStore } from "@/lib/store/useStore";

// // Utility
// import api from "@/lib/axios/axios.client";

// // Define which routes are public and should not be protected
// const publicRoutes = ["/", "/api/auth/login", "/api/auth/verify"];

// /**
//  * Middleware function to run before route handling.
//  * It runs at the edge and must be synchronous.
//  */
// export function middleware(request: NextRequest) {
//   // Extract the pathname from the request URL
//   const { pathname } = request.nextUrl;

//   // Store
//   const { setName } = useUserStore();

//   // Match if the route is not the public route
//   if (!publicRoutes.includes(pathname)) {
//     // Check if user is already logged in
//     (async () => {
//       try {
//         // Make a request to check if the user is already logged in
//         const res = await api.get("/auth/validate");

//         // If the user is logged in, set the name in the store
//         if (res.status === 200) {
//           setName(res.data.admin);
//         } else {
//           // If the user is not logged in, redirect to login
//           return NextResponse.redirect("/login");
//         }
//       } catch {
//         // If error, redirect to login
//         return NextResponse.redirect("/login");
//       }
//     })();
//   }

//   // If all things are correct then forward request to the next call
//   return NextResponse.next();
// }

// /**
//  * Matcher config:
//  * This ensures middleware runs for all routes
//  * except for static files like _next/static, _next/image, favicon, etc.
//  */

// // Config to match routes for middleware application
// export const config = {
//   matcher: [
//     // Match all routes except Next.js internals and static files
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     // Always apply middleware for API routes
//     "/(api|trpc)(.*)",
//   ],
// };
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import api from "@/lib/axios/axios.client";

// Define your public routes
const publicRoutes = [
  "/",
  "/api/auth/log-out",
  "/api/auth/login",
  "/api/auth/validate",
  "/api/auth/verify",
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // // Get auth token from cookies
  // const token = request.cookies.get("token")?.value;

  // // If no token, redirect to login
  // if (!token) {
  //   return NextResponse.redirect(new URL("/login", request.url));
  // }

  // Validate token with backend using fetch (safe for Edge Runtime)
  try {
    const res = await api.get("/auth/validate");

    if (res.status === 200) {
      // Token is valid → continue
      return NextResponse.next();
    } else {
      // Token invalid → redirect to login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  } catch (error) {
    // Any error → redirect to login
    return NextResponse.redirect(new URL("/login", request.url));
  }
}
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:jpg|jpeg|png|gif|webp|svg|css|js|woff2?|ttf|eot)).*)",
    "/api/:path*",
  ],
};
