import { NextRequest, NextResponse } from "next/server";

const apiUrl = "http://127.0.0.1:8000/user/";
export async function middleware(req: NextRequest) {
    console.log("Middleware triggered");
    const token = req.cookies.get("jwt-token")?.value;
  
    const url = req.nextUrl.clone();
    console.log("Requested URL: ", url.pathname);
  
    if (url.pathname === "/") {
      console.log("Redirecting to login");
      return NextResponse.redirect(new URL("/login", req.url));
    }
  
    const protectedRoutes = ["/adminpage","/professeurpage"];
  
    if (token) {
      try {
        const res = await fetch(apiUrl, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });
  
        if (!res.ok) {
          console.log("Token verification failed");
          localStorage.removeItem('jwt-token');
          return NextResponse.redirect(new URL("/login", req.url));
        }
  
        const user = await res.json();
  
        if (!user) {
          console.log("No user found");
          localStorage.removeItem('jwt-token');
          return NextResponse.redirect(new URL("/login", req.url));
        }
      } catch (error) {
        console.error("Error fetching user", error);
        localStorage.removeItem('jwt-token');
        return NextResponse.redirect(new URL("/login", req.url));
      }
    }
  
    if (!token && protectedRoutes.includes(url.pathname)) {
      console.log("No token, redirecting to login");
      // return NextResponse.redirect(new URL("/login", req.url));
    }
  
    return NextResponse.next();
  }
  