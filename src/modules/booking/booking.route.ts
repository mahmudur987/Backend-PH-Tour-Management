import { Router } from "express";
import { bookingController } from "./booking.controller";

const router = Router();

router.post("/createBooking", bookingController.createBooking);
// router.get("/", bookingController.getAllBooking);
// router.get("/:id", bookingController.getBookingById);
// router.patch("/:id", verifyAdmin("Admin"), bookingController.updateBooking);
// router.delete("/:id", verifyAdmin("Admin"), bookingController.updateBooking);

export const bookingRoute = router;
