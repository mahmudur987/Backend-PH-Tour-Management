/* eslint-disable @typescript-eslint/no-explicit-any */
import AppError from "../../errorHandler/AppError";
import { sslCommerzService } from "../../ssl_commerz/sslCommerz.service";
import { BookingStatus } from "../booking/booking.interface";
import { Booking } from "../booking/booking.model";
import { paymentStatus } from "./payment.interface";
import { Payment } from "./payment.model";

const successPayment = async (query: Record<string, string>) => {
  const { transactionId } = query;
  if (!transactionId) {
    throw new AppError(400, "Transaction ID is required");
  }

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const payment = await Payment.findOneAndUpdate(
      { transactionId: transactionId },
      { status: paymentStatus.PAID }
    );

    if (!payment) {
      throw new AppError(404, "Payment not found");
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      payment.booking, // booking field likely stores ObjectId
      { bookingStatus: BookingStatus.CONFIRMED },
      { new: true, runValidators: true, session }
    );

    if (!updatedBooking) {
      throw new AppError(404, "Booking not found");
    }

    await session.commitTransaction();
    session.endSession();

    return {
      success: true,
      message: "Payment successfully completed",
    };
  } catch (error) {
    console.error("Payment success processing failed:", error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const failedPayment = async (query: Record<string, string>) => {
  const { transactionId } = query;
  if (!transactionId) {
    throw new AppError(400, "Transaction ID is required");
  }

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const payment = await Payment.findOneAndUpdate(
      { transactionId: transactionId },
      { status: paymentStatus.FAILED }
    );

    if (!payment) {
      throw new AppError(404, "Payment not found");
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      payment.booking, // booking field likely stores ObjectId
      { bookingStatus: BookingStatus.FAILED },
      { new: true, runValidators: true, session }
    );

    if (!updatedBooking) {
      throw new AppError(404, "Booking not found");
    }

    await session.commitTransaction();
    session.endSession();

    return {
      success: false,
      message: "Payment failed",
    };
  } catch (error) {
    console.error("Payment success processing failed:", error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const cancelledPayment = async (query: Record<string, string>) => {
  const { transactionId } = query;
  if (!transactionId) {
    throw new AppError(400, "Transaction ID is required");
  }

  const session = await Booking.startSession();
  session.startTransaction();

  try {
    const payment = await Payment.findOneAndUpdate(
      { transactionId: transactionId },
      { status: paymentStatus.CANCELLED }
    );

    if (!payment) {
      throw new AppError(404, "Payment not found");
    }

    const updatedBooking = await Booking.findByIdAndUpdate(
      payment.booking, // booking field likely stores ObjectId
      { bookingStatus: BookingStatus.CANCELLED },
      { runValidators: true, session }
    );

    if (!updatedBooking) {
      throw new AppError(404, "Booking not found");
    }

    await session.commitTransaction();
    session.endSession();

    return {
      success: false,
      message: "Payment cancelled",
    };
  } catch (error) {
    console.error("Payment success processing failed:", error);
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

const initPayment = async (bookingId: string) => {
  const payment = await Payment.findOne({ booking: bookingId });
  if (!payment) throw new AppError(404, "Payment not found");
  const booking = await Booking.findById(payment?.booking);
  const { email, phone, address, name } = booking?.user as any;

  const sslPayload: ISslCommerz = {
    address,
    amount: payment.amount,
    email,
    name,
    phone,
    transactionId: payment.transactionId,
  };
  const sslPayment = await sslCommerzService.sslPaymentInit(sslPayload);
  return {
    paymentUrl: sslPayment.GatewayPageURL,
    booking: booking,
  };
};
export const paymentServices = {
  successPayment,
  failedPayment,
  cancelledPayment,
  initPayment,
};
