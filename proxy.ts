import { NextRequest, NextResponse } from "next/server";
import { verifyAccessToken } from "@/lib/auth";
import { generateCorrelationId } from "@/lib/correlation";

const protectedRoutes = [
  "/api/cart",
  "/api/orders",
  "/api/auth/me",
  "/api/auth/logout",
];

const adminRoutes = ["/api/admin"];

export function proxy(request: NextRequest) {
  const correlationId =
    request.headers.get("x-correlation-id") || generateCorrelationId();

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-correlation-id", correlationId);

  const { pathname } = request.nextUrl;

  const isProtected = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );
  const isAdmin = adminRoutes.some((route) => pathname.startsWith(route));

  if (isProtected || isAdmin) {
    const token = request.cookies.get("access_token")?.value;

    if (!token) {
      return NextResponse.json(
        { success: false, error: "Unauthorized", timestamp: new Date().toISOString() },
        { status: 401, headers: { "x-correlation-id": correlationId } }
      );
    }

    try {
      const payload = verifyAccessToken(token);

      if (isAdmin && payload.role !== "admin") {
        return NextResponse.json(
          { success: false, error: "Forbidden", timestamp: new Date().toISOString() },
          { status: 403, headers: { "x-correlation-id": correlationId } }
        );
      }

      requestHeaders.set("x-user-id", String(payload.sub));
      requestHeaders.set("x-user-role", payload.role);

    } catch {
      return NextResponse.json(
        { success: false, error: "Invalid token", timestamp: new Date().toISOString() },
        { status: 401, headers: { "x-correlation-id": correlationId } }
      );
    }
  }

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("x-correlation-id", correlationId);
  return response;
}

export const config = {
  matcher: ["/api/:path*", "/(shop)/:path*", "/(admin)/:path*"],
};