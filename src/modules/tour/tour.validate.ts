import { z } from "zod";
import mongoose from "mongoose";

export const createTourZodSchema = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title must be a string",
    })
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(100, { message: "Title cannot exceed 100 characters" }),

  slug: z
    .string({
      required_error: "Slug is required",
      invalid_type_error: "Slug must be a string",
    })
    .min(3, { message: "Slug must be at least 3 characters" }),

  description: z
    .string({ invalid_type_error: "Description must be a string" })
    .optional(),

  images: z
    .array(z.string({ message: "Each image must be a string URL" }))
    .optional(),

  location: z
    .string({ invalid_type_error: "Location must be a string" })
    .optional(),

  costFrom: z
    .number({ invalid_type_error: "Cost must be a number" })
    .nonnegative({ message: "Cost must be a positive number" })
    .optional(),

  startDate: z
    .string({ invalid_type_error: "Start date must be a string" }) // ISO string expected
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Start date must be a valid date string",
    })
    .optional(),

  endDate: z
    .string({ invalid_type_error: "End date must be a string" }) // ISO string expected
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "End date must be a valid date string",
    })
    .optional(),
  departureLocation: z.string().min(1, "Departure location is required"),
  arrivalLocation: z.string().min(1, "Arrival location is required"),

  included: z
    .array(z.string({ message: "Each item in 'included' must be a string" }))
    .optional(),

  excluded: z
    .array(z.string({ message: "Each item in 'excluded' must be a string" }))
    .optional(),

  amenities: z
    .array(z.string({ message: "Each amenity must be a string" }))
    .optional(),

  tourPlan: z
    .array(z.string({ message: "Each tour plan item must be a string" }))
    .optional(),

  maxGuest: z
    .number({ invalid_type_error: "Max guest must be a number" })
    .positive({ message: "Max guest must be greater than 0" })
    .optional(),

  minAge: z
    .number({ invalid_type_error: "Min age must be a number" })
    .nonnegative({ message: "Min age cannot be negative" })
    .optional(),

  division: z
    .string({
      required_error: "Division ID is required",
      invalid_type_error: "Division must be a string",
    })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Division must be a valid MongoDB ObjectId",
    }),

  tourType: z
    .string({
      required_error: "Tour type ID is required",
      invalid_type_error: "Tour type must be a string",
    })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Tour type must be a valid MongoDB ObjectId",
    }),
});

export const updateTourZodSchema = createTourZodSchema.partial();

export const deleteTourZodSchema = z.object({
  id: z
    .string({
      required_error: "Id is required",
      invalid_type_error: "Id must be a string",
    })
    .refine((val) => mongoose.Types.ObjectId.isValid(val), {
      message: "Id must be a valid MongoDB ObjectId",
    }),
});
