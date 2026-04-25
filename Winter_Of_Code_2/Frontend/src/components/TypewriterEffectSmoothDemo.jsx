import { TypewriterEffectSmooth } from "./ui/typewriter-effect";
import { Link } from "react-router-dom";

import { useNavigate } from "react-router-dom";
import { AppContent } from "../context/Appcontex";
import axios from "axios";

import { toast } from "react-hot-toast";
import { useContext } from "react";

export function TypewriterEffectSmoothDemo() {
  const navigate = useNavigate()
  const words = [
    {
      text: "Begin Your Coding Adventure With ",
    },
    {
      text: "PIXELCODE.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  const handleide = async(e)=>{
    if(userData.isAccountVerified) {
      navigate("/ide")
    }
    else{
      toast.error("First Verify Email")
    }
  }
  const {isLoggedin, userData} = useContext(AppContent)
  return (
    (<div className="flex flex-col items-center justify-center h-[40rem]  ">

      <p className=" dark:text-neutral-200 text-xs sm:text-base  ">
      {/* The journey to mastery begins with every line of code. */}
      </p>
      <TypewriterEffectSmooth words={words} />
      {/* <p className=" dark:text-neutral-200 text-md sm:text-xl  "> */}
      {/* The journey to mastery begins with every line of code. */}
      {/*  */}
      {/* </p> */}
      <p className="text-white text-center mb-10">Welcome to PIXELCODE, a flexible code editor for any programming language. Write, save, and manage your code with ease using its intuitive interface and powerful features.</p>
      <div
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <Link to={'guest'}
          className="w-40 flex justify-center items-center h-12 rounded-xl z-10 bg-black border dark:border-white border-transparent text-white text-lg">
          Explore now
        </Link>
        {!isLoggedin && <Link to={'signup'}
          className="w-40 flex justify-center items-center h-12 z-10 rounded-xl bg-white text-black border border-black roboto text-lg">
          Signup
        </Link>}
        {isLoggedin && <button onClick={handleide}
          className="w-44 flex justify-center items-center h-12 z-10 rounded-xl bg-white text-black border border-black roboto text-lg">
          Code Playground
        </button>}
      </div>
    </div>)
  );
}
