import z from "zod";

export const createDivisionZodSchema = z.object({
  name: z
    .string({ invalid_type_error: "Name must be a string" })
    .min(2, { message: "Name must be at least 2 characters" })
    .max(50, { message: "Name cannot exceed 50 characters" }),

  thumbnail: z
    .string({ invalid_type_error: "thumbnail must be a string" })
    .optional(),

  description: z
    .string({ invalid_type_error: "Address must be a string" })
    .min(5, { message: "Address must be at least 5 characters" })
    .max(1000, { message: "Address cannot exceed 100 characters" })
    .optional(),
});
export const updateDivisionSchema = z.object({
  name: z.string().min(1).optional(),
  thumbnail: z.string().optional(),
  description: z.string().optional(),
});
