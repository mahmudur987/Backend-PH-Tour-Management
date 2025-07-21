import { Router } from "express";
import { tourController } from "./tour.controller";
<<<<<<< HEAD
import { verifyAdmin } from "../../middleware/verifyAdmin";
=======
>>>>>>> a8f352ed112d4816a66845392bd4d499c22a57e9

const router = Router();

router.post("/createTour", tourController.createTour);
router.get("/", tourController.getAllTour);
router.get("/:id", tourController.getTourById);
<<<<<<< HEAD
router.patch("/:id", verifyAdmin("Admin"), tourController.updateTour);
router.delete("/:id", verifyAdmin("Admin"), tourController.updateTour);
=======
>>>>>>> a8f352ed112d4816a66845392bd4d499c22a57e9

export const tourRoute = router;
