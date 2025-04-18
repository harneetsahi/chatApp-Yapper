import { Link } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";

import Button from "../components/Button";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import MailIcon from "../icons/MailIcon";
import Input from "../components/Input";
import PersonIcon from "../icons/PersonIcon";
import PasswordIcon from "../icons/PasswordIcon";
import Eye from "../icons/Eye";
import EyeClose from "../icons/EyeClose";
import Loader from "../components/Loader";

function Signup() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  // const schema = z.object({
  //   email: z.string().email(),
  // });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signup(formData);
  };

  return (
    <>
      <div className="flex flex-col items-center h-[calc(700px)] justify-center">
        <h1 className="text-2xl">Create an account</h1>

        <section className="my-10 flex flex-col ">
          <form
            action=""
            onSubmit={handleSubmit}
            className="mt-5 flex flex-col gap-5"
          >
            <Input
              icon={<PersonIcon />}
              type="firstname"
              id="firstname"
              placeholder="First Name"
              onChange={(e) =>
                setFormData({ ...formData, firstName: e.target.value.trim() })
              }
              value={formData.firstName}
              name="firstname"
              minLength={3}
              maxLength={50}
              title={"Must have at least 3 letters and max 50 letters"}
              required={true}
            />

            <Input
              icon={<PersonIcon />}
              type="lastname"
              id="lastname"
              placeholder="Last Name"
              onChange={(e) =>
                setFormData({ ...formData, lastName: e.target.value.trim() })
              }
              value={formData.lastName}
              name="lastname"
              minLength={2}
              maxLength={50}
              title={"Must have at least 2 letters and max 50 letters"}
              required={true}
            />
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
              disabled={isSigningUp}
              type="submit"
              variant="primary"
              text={isSigningUp ? <Loader /> : "Sign up"}
            />
          </form>

          <div className="flex items-center gap-5 my-10">
            <span className="border-t-1 border-gray-700 flex-1 h-.5 "></span>
            <span className="w-max text-gray-700">OR</span>
            <span className="border-t-1 border-gray-700 flex-1 h-.5 "></span>
          </div>

          <div className="text-sm text-center dark:text-gray-400 text-zinc-700 ">
            <span className="   mr-1">If you already have an account </span>
            <Link
              className="0 hover:dark:text-indigo-200 hover:text-zinc-950"
              to="/signin"
            >
              Login
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Signup;
