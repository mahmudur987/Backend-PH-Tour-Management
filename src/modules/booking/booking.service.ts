import { IBooking } from "./booking.interface";
import { Booking } from "./booking.model";

const createBooking = async (booking: IBooking) => {
  const result = await Booking.create(booking);
  return result;
};

export const bookingService = {
  createBooking,
};
