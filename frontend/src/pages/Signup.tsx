import { Link } from "react-router-dom";
import Button from "../components/Button";
import Input from "../components/Input";

function Signup() {
  return (
    <>
      <div className="flex flex-col items-center h-full pt-30">
        <h1 className="text-2xl">Create an account</h1>

        <section className="mt-10">
          <form action="" className="mt-5 flex flex-col gap-5">
            <Input
              variant="primary"
              type="text"
              name="firstname"
              id="firstname"
              placeholder="First name"
            />
            <Input
              variant="primary"
              type="text"
              name="lastname"
              id="lastname"
              placeholder="Last name"
            />
            <Input
              variant="primary"
              type="email"
              name="email"
              id="email"
              placeholder="Email"
            />
            <Input
              variant="primary"
              type="password"
              name="password"
              id="password"
              placeholder="Password"
            />
            <Button variant="primary" text={"Sign up"} />
          </form>

          <div className="flex items-center gap-5 my-8">
            <span className="border-1 border-gray-400 flex-1 h-.5 "></span>
            <span className="w-max text-gray-400">OR</span>
            <span className="border-1 border-gray-400 flex-1 h-.5 "></span>
          </div>

          <div className="text-sm text-center ">
            <span className=" text-gray-500 mr-1">
              If you already have an account{" "}
            </span>
            <Link className="text-gray-300 hover:text-gray-50" to="/signin">
              Login
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}

export default Signup;
