import { Router } from "express";
import {
  signin,
  signout,
  signup,
  checkAuth,
} from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/signout", signout);
authRouter.get("/check", authMiddleware, checkAuth);

export default authRouter;
