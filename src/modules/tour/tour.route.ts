import { Router } from "express";
import { tourController } from "./tour.controller";

const router = Router();

router.post("/createTour", tourController.createTour);
router.get("/", tourController.getAllTour);
router.get("/:id", tourController.getTourById);

export const tourRoute = router;
