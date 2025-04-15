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
      md:h-[calc(100vh-140px)] h-[calc(100vh-68px)]
      border-t-1 border-gray-800 md:my-8 md:mx-12 md:rounded-lg transition-all dark:bg-stone-900 bg-orange-100 flex"
      >
        <Sidebar />
        <div className="flex-1">
          {!selectedUser ? <NoChatBox /> : <ChatBox />}
        </div>
      </div>
    </>
  );
}

export default Dashboard;
