import express, { Request, Response } from "express";
import cors from "cors";

import { globalErrorHandler } from "./middleware/globalError";
import { notFound } from "./middleware/notFound";
import { router } from "./routes/modules.route";
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use("/api/v1/", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express with TypeScript!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
