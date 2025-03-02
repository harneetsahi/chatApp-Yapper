import { useEffect, useRef, useState } from "react";

function App() {
  const [messages, setMessages] = useState(["hi", "holl"]);

  const wsRef = useRef();

  useEffect(() => {
    const ws = new WebSocket("http://localhost:8080");

    ws.onmessage = (event) => {
      setMessages((messages) => [...messages, event.data]);
    };

    wsRef.current = ws;
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

  const sendMessage = () => {
    let message = document.getElementById("message");

    wsRef.current.send(
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
      <div className="h-screen bg-slate-900 text-gray-300 flex flex-col  p-5">
        <div className="self-center">
          <h1>Chat App</h1>
        </div>
        <div className="flex-1 flex flex-col justify-between m-5 mt-10">
          <section>
            {messages.map((message) => (
              <div className="w-max border-1 border-gray-800 rounded-xl px-5 py-1 bg-amber-700 mb-2.5">
                {message}
              </div>
            ))}
          </section>
          <div className="flex gap-3">
            <input
              id="message"
              className="py-2 px-4 border-1 border-gray-600 rounded-xl w-full font-light"
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

export default App;
