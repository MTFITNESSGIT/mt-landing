"use client";
import React from "react";
import ScrollLink from "./SmoothLink";
import Player from "./Player";
import Button from "./Button";

const Principal = () => {
  return (
    <section className="w-full flex flex-col items-center justify-center gap-5 md:gap-0 md:justify-between px-4 md:px-10 lg:px-20 max-w-[1350px] mx-auto">
      <h2 className="flex flex-col justify-center items-center gap-5 text-center text-xl lg:text-4xl leading-4 ">
        <span className="text-4xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold text-red">
          RETO 90 DIAS
        </span>
        <span className="text-xl sm:text-3xl 2xl:text-4xl font-extrabold">
          “3 MESES PARA EL RESTO DE TU VIDA”
        </span>
      </h2>
      <div className="flex flex-col justify-center items-center gap-4 md:mt-10">
        <Player
          src={
            "https://firebasestorage.googleapis.com/v0/b/mtfitness-dd45d.appspot.com/o/Presentacion.mp4?alt=media&token=3ac2d420-8612-4f76-b624-c849ce2f57bc"
          }
        />

        <ScrollLink href="#planes">
          <Button
            background="bg-white"
            textColor="text-black"
            text="Quiero empezar yá"
          />
        </ScrollLink>
      </div>
    </section>
  );
};

export default Principal;
