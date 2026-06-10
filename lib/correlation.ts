import { v4 as uuidv4 } from "uuid";

export function generateCorrelationId(): string {
  return uuidv4();
}

export function getCorrelationId(request: Request): string {
  return (
    request.headers.get("x-correlation-id") || generateCorrelationId()
  );
}