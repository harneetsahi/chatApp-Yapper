function MessageBubble({ message }: { message: string }) {
  return (
    <div className="w-max border-1 border-gray-800 rounded-xl rounded-bl-sm px-5 py-1 bg-green-800 mb-2.5">
      {message}
    </div>
  );
}

export default MessageBubble;
