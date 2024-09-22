/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Esse aqui terá todas as interfaces em comum entre os controllers
 */

import { ZodIssue } from "zod";

export interface HttpResponse<T> {
  statusCode: number;
  body: T | ZodIssue[];
}

export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
