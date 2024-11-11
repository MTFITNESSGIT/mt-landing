import React from "react";
import { TPlan } from "../types";

const PlanCheckout = ({ background, title, level }: TPlan) => {
  return (
    <div
      className={`${
        background === 1
          ? "bg-plan-1"
          : background === 2
          ? "bg-plan-2"
          : "bg-plan-3"
      } relative bg-cover bg-top flex flex-col justify-between items-center w-full lg:max-w-[380px] h-[600px] rounded-2xl border border-white`}
    >
      <div
        className={`absolute w-full p-8 h-full flex flex-col justify-center gap-[50px] items-center bg-[rgba(0,0,0,0.40)] rounded-2xl`}
      ></div>
    </div>
  );
};

export default PlanCheckout;
