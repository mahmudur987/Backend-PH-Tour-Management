import { Router } from "express";
import { tourController } from "./tour.controller";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post(
  "/createTour",
  multerUpload.array("files"),
  tourController.createTour
);
router.get("/", tourController.getAllTour);
router.get("/:id", tourController.getTourById);

export const tourRoute = router;
