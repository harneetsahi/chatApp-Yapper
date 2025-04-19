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
  const { authUser, signout, openSettings } = useAuthStore();
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
    // openSettings();
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
        className={`px-2 py-3 flex justify-between max-w-[calc(1350px)] m-auto`}
      >
        <Link
          to="/"
          className=" text-lg font-semibold p-2 flex items-center gap-2"
          title="Home Page"
        >
          <ChatIcon className="size-10 text-indigo-400" />
          <p className="flex-1 text-2xl">Yapper</p>
        </Link>
        <div className="flex items-center lg:gap-4 gap-2">
          {authUser && (
            <button
              ref={settingsRef}
              className="hover:bg-indigo-50 hover:dark:bg-zinc-800 focus:bg-indigo-50 focus:dark:bg-zinc-800   p-2 rounded-lg cursor-pointer relative"
              onClick={handleSettings}
            >
              <SettingsIcon />
              {showDropdown && <SettingsDropdown />}
            </button>
          )}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hover:bg-indigo-50 hover:dark:bg-zinc-800 p-2 rounded-lg cursor-pointer"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {authUser && (
            <Link
              to="/signin"
              onClick={handleLogout}
              title="Logout"
              className="flex gap-2 p-2 hover:bg-indigo-50 hover:dark:bg-zinc-800 rounded-lg transition-all "
            >
              <LogoutIcon /> Logout
            </Link>
          )}

          {!authUser && (
            <Link
              to="/signin"
              className="bg-indigo-500 text-white py-2 px-5 rounded-3xl hover:scale-x-105  transition-all "
              title="Log in"
            >
              Log in
            </Link>
          )}

          {!authUser && (
            <Link
              to="/signup"
              className="bg-indigo-500 text-white py-2 px-5 rounded-3xl hover:scale-x-105  transition-all "
              title="Sign up"
            >
              Sign up
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navbar;
