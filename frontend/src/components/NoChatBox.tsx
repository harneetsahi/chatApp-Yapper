import ChatIcon from "../icons/ChatIcon";

function NoChatBox() {
  return (
    <>
      <div className="h-full w-full flex flex-col justify-center items-center dark:bg-zinc-900/50 bg-indigo-50/10">
        <div className="animate-bounce">
          <ChatIcon className={"size-12"} />
        </div>
      </div>
    </>
  );
}

export default NoChatBox;
