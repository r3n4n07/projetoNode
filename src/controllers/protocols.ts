/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Esse aqui terá todas as interfaces em comum entre os controllers
 */

import { ZodIssue } from "zod";

export interface HttpResponse<T> {
  statusCode: HttpStatusCode;
  body: T | ZodIssue[];
}

export interface HttpRequest<B> {
  params?: any;
  headers?: any;
  body?: B;
}

export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  BAD_RESQUEST = 400,
  SERVER_ERROR = 500,
}

export interface IController {
  handle(httpRequest: HttpRequest<unknown>): Promise<HttpResponse<unknown>>;
}
