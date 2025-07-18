import { Router } from "express";
import { userRoute } from "../modules/user/user.route";
import { authRoute } from "../modules/auth/auth.route";
import { divisionRoute } from "../modules/division/division.route";
import { tourRoute } from "../modules/tour/tour.route";
import { tourTypeRoute } from "../modules/tourType/tourType.route";

export const router = Router();

const Routes = [
  {
    path: "/user",
    route: userRoute,
  },
  {
    path: "/auth",
    route: authRoute,
  },
  {
    path: "/division",
    route: divisionRoute,
  },
  {
    path: "/tourType",
    route: tourTypeRoute,
  },
  {
    path: "/tour",
    route: tourRoute,
  },
];

Routes.forEach((route) => {
  router.use(route.path, route.route);
});
