import { useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import Button from "./Button";

import MessageInput from "./MessageInput";
import ArrowupIcon from "../icons/ArrowupIcon";
import SmileyIcon from "../icons/SmileyIcon";

import { useChatStore } from "../store/useChatStore";
import { useAuthStore, User } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

function ChatBox() {
  const { authUser } = useAuthStore();
  const {
    selectedUser,
    messages,
    getMessages,
    sendMessage,
    fetchMessages,
    closeMessages,
  } = useChatStore();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [emojiOpen, setEmojiOpen] = useState(false);
  const [textField, setTextField] = useState("");

  useEffect(() => {
    if (selectedUser?._id) {
      getMessages(selectedUser._id);
      fetchMessages();
    }

    return () => closeMessages();
  }, [selectedUser?._id, getMessages, fetchMessages, closeMessages]);

  useEffect(() => {
    if (messagesEndRef.current && messages) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleEmoji = (e: EmojiClickData) => {
    setTextField((prev) => prev + e.emoji);
    setEmojiOpen(false);
  };

  const handleSendMessage = async (e: React.MouseEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!textField) {
      document.getElementById("message")?.focus();
      return;
    }

    try {
      await sendMessage({
        text: textField,
      });
      setTextField("");
    } catch (error) {
      console.log("failed to send message", error);
    }
  };

  return (
    <>
      <div className=" flex flex-col justify-between h-full ">
        <div className="dark:bg-neutral-950/40 bg-orange-200/40 p-4">
          <h1 className="text-md">
            {selectedUser?.firstName} {selectedUser?.lastName}
          </h1>
        </div>
        <div className={`h-full md:px-7 p-2 flex-1 overflow-y-scroll `}>
          <section className="h-full flex flex-col justify-between py-2 transition-all">
            <div className="h-full">
              <div className="overflow-y-auto h-full mx-2 ">
                {messages.map((message, index) => (
                  <div
                    key={message._id ?? index}
                    ref={messagesEndRef}
                    className={`chat flex flex-col ${
                      message.senderId === (authUser as User)._id
                        ? "chat-end"
                        : "chat-start"
                    }`}
                  >
                    {/* <div className="chat-header">Harneet</div> */}
                    <div
                      className={`${
                        message.senderId === (authUser as User)._id
                          ? " rounded-br-none"
                          : " rounded-bl-none"
                      } py-2 px-4 rounded-2xl dark:bg-zinc-800 bg-orange-200  dark:text-yellow-600`}
                    >
                      {message.text}
                    </div>
                    <div>
                      {message.createdAt && (
                        <time className="text-xs opacity-50">
                          {formatMessageTime(message.createdAt)}
                        </time>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form className="flex items-center" onSubmit={handleSendMessage}>
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

              <Button text={<ArrowupIcon />} variant="sendMessage" />
            </form>
          </section>
        </div>
      </div>
    </>
  );
}

export default ChatBox;
