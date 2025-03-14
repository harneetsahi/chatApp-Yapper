import { Theme } from "emoji-picker-react";
import { useAuthStore } from "../store/useAuthStore";
import ThemeComp from "./Theme";

function Navbar() {
  const { authUser } = useAuthStore();

  return (
    <>
      <div>Navbar</div>
      <ThemeComp />
    </>
  );
}

export default Navbar;
