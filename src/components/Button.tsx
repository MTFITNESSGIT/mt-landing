import { TButton } from "../types";
import React from "react";

const Button = ({
  background,
  textColor,
  text,
  onClick,
  disabled,
}: TButton) => {
  return (
    <button
      onClick={onClick}
      className={`text-lg lg:text-xl 2xl:text-2xl rounded-[60px] ${background} ${textColor} px-[20px] py-[15px] md:px-[50px] md:py-[10px] w-full uppercase font-bold italic animate-fade-in transform transition duration-500 
    hover:scale-105 
    ${disabled ? "opacity-50 cursor-not-allowed pointer-events-none" : ""}`}
      disabled={disabled}
    >
      {text}
    </button>
  );
};

export default Button;
