import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";
import ChatIcon from "../icons/ChatIcon";
import LogoutIcon from "../icons/LogoutIcon";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";
import { themeClass } from "../lib/ThemeClass";
import SettingsIcon from "../icons/SettingsIcon";

function Navbar() {
  const { authUser, signout, openSettings } = useAuthStore();

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  function handleLogout() {
    signout();
  }

  function handleSettings() {
    openSettings();
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
      <div className={`${themeClass} navbar px-8 py-5`}>
        <div className="flex-none">
          <ChatIcon className="size-6" />
        </div>
        <div className="flex-1">
          <Link to="/" className="text-lg font-semibold pl-2">
            Yapper
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <button className="cursor-pointer" onClick={handleSettings}>
            <SettingsIcon />
          </button>
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
