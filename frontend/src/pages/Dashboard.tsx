import Sidebar from "../components/Sidebar";
import ChatBox from "../components/ChatBox";
import NoChatBox from "../components/NoChatBox";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect, useRef, useState } from "react";
import Chevron from "../icons/Chevron";
import { useOutsideClickSidebar } from "../hooks/useOutsideClick";
import defaultProfile from "../public/profile.png";

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
      <div className="h-[calc(100vh-72px)] max-w-[calc(1250px)] border-t-1 dark:border-zinc-800 border-indigo-100 flex m-auto relative">
        {/* sidebar */}
        <div ref={sidebarRef}>
          <button
            onClick={handleSidebar}
            title="Toggle Sidebar"
            className={`flex justify-center items-center absolute z-30 top-3.5 left-2 w-8 h-8 cursor-pointer hover:text-indigo-500 `}
          >
            <Chevron
              className={`${
                showSidebar &&
                "rotate-180 transition-all duration-200 -translate-x-0.5"
              }`}
            />
          </button>
          {showSidebar && (
            <Sidebar
              className={`sm:relative absolute top-0 left-0 min-w-64 h-full z-20`}
            />
          )}
        </div>

        {/* chat area */}
        <div className="flex-1 ">
          {!selectedUser ? (
            <NoChatBox />
          ) : (
            <ChatBox showSidebar={showSidebar} />
          )}
        </div>

        {/* profile section */}

        <div className="min-w-50 lg:w-64 hidden lg:flex flex-col items-center gap-7 pt-20 border-l-1 dark:border-zinc-800 border-indigo-50 shadow-xs ">
          <p className="text-lg">Welcome, {authUser?.firstName}!</p>
          <div className="relative">
            <img
              src={authUser?.avatar || defaultProfile}
              alt=""
              className="w-25 h-25 rounded-full shadow-sm"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
