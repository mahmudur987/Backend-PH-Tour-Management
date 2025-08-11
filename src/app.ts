import express, { Request, Response } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/globalError";
import { notFound } from "./middleware/notFound";
import { router } from "./routes/modules.route";
import passport from "passport";
import expressSession from "express-session";
import "./config/passport";
const app = express();

// middleware
app.use(
  expressSession({
    secret: "your secrete",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:3000", // Local frontend
      "https://your-frontend.vercel.app", // Deployed frontend
    ],
    credentials: true, // if you're using cookies/auth headers
  })
);
app.use(express.urlencoded({ extended: true }));
app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express with TypeScript!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
