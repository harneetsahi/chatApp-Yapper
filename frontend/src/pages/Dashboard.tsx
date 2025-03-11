import { useEffect, useRef, useState } from "react";
import MessageBubble from "../components/MessageBubble";
import Input from "../components/Input";

function Dashboard() {
  const [messages, setMessages] = useState<string[]>([]);

  const wsRef = useRef<WebSocket>(null);

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");

    wsRef.current = ws;

    ws.onmessage = (event) => {
      setMessages((messages) => [...messages, event.data]);
    };

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          type: "join",
          payload: {
            roomId: "red",
          },
        })
      );
    };

    return () => {
      ws.close();
    };
  }, []);

  const sendMessage = (): void => {
    let message = document.getElementById("message") as HTMLInputElement;

    if (!message.value) {
      message.focus();
      return;
    }

    wsRef.current?.send(
      JSON.stringify({
        type: "chat",
        payload: {
          message: message?.value,
        },
      })
    );

    message.value = "";
  };

  return (
    <>
      <div className="h-screen flex flex-col p-5 pt-13">
        <div className="self-center">
          <h1 className="text-2xl">Private Chat Room</h1>
        </div>
        <div className="flex-1 flex flex-col justify-between m-5 mt-20">
          <section>
            {messages.map((message) => (
              <MessageBubble message={message} />
            ))}
          </section>
          <div className="flex gap-3">
            <Input
              name="message"
              id="message"
              variant={"chat"}
              type="text"
              placeholder="enter your message here"
            />
            <button
              onClick={() => sendMessage()}
              className="py-2 px-4 border-1 border-gray-600 rounded-xl cursor-pointer"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
