import { Link } from "react-router-dom";
import Button from "../components/Button";
import EmailInput from "../components/EmailInput";
import PasswordInput from "../components/PasswordInput";

function Signin() {
  return (
    <>
      <div className="flex flex-col items-center h-full pt-30">
        <h1 className="text-2xl">Log in</h1>

        <section className="mt-10">
          <form action="" className="mt-5 flex flex-col gap-5">
            <EmailInput />
            <PasswordInput />
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
