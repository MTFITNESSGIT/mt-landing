import React from "react";
import { TParagraph } from "../types";

const Paragraph = ({ title, texts, Switch }: TParagraph) => {
  return (
    <div
      className={`${
        Switch ? "pr-6" : "pl-6"
      } w-full transition-all duration-700 transform`}
    >
      <div
        className={`flex gap-2 items-center justify-center lg:justify-start lg:items-left flex-row`}
      >
        <p className="text-lg">✅</p>
        <h3 className="font-extrabold text-xl md:text-2xl 2xl:text-3xl my-2">
          {title}
        </h3>
      </div>
      <div>
        {texts.map((text, index) => (
          <p
            key={index}
            className="font-medium text-base 2xl:text-base text-left my-4"
          >
            {text}
          </p>
        ))}
      </div>
    </div>
  );
};

export default Paragraph;