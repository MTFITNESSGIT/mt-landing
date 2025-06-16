import React from "react";
import { TPlan } from "../types";
import Link from "next/link";
import Image from "next/image";

const Plan: React.FC<TPlan> = ({
  background,
  title,
  quantity,
  category,
  price,
}: TPlan) => {
  const backgroundClasses: Record<number, string> = {
    1: "bg-plan-1",
    2: "bg-plan-2",
    3: "bg-plan-3",
  };

  return (
    <Link
      href={{
        pathname: "/checkout",
        query: {
          plan: title.toLowerCase(),
          category: category && category.toLowerCase(),
        },
      }}
    >
      <div className="flex flex-col">
        <div
          className={`${
            backgroundClasses[background] || "bg-plan-1"
          } relative bg-cover bg-top flex flex-col justify-between items-center w-full h-full min-h-[420px] rounded-3xl cursor-pointer`}
        >
          <Image
            src="/imgs/logo2.webp"
            alt="Logo Overlay"
            width={64}
            height={64}
            className="absolute top-4 left-4 w-16 h-16"
          />
          <div
            className={`absolute w-full mt-2 pb-4 bottom-0 flex flex-col justify-end items-center border border-red bg-black rounded-b-3xl`}
          >
            <h3 className="bg-premium-gradient px-4 w-full text-xl md:text-base xl:text-2xl font-extrabold text-center">
              {title}
            </h3>
            <p className="text-xl md:text-base mt-2 xl:text-xl font-extrabold text-center uppercase">
              nivel {category}
            </p>
            <p className="text-xl md:text-base xl:text-xl text-red font-semibold text-center">
              {quantity} veces por semana
            </p>
          </div>
        </div>
        <p className="text-xl md:text-base font-semibold mt-3 uppercase">
          RUTINA {title} {category}
        </p>
        <p className="text-2xl font-extrabold m-0">$ {price}</p>
      </div>
    </Link>
  );
};

export default Plan;
