// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   // console.log(
//   //   "Middleware triggered for:",
//   //   request.nextUrl.pathname,
//   //   localStorage.getItem("accessToken")
//   // );
//   // if (request.nextUrl.pathname === "/") {
//   //   const isAuthorized = false; // Placeholder for actual authorization logic
//   //   if (isAuthorized) {
//   //     return NextResponse.redirect(new URL("/chat", request.url));
//   //   }
//   //   return NextResponse.redirect(new URL("/login", request.url));
//   // }
//   // if (request.nextUrl.pathname.startsWith("/chat")) {
//   //   const isAuthorized = true; // Placeholder for actual authorization logic
//   //   if (isAuthorized) {
//   //     return NextResponse.next();
//   //   }
//   //   return NextResponse.redirect(new URL("/login", request.url));
//   // }
//   // if (request.nextUrl.pathname.startsWith("/login")) {
//   //   const isAuthorized = false; // Placeholder for actual authorization logic
//   //   if (isAuthorized) {
//   //     return NextResponse.redirect(new URL("/chat", request.url));
//   //   }
//   //   return NextResponse.next();
//   // }
//   // if (request.nextUrl.pathname.startsWith("/signup")) {
//   //   const isAuthorized = false; // Placeholder for actual authorization logic
//   //   if (isAuthorized) {
//   //     return NextResponse.redirect(new URL("/chat", request.url));
//   //   }
//   //   return NextResponse.next();
//   // }
// }

// export const config = {
//   matcher: ["/", "/login", "/signup"],
// };
