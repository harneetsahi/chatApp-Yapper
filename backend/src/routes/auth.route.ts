import { Router } from "express";
import {
  signin,
  signout,
  signup,
  checkAuth,
  updateProfile,
  updatePassword,
} from "../controllers/auth.controller";
import authMiddleware from "../middleware/auth.middleware";
import { upload } from "../middleware/multer.middleware";

const authRouter = Router();

authRouter.post("/signup", signup);
authRouter.post("/signin", signin);
authRouter.post("/signout", authMiddleware, signout);
authRouter.patch(
  "/updateProfile",
  authMiddleware,
  upload.single("avatar"),
  updateProfile
);
authRouter.get("/check", authMiddleware, checkAuth);
authRouter.post("/updatePassword", authMiddleware, updatePassword);

export default authRouter;
