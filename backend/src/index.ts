import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

interface User {
  socket: WebSocket;
  room: string;
}

let userCount = 0;
let allSockets: User[] = [];

// {
//   "type" : "join",
//   "payload" : {
//     "roomId" : "123"
//   }
// }

// {
//   "type" : "chat",
//   "payload" : {
//     "message" : "Hi there"
//   }
// }

wss.on("connection", (socket) => {
  socket.on("error", console.error);

  socket.on("message", (message) => {
    // @ts-ignore
    const parsedMessage = JSON.parse(message);

    if (parsedMessage.type === "join") {
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId,
      });
    }

    if (parsedMessage.type === "chat") {
      const currentUserRoom = allSockets.find((x) => x.socket == socket)?.room;

      allSockets.forEach((x) => {
        if (x.room == currentUserRoom) {
          x.socket.send(parsedMessage.payload.message);
        }
      });
    }
  });
});
