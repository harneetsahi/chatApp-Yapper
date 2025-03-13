import { Router } from "express";
import authMiddleware from "../middleware/auth.middleware";
import {
  getRecentChats,
  getMessages,
  sendMessage,
} from "../controllers/chat.controller";

const messageRouter = Router();

messageRouter.get("/recent-chats", authMiddleware, getRecentChats);

messageRouter.get("/:id", authMiddleware, getMessages);

messageRouter.post("/send/:id", authMiddleware, sendMessage);

export default messageRouter;
