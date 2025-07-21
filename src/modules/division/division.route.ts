import { Router } from "express";
import { divisionController } from "./division.controller";
import { validateRequest } from "../../middleware/validateRequest";
import { createDivisionZodSchema } from "./division.validate";
import { verifyAdmin } from "../../middleware/verifyAdmin";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/createDivisions",
  validateRequest(createDivisionZodSchema),
  divisionController.createDivisions
);
router.get("/", divisionController.getAllDivisions);
router.get("/:id", divisionController.getDivisionById);
router.patch(
  "/:id",
  verifyAdmin(...Object.values(Role)),
  divisionController.updateDivision
);

export const divisionRoute = router;
