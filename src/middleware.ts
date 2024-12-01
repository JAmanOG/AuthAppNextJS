import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  //to know which path you are on
  const path = request.nextUrl.pathname;
  // to find which is public path which is not
  const isPublicPath = path === "/login" || path === "/signup" || path === "/verifyemail";
  //grab a token
  const getToken = request.cookies.get("token")?.value || "";

  //if user is not logged in and trying to access private route
  // if(isPublicPath && getToken){
  //     return NextResponse.redirect('/profile');
  // }

  //more explicit way: its grantee that user will reach to correct route
  if (isPublicPath && getToken) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  //if user is not authenticate it will redirect to login page

  if (!isPublicPath && !getToken) {
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }
}

export const config = {
  matcher: ["/", "/login", "/profile","/profile/:id", "/logout", "/signup"
    ,'/verifyemail'
  ],
};
