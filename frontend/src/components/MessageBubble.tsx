function MessageBubble({ message }: { message: string }) {
  return (
    <div
      className={` w-max border-1 border-gray-800 rounded-xl rounded-bl-sm px-5 py-1  mb-2.5
        bg-zinc-900 text-yellow-400 dark:bg-orange-50 dark:text-zinc-900
        `}
    >
      {message}
    </div>
  );
}

export default MessageBubble;
