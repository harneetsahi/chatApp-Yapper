import { WordRotate } from "@/components/magicui/word-rotate";
import { Link } from "react-router-dom";
import backdrop from "../public/backdrop1.png";
import backdrop2 from "../public/backdrop.png";

const textStyles = `font-medium text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-center`;

function Home() {
  return (
    <>
      <main>
        <div className="max-w-[calc(1350px)] mx-auto pt-15 h-[calc(100vh-200px)] flex justify-center items-center relative">
          <div className=" transition-all flex flex-col gap-1 items-center justify-center md:w-[50%] z-10 ">
            <p className={`${textStyles}`}>A place for</p>
            <p className={`${textStyles}`}>people who</p>

            <p
              className={`text-center text-indigo-500 font-medium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-15`}
            >
              {" "}
              <span>
                <WordRotate
                  words={["love to talk", "want to share", "stay in touch"]}
                  duration={1800}
                />
              </span>
            </p>

            <Link
              to="/signup"
              className="  bg-indigo-500 text-white  py-2 md:px-5 px-4 rounded-3xl hover:scale-103 transition-all cursor-pointer "
              title="Sign up"
            >
              Get started
            </Link>
          </div>
          <div className="md:w-[33%] w-0 ">
            <img src={backdrop} className=" md:block hidden" alt="" />
          </div>
          <div className="absolute flex justify-center items-center h-full w-full md:hidden">
            <img src={backdrop2} className=" md:hidden" alt="" />
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
