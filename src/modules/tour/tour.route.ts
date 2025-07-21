import { Router } from "express";
import { tourController } from "./tour.controller";
import { verifyAdmin } from "../../middleware/verifyAdmin";

const router = Router();

router.post("/createTour", tourController.createTour);
router.get("/", tourController.getAllTour);
router.get("/:id", tourController.getTourById);
router.patch("/:id", verifyAdmin("Admin"), tourController.updateTour);
router.delete("/:id", verifyAdmin("Admin"), tourController.updateTour);

export const tourRoute = router;
