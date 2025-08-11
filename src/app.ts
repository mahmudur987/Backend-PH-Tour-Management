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

// // ✅ CORS options
// const corsOptions = {
//   origin: [
//     "http://localhost:3000", // Local frontend
//     "https://your-frontend.vercel.app", // Deployed frontend
//   ],
//   credentials: true, // allow cookies/auth headers
// };

app.use(cors());

// Sessions + Passport
app.use(
  expressSession({
    secret: "your secret",
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Body & cookies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express with TypeScript!");
});

// Error handling
app.use(globalErrorHandler);
app.use(notFound);

export default app;
