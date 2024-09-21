import { z } from "zod";

export const userSchema = z.object({
  firstName: z
    .string({ required_error: "Field first name is required" })
    .min(3, { message: "Field first name must be at least 3 characters long" }),
  lastName: z
    .string({ required_error: "Field last name is required" })
    .min(3, { message: "Field last name must be at least 3 characters long" }),
  email: z
    .string({ required_error: "Field email is required" })
    .email({ message: "Field email is invalid" }),
  password: z
    .string({ required_error: "Field password is required" })
    .min(3, { message: "Field password must be at least 6 characters long" }),
});
