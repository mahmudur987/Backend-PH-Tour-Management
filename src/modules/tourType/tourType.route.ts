import { Router } from "express";
import { tourTypeController } from "./tourType.controller";

const route = Router();

route.post("/createTourType", tourTypeController.createTourType);
route.get("/", tourTypeController.getAllTourType);
route.get("/:id", tourTypeController.getTourTypeById);
route.put("/:id", tourTypeController.updateTourType);
route.delete("/:id", tourTypeController.deleteTourType);

export const tourTypeRoute = route;
