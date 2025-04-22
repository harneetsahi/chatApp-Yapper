import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import NoChatBox from "../components/NoChatBox";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore, User } from "../store/useAuthStore";
import { useEffect, useRef, useState } from "react";
import Chevron from "../icons/Chevron";
import { useOutsideClickSidebar } from "../hooks/useOutsideClick";

function Dashboard() {
  const { selectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  const [showSidebar, setShowSidebar] = useState(false);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setShowSidebar(true);
      }
    };

    // when app initially loads
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function handleSidebar() {
    setShowSidebar((prev) => !prev);
  }

  const handleClickOutside = () => {
    setShowSidebar(false);
  };

  useOutsideClickSidebar(sidebarRef, handleClickOutside);

  return (
    <>
      <div className="h-[calc(100vh-82px)] max-w-[calc(1350px)] border-t-1 dark:border-zinc-800 border-indigo-100 flex m-auto relative">
        {/* sidebar */}
        <div ref={sidebarRef}>
          <button
            onClick={handleSidebar}
            title="Toggle Sidebar"
            className={`flex justify-center items-center absolute z-30 top-3.5 left-2 w-8 h-8 bg-indigo-100 dark:bg-zinc-800 rounded-lg cursor-pointer `}
          >
            <Chevron
              className={`${
                showSidebar && "rotate-180 transition-all duration-200"
              }`}
            />
          </button>
          {showSidebar && (
            <Sidebar
              className={`sm:relative absolute top-0 left-0 w-62 h-full z-20`}
            />
          )}
        </div>

        {/* chat area */}
        <div className="flex-1">
          {!selectedUser ? (
            <NoChatBox />
          ) : (
            <ChatBox showSidebar={showSidebar} />
          )}
        </div>

        {/* profile section */}
        <div className="w-62 hidden md:flex flex-col items-center gap-7 pt-20 ">
          <p className="lg:text-2xl text-xl">Welcome, {authUser?.firstName}!</p>
          <div className="relative">
            <img
              src={authUser?.avatar}
              alt=""
              className="w-20 h-20 rounded-full bg-gray-300"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
