import { WordRotate } from "@/components/magicui/word-rotate";
import { Link } from "react-router-dom";

const textStyles = `font-medium text-3xl sm:text-4xl lg:text-5xl xl:text-6xl text-center`;

function Home() {
  return (
    <>
      <main>
        <div className="max-w-[calc(1350px)] mx-auto pt-35 h-[calc(100vh-200px)] ">
          <div className=" transition-all flex flex-col gap-1 items-center justify-center ">
            <p className={`${textStyles}`}>A place for</p>
            <p className={`${textStyles}`}>people who</p>

            <p
              className={`text-center text-indigo-500 font-medium text-4xl sm:text-5xl lg:text-6xl xl:text-7xl mb-6 md:mb-8 `}
            >
              {" "}
              <span>
                <WordRotate
                  words={["love to talk", "want to share", "stay in touch"]}
                  duration={1800}
                />
              </span>
            </p>

            {/* {!authUser && ( */}
            <Link
              to="/signup"
              className="  bg-indigo-500 text-white  py-2 md:px-5 px-4 rounded-3xl hover:scale-103 transition-all "
              title="Sign up"
            >
              Get started
            </Link>
            {/* )} */}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
