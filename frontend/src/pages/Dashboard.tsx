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
   h-[calc(100vh-82px)]
       md:rounded-lg transition-all flex"
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
