import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import { connectDB } from "./db/db";
import authRouter from "./routes/auth.route";
import messageRouter from "./routes/message.route";

dotenv.config();
const app = express();
const httpServer = createServer(app);

const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin:
      `${process.env.NODE_ENV}` === "production"
        ? false
        : ["http://localhost:5173", "http://127.0.0.1:5173"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use("/api/auth", authRouter);
app.use("/api/message", messageRouter);

// const io = new Server(httpServer, {
//   cors: {
//     origin:
//       process.env.NODE_ENV === "production"
//         ? false
//         : ["http://localhost:5173", "http://127.0.0.1:5173"],
//   },
// });

// io.on("connection", (socket) => {
//   console.log("new connection", socket.id);
//   socket.on("error", console.error);

//   socket.on("message", ({ message }: { message: string }) => {
//     console.log("new message " + message);
//     io.emit("new message " + message);
//   });
// });

httpServer.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
  connectDB();
});
