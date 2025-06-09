"use client";
import Image from "next/image";
import React from "react";

const ThankYou = () => {
  return (
    <section className=" bg-black w-full flex flex-col items-center justify-start px-4 md:px-10 lg:px-20 gap-8 max-w-[1200px] mx-auto animate-fade-up">
      <div className="p-6 w-full bg-white rounded-2xl flex flex-col items-center justify-center gap-10">
        <div className="">
          <h2 className="text-4xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold text-red">
            ¡MUCHAS GRACIAS!
          </h2>
        </div>
        <div className="w-full h-full flex flex-col justify-center gap-5 items-center md:flex-row">
          <div className="flex-1 flex justify-end">
            <Image
              src="/imgs/plan3.webp"
              alt="image"
              width={1000}
              height={1000}
              className="w-full max-w-[400px] rounded-xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
