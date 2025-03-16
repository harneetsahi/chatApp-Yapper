import { useAuthStore } from "../store/useAuthStore";
import ThemeIcon from "../icons/ThemeIcon";
import ChatIcon from "../icons/ChatIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { Link } from "react-router-dom";
import { useThemeStore } from "../store/useThemeStore";

function Navbar() {
  const { authUser, signout } = useAuthStore();
  const { theme, setTheme } = useThemeStore();

  function handleLogout() {
    signout();
  }

  function changeTheme() {
    if (theme === "luxury") {
      setTheme("retro");
      console.log("retro");
    } else {
      setTheme("luxury");
      console.log("luxury");
    }
  }

  return (
    <>
      <div className="navbar bg-base-100 px-8 py-5">
        <div className="flex-none">
          <ChatIcon />
        </div>
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-lg">
            Yapper
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <div title="Change Theme" onClick={() => changeTheme()}>
            <ThemeIcon />
          </div>
          <Link to="/signin" onClick={handleLogout} title="Logout">
            {authUser && (
              <div className="flex gap-2">
                <LogoutIcon /> Logout
              </div>
            )}
          </Link>
        </div>
      </div>
    </>
  );
}

export default Navbar;
