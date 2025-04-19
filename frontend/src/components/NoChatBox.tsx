import ChatIcon from "../icons/ChatIcon";

function NoChatBox() {
  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center dark:bg-zinc-800/20 bg-indigo-50/70">
        <div className="animate-bounce">
          <ChatIcon className={"size-12"} />
        </div>
        <div className="mt-2">Yap away!</div>
      </div>
    </>
  );
}

export default NoChatBox;
