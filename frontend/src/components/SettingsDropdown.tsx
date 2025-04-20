function SettingsDropdown() {
  return (
    <>
      <div className="rounded-xl w-45 dark:bg-zinc-800 bg-indigo-50 p-4 absolute right-0 top-10 z-10 shadow-xl border-0 border-indigo-100 dark:border-zinc-700/80">
        <ul className="text-sm flex flex-col gap-2 text-left ">
          <li className="dark:hover:bg-white/20 hover:bg-indigo-100/80 rounded-lg py-1 px-2">
            Change Password
          </li>
        </ul>
      </div>
    </>
  );
}

export default SettingsDropdown;
