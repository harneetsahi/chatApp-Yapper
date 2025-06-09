import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getRecentChats,
  getMessages,
  sendMessage,
} from "../controllers/chat.controller.js";

const messageRouter = Router();

messageRouter.get("/chats", authMiddleware, getRecentChats);

messageRouter.get("/:id", authMiddleware, getMessages);

messageRouter.post("/send/:id", authMiddleware, sendMessage);

export default messageRouter;
