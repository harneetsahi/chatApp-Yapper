import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
  cors: {
    origin:
      process.env.NODE_ENV === "production"
        ? false
        : ["http://localhost:5173", "http://127.0.0.1:5173"],
  },
});

io.on("connection", (socket) => {
  socket.on("error", console.error);

  socket.on("message", ({ message }: { message: string }) => {
    console.log("new message " + message);
    io.emit("new message " + message);
  });
});

httpServer.listen(3000, () => console.log("listening on port 3000"));
