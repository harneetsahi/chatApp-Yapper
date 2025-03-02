import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;
let allSockets: WebSocket[] = [];

wss.on("connection", (socket) => {
  socket.on("error", console.error);

  allSockets.push(socket);
  userCount++;
  console.log("User connected #" + userCount);

  socket.on("message", (e) => {
    console.log("message received " + e.toString());

    allSockets.forEach((socket) => {
      socket.send(e.toString() + " : sent from the server");
    });
  });

  socket.on("disconnect", () => {
    allSockets = allSockets.filter((x) => x != socket);
  });
});
