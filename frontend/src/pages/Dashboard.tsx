import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import NoChatBox from "../components/NoChatBox";
import { useChatStore } from "../store/useChatStore";

function Dashboard() {
  const { selectedUser } = useChatStore();
  return (
    <>
      <div
        className="
   h-[calc(100vh-82px)] border-t-1 dark:border-zinc-800 border-indigo-100
       md:rounded-lg flex max-w-[calc(2150px)] m-auto"
      >
        <Sidebar />
        <div className="flex-1 ">
          {!selectedUser ? <NoChatBox /> : <ChatBox />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
