import { z } from "zod";

export const updateUserSchema = z
  .object({
    firstName: z
      .string({
        required_error: "Field first name must be at least 3 characters long",
      })
      .min(3, {
        message: "Field first name must be at least 3 characters long",
      })
      .optional(),
    lastName: z
      .string({
        required_error: "Field last name must be at least 3 characters long",
      })
      .min(3, { message: "Field last name must be at least 3 characters long" })
      .optional(),
    password: z
      .string({
        required_error: "Field password must be at least 3 characters long",
      })
      .min(3, { message: "Field password must be at least 3 characters long" })
      .optional(),
  })
  .strict({
    message:
      "Only the fields 'first name', 'last name', and 'password' can be updated.",
  })
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided",
  });

export const updateUserParamsSchema = z.string({
  required_error: "Params is required",
});
