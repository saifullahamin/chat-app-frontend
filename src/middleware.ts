import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  const isRoot = request.nextUrl.pathname === "/";

  if (!refreshToken && isDashboard) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const verifyTokenResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/verify-token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: `accessToken=${accessToken}; refreshToken=${refreshToken}`,
        },
      }
    );

    if (verifyTokenResponse.status === 200) {
      const data = await verifyTokenResponse.json();

      const response = NextResponse.next();

      if (data.newAccessToken) {
        response.cookies.set("accessToken", data.newAccessToken, {
          httpOnly: true,
          secure: process.env.NEXT_PUBLIC_ENV === "production",
          maxAge: 15 * 60, // 15 minutes
        });
      }

      if (isRoot) {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      }

      return response;
    } else {
      if (isDashboard) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return NextResponse.next();
    }
  } catch (error) {
    console.error("Error verifying token:", error);
    if (isDashboard) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return NextResponse.next();
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/"],
};
