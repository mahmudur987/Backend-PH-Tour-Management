import { Types } from "mongoose";

export enum BookingStatus {
  "PENDING" = "PENDING",
  "CONFIRMED" = "CONFIRMED",
  "CANCELLED" = "CANCELLED",
  "FAILED" = "FAILED",
}

export interface IBooking {
  tour: Types.ObjectId;
  user: Types.ObjectId;
  payment?: Types.ObjectId;
  guestCount: number;
  bookingStatus: BookingStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
