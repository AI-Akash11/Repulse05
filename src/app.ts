import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { pool } from "./db";
import { userRoute } from "./modules/user/user.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRoute } from "./modules/auth/auth.route";
import { logger } from "./middleware/logger";

const app: Application = express();

// Middlewares--------------------------

app.use(express.json());

app.use(logger);


app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "express server is on",
  });
});

app.use("/api/users", userRoute);

app.use("/api/profile", profileRoute);

app.use("/api/auth", authRoute);

export default app;
