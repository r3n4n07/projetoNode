import { z } from "zod";

export const getUserSchema = z.string({ required_error: "Id is required" });
