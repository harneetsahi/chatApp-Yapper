import { Link } from "react-router-dom";
import Button from "../components/Button";
import MailIcon from "../icons/MailIcon";
import Input from "../components/Input";
import PasswordIcon from "../icons/PasswordIcon";
import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { signin, isSigningIn } = useAuthStore();

  const validateForm = () => {};

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="flex flex-col items-center h-full pt-30">
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
            <Input
              icon={<PasswordIcon />}
              type="password"
              id="password"
              placeholder="Password"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
              value={formData.password}
              name="password"
              minLength={8}
              maxLength={16}
              pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              title="Must be 8 characters to 16 characters, including number, lowercase letter, uppercase letter, special character"
              required={true}
            />
            <Button variant="primary" text={"Log in"} />
          </form>

          <div className="flex items-center gap-5 my-8">
            <span className="border-1 border-gray-400 flex-1 h-.5 "></span>
            <span className="w-max text-gray-400">OR</span>
            <span className="border-1 border-gray-400 flex-1 h-.5 "></span>
          </div>

          <div className="text-sm text-center ">
            <span className=" text-gray-500 mr-1">Don't have an account?</span>
            <Link className="text-gray-300 hover:text-gray-50" to="/signup">
              Sign up
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Signin;
