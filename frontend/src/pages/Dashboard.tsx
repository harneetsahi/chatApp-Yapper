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
      <div className=" h-[calc(100vh-82px)] border-t-1 dark:border-zinc-800 border-indigo-100  flex max-w-[calc(1350px)] m-auto relative">
        <div ref={sidebarRef}>
          <button
            onClick={handleSidebar}
            title="Toggle Sidebar"
            className={`flex justify-center items-center absolute z-30 top-3 left-2 w-9 h-9 bg-indigo-50 dark:bg-zinc-800 rounded-lg cursor-pointer `}
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
        <div className="flex-1">
          {!selectedUser ? <NoChatBox /> : <ChatBox />}
        </div>
        <div className="md:w-1/5 md:max-w-100 hidden md:flex flex-col items-center gap-7 mx-3 pt-20 ">
          <p className="lg:text-2xl text-xl">Your Profile</p>
          {/* <img src="" alt="" className="w-20 h-20 rounded-full bg-gray-300" /> */}
          <div className="mt-5 lg:text-md text-sm transition-all ">
            <div className="mb-6">
              <p className="font-medium">Name</p>
              <p className="opacity-50">
                {(authUser as User).firstName} {(authUser as User).lastName}
              </p>
            </div>
            <div>
              <p className="font-medium">Email</p>
              <p className="opacity-50">{(authUser as User).email}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
