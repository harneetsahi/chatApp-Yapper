import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import { useAuthStore } from "../store/useAuthStore";
import ChatIcon from "../icons/ChatIcon";
import LogoutIcon from "../icons/LogoutIcon";
import SunIcon from "../icons/SunIcon";
import MoonIcon from "../icons/MoonIcon";
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
      <div
        className={` px-8 py-3 flex justify-between max-w-[calc(2150px)] m-auto`}
      >
        <Link
          to="/"
          className=" text-lg font-semibold p-2 flex items-center gap-2"
          title="Home Page"
        >
          <ChatIcon className="size-10 text-indigo-500" />
          <p className="flex-1 text-2xl">Yapper</p>
        </Link>
        <div className="flex items-center gap-4">
          <button className="cursor-pointer" onClick={handleSettings}>
            <SettingsIcon />
          </button>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="hover:bg-white hover:dark:bg-zinc-800 p-2 rounded-lg cursor-pointer"
          >
            {darkMode ? <SunIcon /> : <MoonIcon />}
          </button>

          {authUser && (
            <Link
              to="/signin"
              onClick={handleLogout}
              title="Logout"
              className="flex gap-2 p-2 hover:bg-white hover:dark:bg-zinc-800 rounded-lg transition-all "
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
