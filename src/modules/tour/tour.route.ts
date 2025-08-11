import { Router } from "express";
import { tourController } from "./tour.controller";
import { multerUpload } from "../../config/multer.config";

const router = Router();

router.post(
  "/createTour",
  multerUpload.array("files", 10), // limit to 10 files
  tourController.createTour
);
router.patch(
  "/updateTour/:id",
  multerUpload.array("files", 10), // limit to 10 files
  tourController.updateTour
);
router.get("/", tourController.getAllTour);
router.get("/:id", tourController.getTourById);

export const tourRoute = router;
