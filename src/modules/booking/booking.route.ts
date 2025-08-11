import { Router } from "express";
import { bookingController } from "./booking.controller";
import { verifyAdmin } from "../../middleware/verifyAdmin";
import { Role } from "../user/user.interface";
import { validateRequest } from "../../middleware/validateRequest";
import { createBookingZodSchema } from "./booking.validate";

const router = Router();

router.post(
  "/createBooking",
  verifyAdmin(Role.ADMIN, Role.SUPER_ADMIN),
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
  verifyAdmin(Role.ADMIN, Role.SUPER_ADMIN),
  bookingController.getBookingById
);
router.get(
  "/userBookings",
  verifyAdmin(Role.ADMIN, Role.SUPER_ADMIN),
  bookingController.getUserBookings
);
router.patch(
  "/:id",
  verifyAdmin(Role.ADMIN, Role.SUPER_ADMIN),
  bookingController.updateBooking
);
router.delete(
  "/:id",
  verifyAdmin(Role.ADMIN, Role.SUPER_ADMIN),
  bookingController.deleteBooking
);

export const bookingRoute = router;
