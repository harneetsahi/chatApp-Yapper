import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Button from "./Button";
import ArrowupIcon from "../icons/ArrowupIcon";
import SmileyIcon from "../icons/SmileyIcon";
import MessageInput from "./MessageInput";
import MessageBubble from "./MessageBubble";
import { useAuthStore } from "../store/useAuthStore";
import { useState } from "react";
import { useChatStore } from "../store/useChatStore";

function ChatBox() {
  const { selectedUser, messages, getMessages } = useChatStore();

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [textField, setTextField] = useState("");

  const handleEmoji = (e: EmojiClickData) => {
    setTextField((prev) => prev + e.emoji);
    setEmojiOpen(false);
  };
  return (
    <>
      <div className="h-full flex flex-col justify-between">
        <div className="dark:bg-neutral-950/40 bg-orange-200/40 p-4">
          <h1 className="text-md">
            {selectedUser?.firstName} {selectedUser?.lastName}
          </h1>
        </div>
        <div className={`h-full  md:px-7 p-2 `}>
          <section className="h-full flex flex-col justify-between py-1 md:py-2 transition-all ">
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
