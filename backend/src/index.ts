import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import authRouter from "./routes/auth.route";

const app = express();
const httpServer = createServer(app);
const PORT = process.env.PORT;

app.use(express.json());

app.use("/api/auth", authRouter);

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

httpServer.listen(PORT, () => console.log("listening on port " + PORT));
