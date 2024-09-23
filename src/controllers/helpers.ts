import { HttpResponse, HttpStatusCode } from "./protocols";

export const okResponse = <T>(body: unknown): HttpResponse<T> => ({
  statusCode: HttpStatusCode.OK,
  body,
});

export const created = <T>(body: unknown): HttpResponse<T> => ({
  statusCode: HttpStatusCode.CREATED,
  body,
});

export const badRequest = (message: string): HttpResponse<string> => ({
  statusCode: HttpStatusCode.BAD_RESQUEST,
  body: message,
});

export const serverError = (): HttpResponse<string> => {
  return {
    statusCode: HttpStatusCode.SERVER_ERROR,
    body: "Something went wrong",
  };
};
