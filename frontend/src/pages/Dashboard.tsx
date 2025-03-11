import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import MessageBubble from "../components/MessageBubble";
import Input from "../components/Input";
import Button from "../components/Button";
import EmojiPicker from "emoji-picker-react";

function Dashboard() {
  const [messages, setMessages] = useState<string[]>([]);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [textField, setTextField] = useState("");

  const dispatch = useDispatch();
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

  const handleEmoji = (e) => {
    setTextField((prev) => prev + e.emoji);
    setEmojiOpen(false);
  };

  const sendMessage = (): void => {
    let message = document.getElementById("message") as HTMLInputElement;

    if (!textField) {
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
    setTextField("");
    setEmojiOpen(false);
  };

  return (
    <>
      <div className="h-screen flex flex-col p-5 pt-13">
        <div className="self-center">
          <h1 className="text-2xl">Private Chat Room</h1>
        </div>
        <section className="flex-1 flex flex-col justify-between m-5 mt-20">
          <div>
            <div>
              {messages.map((message) => (
                <MessageBubble message={message} />
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Input
              name="message"
              id="message"
              variant={"chat"}
              type="text"
              placeholder="enter your message here"
              value={textField}
              onChange={(e) => setTextField(e.target.value)}
            />

            <p
              className="mx-3 text-3xl text-orange-300 cursor-pointer"
              onClick={() => setEmojiOpen(!emojiOpen)}
            >
              🙂
            </p>
            <div className="emoji-container relative">
              <EmojiPicker
                open={emojiOpen}
                className="emoji-picker -right-25 sm:-right-0 bottom-8 transition-all "
                onEmojiClick={handleEmoji}
              />
            </div>

            <Button text="Send" onClick={() => sendMessage()} variant="chat" />
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
