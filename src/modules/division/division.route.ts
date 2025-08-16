import { Router } from "express";
import { divisionController } from "./division.controller";
import { validateRequest } from "../../middleware/validateRequest";
import {
  createDivisionZodSchema,
  updateDivisionSchema,
} from "./division.validate";
import { multerUpload } from "../../config/multer.config";
import { CheckRole } from "../../middleware/checkRole";
import { Role } from "../user/user.interface";

const router = Router();

router.post(
  "/createDivision",
  multerUpload.single("file"),
  validateRequest(createDivisionZodSchema),
  CheckRole(Role.ADMIN, Role.SUPER_ADMIN),
  divisionController.createDivisions
);
router.get("/", divisionController.getAllDivisions);
router.get("/:id", divisionController.getDivisionById);
router.delete("/:id", divisionController.deleteDivisions);
router.patch(
  "/:id",
  multerUpload.single("file"),
  validateRequest(updateDivisionSchema),
  CheckRole(Role.ADMIN, Role.SUPER_ADMIN),
  divisionController.updateDivisions
);

export const divisionRoute = router;
