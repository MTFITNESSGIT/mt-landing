import React from "react";
import Button from "./Button";
import { Badge } from "./ui/badge";
import { TProgram } from "@/types";

const Advice = ({
  title,
  muscle,
  fat,
  premium,
  customized,
  discount,
}: TProgram) => {
  return (
    <div className="w-full h-full">
      <h3 className="text-xl sm:text-3xl 2xl:text-4xl text-center font-extrabold text-white my-5">
        {title}
      </h3>
      <div className="w-full h-full flex flex-col justify-center items-center gap-6 lg:flex-row lg:justify-between">
        <div
          className={`w-full h-full max-w-[450px] p-6 ${
            premium
              ? "bg-gradient-to-b from-[#516FFF] to-[#F563BE]"
              : customized
              ? "bg-gradient-to-b from-[#d8b651] to-[#ce970d]"
              : "bg-gradient-to-b from-[#999898] to-[#4F4F4F]"
          } rounded-3xl flex flex-col justify-evenly items-center gap-2`}
        >
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold">{muscle.title}</h3>
            <div className="flex flex-col">
              {discount && (
                <div className="flex gap-2 w-full justify-center items-center my-1">
                  <p className="text-base white text-white line-through opacity-70">
                    $ {muscle.oldPrice} {premium && "USD"} mensuales
                  </p>
                  <Badge
                    variant="default"
                    className="bg-red text-white text-base"
                  >
                    {discount} %
                  </Badge>
                </div>
              )}
              <h3 className="text-2xl font-bold">
                $ {muscle.newPrice} {premium && "USD"} mensuales
              </h3>
            </div>

            <h3 className="text-lg font-bold">
              ( Estadía {premium ? "fija" : "mínima"} 3 meses)
            </h3>
          </div>
          <div className={`w-full h-[1px] bg-white my-2`}></div>
          <div className="w-full h-full">
            {muscle.values.map((value, i) => (
              <div className="flex justify-start items-center gap-2" key={i}>
                {value.approved && <p className="text-lg">✅</p>}
                <p className="text-base" key={i}>
                  {value.text}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full h-full">
            <h4 className="text-lg font-bold my-4">¿Que incluye?</h4>
            {muscle.includes.map((include, i) => (
              <div className="flex justify-start items-center gap-2" key={i}>
                {include.approved ? (
                  <p className="text-lg">✅</p>
                ) : (
                  <p className="text-lg">❌</p>
                )}
                <p className="text-base" key={i}>
                  {include.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 w-full">
            <Button
              text="comprar"
              textColor={"text-black"}
              background={"bg-white"}
            />
          </div>
        </div>
        <div
          className={`w-full h-full max-w-[450px] p-6 ${
            premium
              ? "bg-gradient-to-b from-[#516FFF] to-[#F563BE]"
              : customized
              ? "bg-gradient-to-b from-[#d8b651] to-[#ce970d]"
              : "bg-gradient-to-b from-[#999898] to-[#4F4F4F]"
          } rounded-3xl flex flex-col justify-evenly items-center gap-2`}
        >
          <div className="text-center">
            <h3 className="text-2xl lg:text-3xl font-bold">{muscle.title}</h3>
            <div className="flex flex-col">
              {discount && (
                <div className="flex gap-2 w-full justify-center items-center my-1">
                  <p className="text-base white text-white line-through opacity-70">
                    $ {muscle.oldPrice} {premium && "USD"} mensuales
                  </p>
                  <Badge
                    variant="default"
                    className="bg-red text-white text-base"
                  >
                    {discount} %
                  </Badge>
                </div>
              )}
              <h3 className="text-2xl font-bold">
                $ {muscle.newPrice} {premium && "USD"} mensuales
              </h3>
            </div>

            <h3 className="text-lg font-bold">
              ( Estadía {premium ? "fija" : "mínima"} 3 meses)
            </h3>
          </div>
          <div
            className={`w-full h-[1px] ${
              premium ? "bg-white" : "bg-[#5a5a5a]"
            } my-2`}
          ></div>{" "}
          <div className="w-full h-full">
            {fat.values.map((value, i) => (
              <div className="flex justify-start items-center gap-2" key={i}>
                {value.approved && <p className="text-lg">✅</p>}
                <p className="text-base" key={i}>
                  {value.text}
                </p>
              </div>
            ))}
          </div>
          <div className="w-full h-full">
            <h4 className="text-lg font-bold my-4">¿Que incluye?</h4>
            {fat.includes.map((include, i) => (
              <div className="flex justify-start items-center gap-2" key={i}>
                {include.approved ? (
                  <p className="text-lg">✅</p>
                ) : (
                  <p className="text-lg">❌</p>
                )}
                <p className="text-base" key={i}>
                  {include.text}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6 w-full">
            <Button
              text="comprar"
              textColor={"text-black"}
              background={"bg-white"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Advice;
