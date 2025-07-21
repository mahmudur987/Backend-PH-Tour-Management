import { z } from "zod";
import { BookingStatus } from "./booking.interface";

export const createBookingZodSchema = z.object({
  user: z.string().refine((id) => Boolean(id), {
    message: "User id is invalid",
  }),
  tour: z.string().refine((id) => Boolean(id), {
    message: "Tour id is invalid",
  }),
  guestCount: z
    .number()
    .positive()
    .int()
    .refine((value) => value > 0, {
      message: "Guest count must be greater than 0",
    }),
  bookingStatus: z
    .nativeEnum(BookingStatus)
    .refine((value) => Object.values(BookingStatus).includes(value), {
      message: `Booking status must be one of ${Object.values(
        BookingStatus
      ).join(", ")}`,
    }),
});

export const updateBookingZodSchema = z.object({
  payment: z.string().uuid().optional(),
  guestCount: createBookingZodSchema.shape.guestCount.optional(),
  bookingStatus: createBookingZodSchema.shape.bookingStatus.optional(),
});
