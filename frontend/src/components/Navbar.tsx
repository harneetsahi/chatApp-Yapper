import { useAuthStore } from "../store/useAuthStore";
import ThemeIcon from "../icons/ThemeIcon";
import ChatIcon from "../icons/ChatIcon";

function Navbar() {
  const { authUser } = useAuthStore();

  return (
    <>
      <div className="navbar bg-base-100 px-8 py-5">
        <div className="flex-none">
          <ChatIcon />
        </div>
        <div className="flex-1">
          <a className="btn btn-ghost text-xl">Yapper</a>
        </div>
        <div className="flex-none">
          <ThemeIcon />
        </div>
      </div>
    </>
  );
}

export default Navbar;
