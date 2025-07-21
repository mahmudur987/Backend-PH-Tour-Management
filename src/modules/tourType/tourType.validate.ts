import z from "zod";

export const createTourTypeZodSchema = z.object({
  name: z
    .string({
      required_error: "name is required",
      invalid_type_error: "name must be a string",
    })
    .min(3, { message: "name must be at least 3 characters long" })
    .max(100, { message: "name cannot exceed 100 characters" }),
});
