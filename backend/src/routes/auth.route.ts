import { Router } from "express";
import { signin, signout, signup } from "../controllers/auth.controller";
// import auth from "../middleware/auth";

const authRouter = Router();

// @ts-ignore
authRouter.post("/signup", signup);
// @ts-ignore
authRouter.post("/signin", signin);
// @ts-ignore
authRouter.post("/signout", signout);

export default authRouter;
