"use client";
import React from "react";
import { paragraph } from "../utils/paragraphs";
import Image from "next/image";
import Paragraph from "./Paragraph";

const ParagraphContainer = () => {
  return (
    <section className="flex flex-col items-center justify-start my-14 px-4 md:px-10 lg:px-20 max-w-[1350px] mx-auto animate-fade-up">
      <div className="h-[40px] w-full flex justify-center items-center px-4 md:px-10 lg:px-20 max-w-[1350px] mx-auto">
        <div className="divider"></div>
      </div>
      <div className="w-full h-full max-w-[1050px]">
        {paragraph.map((info, index) => (
          <div
            key={index}
            className={`my-20 flex flex-col ${
              info.switch ? "lg:flex-row-reverse" : "lg:flex-row"
            } items-center lg:items-start`}
          >
            <Image
              alt="mobile"
              src={
                index === 0
                  ? "/imgs/plan3.webp"
                  : index === 1
                  ? "/imgs/plan4.webp"
                  : "/imgs/plan1.webp"
              }
              width={400}
              height={480}
              className={`rounded-xl mb-6 lg:mb-0`}
            />
            <Paragraph
              key={index}
              title={info.title}
              texts={info.texts}
              Switch={info.switch}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default ParagraphContainer;
