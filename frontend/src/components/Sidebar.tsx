import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import InboxIcon from "../icons/InboxIcon";
import { useAuthStore } from "../store/useAuthStore";

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
        className={`${className} overflow-auto  dark:bg-zinc-900 bg-white  `}
      >
        <section className="flex flex-col md:px-2 px-1">
          <div className={` pl-11 pr-3 pt-4.5 pb-5 flex gap-2 items-center `}>
            <InboxIcon />
            <p>Inbox</p>
          </div>
          <div>
            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`hover:dark:bg-zinc-800 hover:bg-indigo-50/70 px-3 py-4 w-full rounded-md cursor-pointer flex items-center justify-between gap-3 ${
                  selectedUser?._id === user._id
                    ? "bg-indigo-50 dark:bg-zinc-800/70"
                    : ""
                }`}
              >
                <div className="flex gap-3 items-center">
                  <img
                    src=""
                    alt=""
                    className="w-7 h-7 rounded-full bg-gray-300"
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
