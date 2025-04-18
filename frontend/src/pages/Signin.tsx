import { Link } from "react-router-dom";
import Button from "../components/Button";
import MailIcon from "../icons/MailIcon";
import Input from "../components/Input";
import PasswordIcon from "../icons/PasswordIcon";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import Eye from "../icons/Eye";
import EyeClose from "../icons/EyeClose";
import Loader from "../components/Loader";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { signin, isSigningIn } = useAuthStore();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signin(formData);
  };

  return (
    <>
      <div className="flex flex-col items-center h-[calc(700px)] justify-center">
        <h1 className="text-2xl">Log in</h1>

        <section className="mt-10">
          <form
            action=""
            className="mt-5 flex flex-col gap-5"
            onSubmit={handleSubmit}
          >
            <Input
              icon={<MailIcon />}
              type="email"
              id="email"
              placeholder="mail@site.com"
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              value={formData.email}
              name="email"
              maxLength={50}
              required={true}
            />
            <div className="flex relative">
              <Input
                icon={<PasswordIcon />}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                value={formData.password}
                name="password"
                minLength={8}
                maxLength={16}
                pattern="^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^\w\s]).{8,16}$"
                title="Must be 8 to 16 letters long, including 1 number, 1 lowercase letter, 1 uppercase letter, 1 special character"
                required={true}
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-0 bottom-0 right-3"
              >
                {showPassword ? <Eye /> : <EyeClose />}
              </button>
            </div>
            <Button
              variant="primary"
              text={isSigningIn ? <Loader /> : "Log in"}
            />
          </form>

          <div className="flex items-center gap-5 my-10">
            <span className="border-t-1 border-gray-700 flex-1 h-.5 "></span>
            <span className="w-max text-gray-700">OR</span>
            <span className="border-t-1 border-gray-700 flex-1 h-.5 "></span>
          </div>

          <div className="text-sm text-center dark:text-gray-400 text-zinc-700 ">
            <span className="  mr-2">Don't have an account?</span>
            <Link
              className="0 hover:dark:text-indigo-200 hover:text-zinc-950"
              to="/signup"
            >
              Sign up
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Signin;
