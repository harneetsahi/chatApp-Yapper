import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import InboxIcon from "../icons/InboxIcon";
import { useAuthStore } from "../store/useAuthStore";

const defaultStyles =
  "py-4 md:px-5 px-2 border-b-1 dark:border-gray-800 border-orange-100";

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
      <aside className="rounded-lg w-1/3 md:w-1/5  overflow-auto transition-all ">
        <section className="flex flex-col ">
          <div
            className={`${defaultStyles} pl-3 flex gap-2 dark:bg-neutral-950/40 bg-orange-200/40`}
          >
            <InboxIcon />
            <p>Inbox</p>
          </div>
          <div>
            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`${defaultStyles} w-full pl-4 h-15 dark:bg-neutral-950/20 bg-orange-200 cursor-pointer ${
                  selectedUser?._id === user._id
                    ? "bg-orange-300 dark:bg-zinc-950 transition-all"
                    : ""
                }`}
              >
                <div className="text-sm text-left">{user.firstName}</div>
              </button>
            ))}
          </div>
        </section>
      </aside>
    </>
  );
}

export default Sidebar;
