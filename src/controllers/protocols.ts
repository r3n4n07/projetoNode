/**
 * Esse aqui terá todas as interfaces em comum entre os controllers
 */

export interface HttpResponse<T> {
  statusCode: number;
  body: T | string;
}
