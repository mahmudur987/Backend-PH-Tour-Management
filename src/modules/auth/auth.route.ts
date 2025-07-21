import { Router } from "express";

import { authController } from "./auth.controller";
import { verifyAdmin } from "../../middleware/verifyAdmin";
import { Role } from "../user/user.interface";
import passport from "passport";

const route = Router();

route.post("/login", authController.credentialLogin);

route.post("/refreshToken", authController.getNewAccessToken);
route.post("/logout", authController.logOut);
route.post(
  "/resetPassword",
  verifyAdmin(...Object.values(Role)),
  authController.resetPassword
);
route.get("/google", async (req, res, next) => {
  const redirect = req.query.redirect;
  passport.authenticate("google", {
    scope: ["profile", "email"],
    state: redirect as string,
  })(req, res, next);
});
route.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  authController.googleCallbackController
);
export const authRoute = route;
