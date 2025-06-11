import { WordRotate } from "@/components/magicui/word-rotate";
import { Link } from "react-router-dom";

import topBackdrop from "../public/top.svg";
import bottomBackdrop from "../public/bottom.svg";

const textStyles = `font-medium text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-center`;

function Home() {
  return (
    <>
      <main>
        <div className="max-w-[calc(1350px)] mx-auto pt-15 h-[calc(100vh-200px)] max-h-[1000px] flex flex-col justify-center items-center relative ">
          <img
            src={topBackdrop}
            className="absolute lg:top-0 md:top-10 sm:top-15 top-25 transition-all w-[80vw]"
            alt=""
          />
          <div className=" transition-all flex flex-col gap-1 items-center justify-center md:w-[50%] z-10 ">
            <p className={`${textStyles}`}>A place for</p>
            <p className={`${textStyles}`}>people who</p>

            <div
              className={`text-center text-indigo-500 font-medium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-10 sm:mb-15`}
            >
              {" "}
              <span>
                <WordRotate
                  words={["love to talk", "want to share", "stay in touch"]}
                  duration={1800}
                />
              </span>
            </div>

            <Link
              to="/signup"
              className="  bg-indigo-500 text-white  py-2 md:px-5 px-4 rounded-3xl hover:scale-103 transition-all cursor-pointer "
              title="Sign up"
            >
              Get started
            </Link>
          </div>
          <img
            src={bottomBackdrop}
            className="absolute lg:-bottom-25 md:-bottom-10 sm:-bottom-5 bottom-10 transition-all  w-[90vw] "
            alt=""
          />
        </div>
      </main>
    </>
  );
}

export default Home;
