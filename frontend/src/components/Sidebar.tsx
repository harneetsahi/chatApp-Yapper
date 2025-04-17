import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import InboxIcon from "../icons/InboxIcon";
import { useAuthStore } from "../store/useAuthStore";

function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser } = useChatStore();
  const { authUser } = useAuthStore();

  useEffect(() => {
    if (authUser) {
      getUsers();
    }
  }, [authUser, getUsers]);

  return (
    <>
      <aside className=" w-1/3 md:w-1/5 overflow-auto dark:bg-zinc-900 bg-indigo-100">
        <section className="flex flex-col md:px-3 px-1">
          <div className={`px-3 py-4 mb-2 flex gap-2 `}>
            <InboxIcon />
            <p>Inbox</p>
          </div>
          <div>
            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`hover:dark:bg-zinc-800 hover:bg-indigo-50 px-3 py-4 w-full rounded-md border-1 dark:border-zinc-900 border-indigo-100 hover:border-indigo-200/50 hover:dark:border-zinc-700 cursor-pointer ${
                  selectedUser?._id === user._id
                    ? "bg-indigo-50 dark:bg-zinc-800/70"
                    : ""
                }`}
              >
                <div className="text-sm font-medium text-left h-full">
                  {user.firstName} {user.lastName}
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
