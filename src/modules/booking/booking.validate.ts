import { z } from "zod";
import { BookingStatus } from "./booking.interface";

export const createBookingZodSchema = z.object({
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
    })
    .optional(),
});

export const updateBookingZodSchema = z.object({
  bookingStatus: createBookingZodSchema.shape.bookingStatus.optional(),
});
