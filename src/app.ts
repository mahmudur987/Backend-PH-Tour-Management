import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./routes/modules.route";
import { globalErrorHandler } from "./middleware/globalError";
import { notFound } from "./middleware/notFound";
const app = express();

// middleware
app.use(express.json());
app.use(cors());

app.use("api/v1/user", router);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from Express with TypeScript!");
});

app.use(globalErrorHandler);
app.use(notFound);

export default app;
