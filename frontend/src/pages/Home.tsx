import Sidebar from "../components/Sidebar";
import ChatBox from "../skeletons/ChatBox";
import NoChatBox from "../skeletons/NoChatBox";
import { useChatStore } from "../store/useChatStore";

function Home() {
  const { selectedUser } = useChatStore();
  return (
    <>
      <div className="h-[calc(100vh-140px)] border-t-1 border-gray-800 my-8 mx-12 rounded-lg dark:bg-stone-900 bg-orange-100 flex">
        <Sidebar />
        <div className="flex-1 py-4">
          {selectedUser ? <NoChatBox /> : <ChatBox />}
        </div>
      </div>
    </>
  );
}

export default Home;
