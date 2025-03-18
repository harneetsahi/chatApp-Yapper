import { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import InboxIcon from "../icons/InboxIcon";

const defaultStyles =
  "py-4 md:px-5 px-2 border-b-1 dark:border-gray-800 border-orange-100";

function Sidebar() {
  const { getUsers, users, selectedUser, setSelectedUser } = useChatStore();

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <aside className="rounded-lg w-1/3 md:w-1/5  overflow-auto transition-all dark:bg-neutral-950/40 bg-orange-200/40">
        <section className="flex flex-col ">
          <div className={`${defaultStyles} pl-3 flex gap-2 `}>
            <InboxIcon />
            <p>Inbox</p>
          </div>
          <div>
            {users.map((user) => (
              <button
                key={user._id}
                onClick={() => setSelectedUser(user)}
                className={`${defaultStyles} w-full pl-4 h-15 ${
                  selectedUser?._id === user._id
                    ? "bg-orange-50 dark:bg-zinc-950 transition-all"
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
