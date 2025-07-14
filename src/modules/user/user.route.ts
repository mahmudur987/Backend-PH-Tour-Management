import { Router } from "express";
import { userController } from "./user.controller";

import { createUserZodSchema } from "./user.validate";
import { validateRequest } from "../../middleware/validateRequest";
import { verifyAdmin } from "../../middleware/verifyAdmin";
import { Role } from "./user.interface";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserZodSchema),
  userController.createUser
);
router.get("/", verifyAdmin(Role.ADMIN), userController.getAllUsers);

export const userRoute = router;
