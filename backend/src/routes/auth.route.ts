import { Router } from "express";
import {
  signin,
  signout,
  signup,
  checkAuth,
  updateProfile,
} from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/signout", signout);
authRouter.put(
  "/updateProfile",
  authMiddleware,
  upload.single("avatar"),
  updateProfile
);
authRouter.get("/check", authMiddleware, checkAuth);

export default authRouter;
