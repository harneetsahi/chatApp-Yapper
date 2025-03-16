import { useAuthStore } from "../store/useAuthStore";
import ThemeIcon from "../icons/ThemeIcon";
import ChatIcon from "../icons/ChatIcon";
import LogoutIcon from "../icons/LogoutIcon";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";

function Navbar() {
  const { authUser, signout } = useAuthStore();

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  function handleLogout() {
    signout();
  }

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (darkMode) {
      htmlElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      htmlElement.classList.remove("dark");
      localStorage.setItem("theme", "");
    }
  }, [darkMode]);

  return (
    <>
      <div className="navbar dark:bg-zinc-900 dark:text-yellow-600 bg-orange-50 text-zinc-900 px-8 py-5">
        <div className="flex-none">
          <ChatIcon />
        </div>
        <div className="flex-1">
          <Link to="/" className="text-lg font-semibold pl-2">
            Yapper
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button title="Change Theme" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>
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
