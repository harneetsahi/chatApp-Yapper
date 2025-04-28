import { useEffect, useRef, useState } from "react";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";

import Button from "./Button";

import MessageInput from "./MessageInput";
import ArrowupIcon from "../icons/ArrowupIcon";
import SmileyIcon from "../icons/SmileyIcon";
import defaultProfile from "../public/profile.png";

import { useChatStore } from "../store/useChatStore";
import { useAuthStore, User } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utilityFunctions";

function ChatBox({ showSidebar }: { showSidebar: boolean }) {
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
  const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    setIsMounted(true);

    if (authUser && selectedUser?._id) {
      getMessages(selectedUser._id);
      fetchMessages();
    }

    return () => {
      closeMessages();
      setIsMounted(false);
    };
  }, [authUser, selectedUser?._id, getMessages, fetchMessages, closeMessages]);

  if (!authUser) return null;

  useEffect(() => {
    if (messagesEndRef.current && messages) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleEmoji = (e: EmojiClickData) => {
    setTextField((prev) => prev + e.emoji);
    document.getElementById("message")?.focus();
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
      <section className={`flex-1 flex flex-col justify-between h-full`}>
        <div
          className={` dark:bg-zinc-900/30 bg-indigo-50/80 pt-4 pb-4 ${
            showSidebar ? "pl-6" : "pl-13"
          } border-b-1 border-indigo-50/40 dark:border-zinc-900 flex items-center gap-3 `}
        >
          <img
            src={selectedUser?.avatar || defaultProfile}
            alt=""
            className="w-7 h-7 rounded-full bg-gray-300"
          />
          <h1 className="sm:text-md text-sm font-semibold">
            {selectedUser?.firstName} {selectedUser?.lastName}
          </h1>
        </div>
        <div className={`h-full flex-1 overflow-y-scroll `}>
          <section className="h-full flex flex-col justify-between pb-16 relative bg-indigo-50/10  dark:bg-zinc-900/50 ">
            <div className="h-full">
              <div className="overflow-y-auto h-full ">
                {messages.map((message, index) => (
                  <div
                    key={message._id ?? index}
                    ref={messagesEndRef}
                    className={` chat flex flex-col py-1 md:px-5 px-3 
                      ${
                        authUser && message.senderId === (authUser as User)._id
                          ? "chat-end ml-15"
                          : "chat-start mr-15"
                      }`}
                  >
                    <div
                      className={`${
                        message.senderId === (authUser as User)._id
                          ? " rounded-br-none "
                          : " rounded-bl-none "
                      } min-w-10 py-3 px-4 rounded-2xl dark:bg-zinc-800/70 bg-indigo-100/60  text-sm tracking-wide  `}
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

            <form
              className="flex items-center absolute bottom-0 left-0 right-0 px-5 pb-5 "
              onSubmit={handleSendMessage}
            >
              <MessageInput
                name="message"
                id="message"
                type="text"
                variant="primary"
                placeholder=""
                value={textField}
                onChange={(e) => setTextField(e.target.value)}
              />
              <p
                className="mx-1.5 cursor-pointer relative "
                onClick={() => setEmojiOpen(!emojiOpen)}
              >
                <SmileyIcon className={"absolute -left-11 -top-3"} />
              </p>
              <div className="emoji-container relative">
                <EmojiPicker
                  open={emojiOpen}
                  className="emoji-picker -right-15 sm:-right-0 bottom-8 transition-all "
                  onEmojiClick={handleEmoji}
                />
              </div>

              <Button text={<ArrowupIcon />} variant="sendMessage" />
            </form>
          </section>
        </div>
      </section>
    </>
  );
}

export default ChatBox;
