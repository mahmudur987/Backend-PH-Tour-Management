import { Types } from "mongoose";
import AppError from "../../errorHandler/AppError";
import { Tour } from "../tour/tour.model";
import { User } from "../user/user.model";
import { BookingStatus, IBooking } from "./booking.interface";
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { ISslCommerz } from "../../ssl_commerz/ssslCommerz.interface";
import { sslCommerzService } from "../../ssl_commerz/sslCommerz.service";

const getTransactionId = () => {
  return `tran_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
};

const createBooking = async (booking: Partial<IBooking>, userId: string) => {
  const session = await Booking.startSession();
  session.startTransaction();

  try {
    // Validate user
    const user = await User.findById(userId).session(session);
    if (!user?.phone || !user?.address) {
      throw new AppError(
        400,
        "User phone number and address are required. Please update your profile."
      );
    }

    // Validate tour
    const tour = await Tour.findById(booking.tour).session(session);
    if (!tour) throw new AppError(404, "Tour not found");
    if (!tour.costFrom) throw new AppError(400, "Tour cost is missing");

    // Create booking
    const [newBooking] = await Booking.create(
      [
        {
          user: userId,
          bookingStatus: BookingStatus.PENDING,
          ...booking,
        },
      ],
      { session }
    );

    // Create payment

    const totalPayment = tour.costFrom * (booking.guestCount || 1);
    const [payment] = await Payment.create(
      [
        {
          booking: newBooking._id,
          transactionId: getTransactionId(),
          amount: totalPayment,
          status: "UNPAID",
        },
      ],
      { session }
    );

    // Attach payment to booking
    const updatedBooking = await Booking.findByIdAndUpdate(
      newBooking._id,
      { payment: payment._id },
      { new: true, runValidators: true, session }
    )
      .populate("payment")
      .populate("user");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { email, phone, address, name } = updatedBooking?.user as any;

    const sslPayload: ISslCommerz = {
      address,
      amount: totalPayment,
      email,
      name,
      phone,
      transactionId: payment.transactionId,
    };
    const sslPayment = await sslCommerzService.sslPaymentInit(sslPayload);
    await session.commitTransaction();
    session.endSession();

    return {
      paymentUrl: sslPayment.GatewayPageURL,
      booking: updatedBooking,
    };
  } catch (error) {
    console.error("Booking creation failed:", error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const getAllBooking = async () => {
  const result = await Booking.find({});
  return result;
};
const getBookingById = async (id: string) => {
  const result = await Booking.findById(id);
  if (!result) {
    throw new AppError(500, "user not exist");
  }
  return result;
};

const updateBooking = async (id: string, payload: Partial<IBooking>) => {
  const result = await Booking.findByIdAndUpdate(id, payload, { new: true });
  return result;
};

const deleteBooking = async (id: string) => {
  const result = await Booking.findByIdAndDelete(id);
  return result;
};

const getUserBookings = async (userId: string) => {
  const result = await Booking.find({ user: userId });
  if (!result) {
    throw new AppError(500, "user not exist");
  }
  return result;
};

export const bookingService = {
  createBooking,
  getAllBooking,
  getBookingById,
  updateBooking,
  deleteBooking,
  getUserBookings,
};
