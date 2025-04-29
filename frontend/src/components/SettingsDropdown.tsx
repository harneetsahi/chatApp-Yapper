import { Link } from "react-router-dom";

function SettingsDropdown() {
  return (
    <>
      <div className="rounded-lg rounded-tr-none w-45 dark:bg-zinc-900 bg-white p-4 absolute right-4 top-10 z-10 shadow-sm ">
        <ul className="text-sm flex flex-col gap-2 text-left">
          <Link to="/updatePassword">
            <li className="px-2 py-1  hover:scale-x-103 hover:text-indigo-500  transition-all">
              Change Password
            </li>
          </Link>
          <Link to="/updateProfile">
            <li className="px-2 py-1 hover:scale-x-103 hover:text-indigo-500 transition-all ">
              Update Avatar
            </li>
          </Link>
        </ul>
      </div>
    </>
  );
}

export default SettingsDropdown;
