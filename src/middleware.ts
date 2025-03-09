import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
    
    const url = req.nextUrl.clone();
    console.log("Requested URL: ", url.pathname);
  
    if (url.pathname === "/") {
      console.log("Redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  
  }
  