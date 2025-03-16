import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import MessageBubble from "../components/MessageBubble";

import Button from "../components/Button";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import { useAuthStore } from "../store/useAuthStore";
import MessageInput from "../components/MessageInput";
import SmileyIcon from "../icons/SmileyIcon";
import ArrowupIcon from "../icons/ArrowupIcon";
import { themeClass } from "../lib/ThemeClass";

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

  // const sendMessage = () => {
  //   if (!textField) {
  //     return;
  //   }

  //   socket.emit("message", textField);
  //   setMessages((messages) => [...messages, textField]);

  //   setTextField("");
  //   setEmojiOpen(false);
  // };

  return (
    <>
      <div
        className={`h-[calc(100vh-80px)] flex flex-col justify-between p-5 px-7 `}
      >
        <div className="self-center">
          <h1 className="text-2xl"></h1>
        </div>
        <section className="flex-1 flex flex-col justify-between">
          <div>
            <div>
              {messages.map((message, index) => (
                <MessageBubble key={index} message={message} />
              ))}
            </div>
          </div>
          <div className="flex items-center">
            <MessageInput
              name="message"
              id="message"
              type="text"
              variant="chat"
              placeholder=""
              value={textField}
              onChange={(e) => setTextField(e.target.value)}
            />
            <p
              className="mx-1.5 text-3xl cursor-pointer relative"
              onClick={() => setEmojiOpen(!emojiOpen)}
            >
              <SmileyIcon className={"absolute -left-11 -top-3"} />
            </p>
            <div className="emoji-container relative">
              <EmojiPicker
                open={emojiOpen}
                className="emoji-picker -right-25 sm:-right-0 bottom-8 transition-all "
                onEmojiClick={handleEmoji}
              />
            </div>

            <Button
              text={<ArrowupIcon />}
              onClick={() => sendMessage()}
              variant="sendMessage"
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default Dashboard;
