import { NextResponse } from "next/server";
import { ApiResponse } from "@/types";

export function successResponse<T>(
  data: T,
  status = 200,
  correlationId?: string
): NextResponse {
  const body: ApiResponse<T> = {
    success: true,
    data,
    timestamp: new Date().toISOString(),
    correlationId,
  };
  return NextResponse.json(body, { status });
}

export function errorResponse(
  message: string,
  status = 400,
  correlationId?: string
): NextResponse {
  const body: ApiResponse = {
    success: false,
    error: message,
    timestamp: new Date().toISOString(),
    correlationId,
  };
  return NextResponse.json(body, { status });
}