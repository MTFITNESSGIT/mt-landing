"use client";
import React from "react";
import PlansCarousel from "./PlansCarousel";

const Plans = () => {
  return (
    <>
      <section className=" bg-black w-full flex flex-col items-center justify-start px-4 md:px-10 lg:px-20 gap-8 max-w-[1200px] mx-auto py-4">
        <div className="h-[40px] w-full flex justify-center items-center px-4 md:px-10 lg:px-20 max-w-[1350px] mx-auto">
          <div className="divider"></div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <div className="w-full flex justify-center">
            <div className="w-10 h-[3px] bg-red"></div>
          </div>
          <div
            className={`flex flex-col justify-center items-center gap-4 animate-fade-left animate-ease-in-out animate-duration-[1300ms]`}
          >
            <h3 className="text-4xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold text-red">
              PLANES
            </h3>
            <h3 className="text-xl sm:text-3xl 2xl:text-4xl text-center font-extrabold text-white">
              ¡Elegí el plan que más se adapte a vos!
            </h3>
          </div>
        </div>

        <div>
          <PlansCarousel />
        </div>
        <div
          id="planes"
          className="h-[40px] w-full flex justify-center items-center px-4 md:px-10 lg:px-20 max-w-[1350px] mx-auto"
        >
          <div className="divider"></div>
        </div>
      </section>
    </>
  );
};

export default Plans;
