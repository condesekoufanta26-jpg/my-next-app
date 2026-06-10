import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  return Response.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV,
  });
}
