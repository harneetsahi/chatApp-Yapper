import { useAuthStore } from "../store/useAuthStore";
import ThemeIcon from "../icons/ThemeIcon";

function Navbar() {
  const { authUser } = useAuthStore();

  return (
    <>
      <div>Navbar</div>
      <ThemeIcon />
    </>
  );
}

export default Navbar;
