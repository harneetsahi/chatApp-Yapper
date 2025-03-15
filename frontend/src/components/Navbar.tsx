import { useAuthStore } from "../store/useAuthStore";
import ThemeIcon from "../icons/ThemeIcon";
import ChatIcon from "../icons/ChatIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { Link } from "react-router-dom";

function Navbar() {
  const { authUser, signout } = useAuthStore();

  function handleLogout() {
    signout();
  }

  return (
    <>
      <div className="navbar bg-base-100 px-8 py-5">
        <div className="flex-none">
          <ChatIcon />
        </div>
        <div className="flex-1">
          <Link to="/dashboard" className="btn btn-ghost text-lg">
            Yapper
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div title="Change Theme">
            <ThemeIcon />
          </div>
          <Link to="/signin" onClick={handleLogout} title="Logout">
            {authUser && <LogoutIcon />}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
