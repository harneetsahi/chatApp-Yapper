import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import InboxIcon from "../icons/InboxIcon";
import { useAuthStore } from "../store/useAuthStore";

function Sidebar({ className }: { className: string }) {
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
        className={`${className} overflow-auto  dark:border-zinc-800 border-indigo-100  `}
      >
        <section className="flex flex-col md:px-2 px-1">
          <div className={` pl-11 pr-3 py-4 mb-2 flex gap-2 `}>
            <InboxIcon />
            <p>Inbox</p>
          </div>
          <div>
            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`hover:dark:bg-zinc-800 hover:bg-indigo-50/70 px-3 py-4 w-full rounded-md cursor-pointer flex items-center gap-3 ${
                  selectedUser?._id === user._id
                    ? "bg-indigo-50 dark:bg-zinc-800/70"
                    : ""
                }`}
              >
                <img
                  src=""
                  alt=""
                  className="w-7 h-7 rounded-full bg-gray-300"
                />
                <p className="text-sm font-medium text-left">
                  {user.firstName} {user.lastName}
                </p>
              </button>
            ))}
          </div>
        </section>
      </aside>
    </>
  );
}

export default Sidebar;
