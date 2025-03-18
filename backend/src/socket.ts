import { Server } from "socket.io";
import express from "express";
import http from "http";

export const app = express();
export const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5173", "http://127.0.0.1:5173"],
  },
});

export function getReceiverSocketId(userId: string): string {
  return userSocketMap[userId];
}

const userSocketMap: Record<string, string> = {};

io.on("connection", (socket) => {
  console.log("new connection", socket.id);
  socket.on("error", console.error);

  const userId = socket.handshake.query.userId;
  // @ts-ignore
  if (userId) userSocketMap[userId] = socket.id;

  socket.on("message", ({ message }: { message: string }) => {
    console.log("new message " + message);
    io.emit("new message " + message);
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected", socket.id);
  });
});
