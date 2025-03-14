import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MessageBubble from "../components/MessageBubble";
import Input from "../components/Input";
import Button from "../components/Button";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useAuthStore } from "../store/useAuthStore";

function Dashboard() {
  const { authUser } = useAuthStore();

  const [messages, setMessages] = useState<string[]>(["hi"]);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [textField, setTextField] = useState("");

  // const socket = io("ws://localhost:3000");
  // useEffect(() => {
  //   socket.on("message", (event) => {
  //     setMessages((messages) => [...messages, event.data]);
  //     console.log(messages);
  //   });

  //   return () => {
  //     socket.off("message");
  //   };
  // }, []);

  const handleEmoji = (e: EmojiClickData) => {
    setTextField((prev) => prev + e.emoji);
    setEmojiOpen(false);
  };

  const sendMessage = () => {
    if (!textField) {
      return;
    }

    socket.emit("message", textField);
    setMessages((messages) => [...messages, textField]);

    setTextField("");
    setEmojiOpen(false);
  };

  return (
    <>
      <div className="h-full flex flex-col justify-between p-5">
        <div className="self-center">
          <h1 className="text-2xl">Private Chat Room</h1>
        </div>
        <section className="flex-1 flex flex-col justify-between m-5 mt-20">
          <div>
            <div>
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <Input
              name="message"
              id="message"
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
