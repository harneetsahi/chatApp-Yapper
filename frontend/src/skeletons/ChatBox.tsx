import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Button from "../components/Button";
import ArrowupIcon from "../icons/ArrowupIcon";
import SmileyIcon from "../icons/SmileyIcon";
import MessageInput from "../components/MessageInput";
import MessageBubble from "../components/MessageBubble";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";

function ChatBox() {
  const { authUser } = useAuthStore();

  const [messages, setMessages] = useState<string[]>(["hi"]);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [textField, setTextField] = useState("");

  const handleEmoji = (e: EmojiClickData) => {
    setTextField((prev) => prev + e.emoji);
    setEmojiOpen(false);
  };
  return (
    <>
      <div className="h-full">
        <div className={`h-full flex flex-col justify-between px-7 `}>
          <div>
            <h1 className="text-md">Person's name</h1>
          </div>
          <section className="h-full flex flex-col justify-between mt-5">
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
      </div>
    </>
  );
}

export default ChatBox;
