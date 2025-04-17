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
      <div className=" flex flex-col justify-between h-full  ">
        <div className=" dark:bg-zinc-900 bg-indigo-100 p-4 pl-9 ">
          <h1 className="text-md font-medium">
            {selectedUser?.firstName} {selectedUser?.lastName}
          </h1>
        </div>
        <div
          className={`h-full flex-1 overflow-y-scroll bg-indigo-50 dark:bg-zinc-800/70 `}
        >
          <section className="h-full flex flex-col justify-between pb-15  transition-all relative ">
            <div className="h-full">
              <div className="overflow-y-auto h-full ">
                {messages.map((message, index) => (
                  <div
                    key={message._id ?? index}
                    ref={messagesEndRef}
                    className={`py-2 md:px-8 px-3 border-b-1 border-indigo-100 dark:border-zinc-700/20 hover:bg-indigo-100/40 hover:dark:bg-zinc-900/20 `}
                  >
                    <div className="flex">
                      <div className="w-15 h-15 border-1 border-indigo-100 dark:border-zinc-700/50 rounded-lg text-3xl  text-indigo-500 flex justify-center items-center">
                        {message.senderId === selectedUser?._id
                          ? selectedUser?.firstName?.slice(0, 1)
                          : (authUser as User)?.firstName?.slice(0, 1)}
                      </div>
                      <div className="pl-5 flex-1">
                        <p className="text-md font-medium ">
                          {message.senderId === selectedUser?._id
                            ? selectedUser?.firstName
                            : (authUser as User)?.firstName}
                        </p>
                        <div className=" flex justify-between ">
                          <div className="py-2 flex-1">{message.text}</div>
                          <div className="md:w-30 w-15 text-right">
                            {message.createdAt && (
                              <time className="text-xs opacity-50">
                                {formatMessageTime(message.createdAt)}
                              </time>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <form
              className="flex items-center absolute bottom-0 left-0 right-0 px-5 pb-4 "
              onSubmit={handleSendMessage}
            >
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
                className="mx-1.5 text-3xl cursor-pointer relative "
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
      </div>
    </>
  );
}

export default ChatBox;
