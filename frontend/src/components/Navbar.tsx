import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";
import ChatIcon from "../icons/ChatIcon";
import LogoutIcon from "../icons/LogoutIcon";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";
import SettingsIcon from "../icons/SettingsIcon";
import SettingsDropdown from "./SettingsDropdown";
import { useOutsideClick } from "../hooks/useOutsideClick";

function Navbar() {
  const { authUser, signout } = useAuthStore();
  const [showDropdown, setShowDropdown] = useState(false);
  const settingsRef = useRef(null);

  const [darkMode, setDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme === "dark";
  });

  function handleLogout() {
    signout();
  }

  function handleSettings() {
    setShowDropdown((prev) => !prev);
  }

  function handleClickOutside() {
    setShowDropdown(false);
  }

  useOutsideClick(settingsRef, handleClickOutside);

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
      <div
        className={`px-1  md:px-5 py-3 w-full max-w-[calc(1350px)] sticky z-1000 mx-auto sm:text-lg text-sm `}
      >
        <div className="flex justify-between w-full ">
          <Link
            to="/"
            className="p-2 flex items-center gap-2"
            title="Home Page"
          >
            <ChatIcon className="md:size-8 size-7 text-indigo-500 " />
            <p className="flex-1 font-semibold md:text-2xl text-xl text-indigo-500 ">
              Yapper
            </p>
          </Link>
          <div className="flex items-center md:gap-2 gap-0.5 transition-all ">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="hover:bg-indigo-50/50 hover:dark:bg-zinc-800  p-2 rounded-lg cursor-pointer"
              name="Change theme"
            >
              {darkMode ? (
                <SunIcon className="md:size-6 size-5" />
              ) : (
                <MoonIcon className="md:size-6 size-5" />
              )}
            </button>

            {authUser && (
              <button
                ref={settingsRef}
                className="hover:bg-indigo-50/50 hover:dark:bg-zinc-800 focus:bg-indigo-50/50 focus:dark:bg-zinc-800 p-2 rounded-lg cursor-pointer relative"
                onClick={handleSettings}
                name="Settings"
              >
                <SettingsIcon className="md:size-6 size-5" />
                {showDropdown && <SettingsDropdown />}
              </button>
            )}

            {authUser && (
              <Link
                to="/signin"
                onClick={handleLogout}
                title="Logout"
                className="flex items-center md:gap-2 gap-1 p-2 hover:bg-indigo-50/50 hover:dark:bg-zinc-800 rounded-lg transition-all "
              >
                <LogoutIcon className="md:size-6 size-5" /> Logout
              </Link>
            )}

            {!authUser && (
              <Link
                to="/signin"
                className="border-2 border-indigo-500 dark:text-white text-zinc-900 py-1.5 md:px-5 px-4 text-center rounded-3xl hover:bg-indigo-500 hover:text-white mr-2  transition-all "
                title="Log in"
              >
                Log in
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
