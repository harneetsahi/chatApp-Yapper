import { Router } from "express";
import {
  signin,
  signout,
  signup,
  checkAuth,
  updateProfile,
  updatePassword,
  removeAvatar,
} from "../controllers/auth.controller.js";
import authMiddleware from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middleware.js";

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
authRouter.delete("/removeAvatar", authMiddleware, removeAvatar);
authRouter.get("/check", authMiddleware, checkAuth);
authRouter.post("/updatePassword", authMiddleware, updatePassword);

export default authRouter;
