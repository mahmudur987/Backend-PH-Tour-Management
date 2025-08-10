import { Router } from "express";
import { bookingController } from "./booking.controller";
import { verifyAdmin } from "../../middleware/verifyAdmin";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { createBookingZodSchema } from "./booking.validate";

const router = Router();

router.post(
  "/createBooking",
  verifyAdmin(...Object.values(Role)),
  validateRequest(createBookingZodSchema),
  bookingController.createBooking
);
router.get(
  "/",
  verifyAdmin(Role.ADMIN, Role.SUPER_ADMIN),
  bookingController.getAllBooking
);
router.get(
  "/user-booking/:id",
  verifyAdmin(...Object.values(Role)),
  bookingController.getBookingById
);
router.get(
  "/userBookings",
  verifyAdmin(...Object.values(Role)),
  bookingController.getUserBookings
);
router.patch("/:id", verifyAdmin("Admin"), bookingController.updateBooking);
router.delete("/:id", verifyAdmin("Admin"), bookingController.deleteBooking);

export const bookingRoute = router;
