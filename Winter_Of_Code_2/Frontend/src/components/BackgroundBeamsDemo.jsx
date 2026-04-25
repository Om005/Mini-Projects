import React from "react";
import { BackgroundBeams } from "./ui/background-beams";
import { TypewriterEffectSmoothDemo } from "./TypewriterEffectSmoothDemo";

export function BackgroundBeamsDemo() {
  return (
    (<div
      className=" h-[90vh] w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
      <div className="max-w-2xl mx-auto p-4">
        {/* <h1
          className="relative text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold">
          PIXELCODE
        </h1> */}
        <TypewriterEffectSmoothDemo/>
        <p></p>
        {/* <p
          className="text-neutral-500 max-w-3xl mx-auto my-2 text-sm text-center relative">
          Welcome to PIXELCODE, a versatile code editor where you can write code in any programming language. With its intuitive interface and powerful features, PIXELCODE makes it easy to write, save, and manage your code. Whether you're working on small scripts, complex algorithms, or data processing, PIXELCODE provides the tools you need to bring your ideas to life.
        </p> */}
      </div>
      <BackgroundBeams />
    </div>)
  );
}
