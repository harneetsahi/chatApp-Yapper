import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import defaultProfile from "../public/profile.png";

interface SidebarProps {
  className: string;
}

function Sidebar({ className }: SidebarProps) {
  const { getUsers, users, selectedUser, setSelectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      getUsers();
    }
  }, [authUser, getUsers]);

  return (
    <>
      <aside
        className={`${className} overflow-auto  dark:bg-zinc-950 bg-white shadow-xs border-r-1 dark:border-zinc-800 border-indigo-50  `}
      >
        <section className="flex flex-col md:px-2 px-1">
          <div
            className={`font-medium pl-11 pr-3 pt-4.5 pb-5 flex gap-2 items-center `}
          >
            {/* <InboxIcon /> */}
            <p>Inbox</p>
          </div>
          <div>
            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`hover:dark:bg-zinc-800/40 hover:bg-indigo-50/50 hover:border-l-2 hover:border-indigo-300  px-3 py-2.5 w-full rounded-md cursor-pointer flex items-center justify-between gap-3 ${
                  selectedUser?._id === user._id
                    ? "bg-indigo-50 dark:bg-zinc-800/50 border-l-2 border-indigo-300"
                    : ""
                }`}
              >
                <div className="flex gap-3 items-center">
                  <img
                    src={user.avatar || defaultProfile}
                    alt=""
                    className="w-8 h-8 rounded-full bg-white"
                  />
                  <p className="text-sm font-medium text-left">
                    {user.firstName} {user.lastName}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </section>
      </aside>
    </>
  );
}

export default Sidebar;
