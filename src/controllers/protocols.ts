/**
 * Esse aqui terá todas as interfaces em comum entre os controllers
 */

import { ZodIssue } from "zod";

export interface HttpResponse<T> {
  statusCode: number;
  body: T | string | ZodIssue[];
}

export interface HttpRequest<B> {
  params?: unknown;
  headers?: unknown;
  body?: B;
}
