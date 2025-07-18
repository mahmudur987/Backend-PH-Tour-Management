import { Router } from "express";
import { divisionController } from "./division.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDivisionZodSchema } from "./division.validate";

const router = Router();

router.post(
  "/createDivisions",
  validateRequest(createDivisionZodSchema),
  divisionController.createDivisions
);
router.get("/", divisionController.getAllDivisions);
router.get("/:id", divisionController.getDivisionById);

export const divisionRoute = router;
