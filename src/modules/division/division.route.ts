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
<<<<<<< HEAD
router.patch(
  "/:id",
  verifyAdmin(...Object.values(Role)),
  divisionController.updateDivision
);
=======
>>>>>>> a8f352ed112d4816a66845392bd4d499c22a57e9

export const divisionRoute = router;
