"use client";
import React from "react";
import { advices } from "../utils/advice";
import Advice from "./Advice";

const AdvicePage = () => {
  return (
    <section className="flex w-full flex-col items-center justify-start mt-14 px-4 md:px-10 lg:px-20 max-w-[1200px] mx-auto">
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-full flex justify-center">
          <div className="w-10 h-[3px] bg-red"></div>
        </div>
        <h3 className="text-4xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold text-red">
          ASESORÍAS
        </h3>
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-10">
        {advices.map((advice, i) => (
          <Advice
            key={i}
            title={advice.title}
            muscle={advice.muscle}
            fat={advice.fat}
            premium={advice.premium}
            customized={advice.customized}
            discount={advice.discount}
          />
        ))}
      </div>
    </section>
  );
};

export default AdvicePage;
