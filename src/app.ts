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
const whitelist = [
  "http://localhost:3000",
  "http://localhost:3001",
  "https://example.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
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
