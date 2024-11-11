import React from "react";
import ScrollLink from "./SmoothLink";
import Button from "./Button";

interface DividerReady {
  ready?: boolean;
}

const DividerReady = ({ ready }: DividerReady) => {
  return (
    <section
      className={`w-full h-full max-w-[1045px]  py-5 ${
        !ready ? "md:h-[200px]" : "md:h-[340px]"
      }  bg-gradient-to-r from-[#650C0C] to-red flex flex-col items-center justify-center gap-5 md:gap-10 my-10`}
    >
      {ready && (
        <div className="flex flex-col justify-center items-center">
          <p className="text-xl md:text-3xl font-extrabold">
            Si ellos lo LOGRARON
          </p>
          <p className="text-center text-xl md:text-3xl font-extrabold">
            es porque vos también podes hacerlo.
          </p>
        </div>
      )}
      <div className="flex flex-col justify-center items-center gap-4">
        <p className="text-xl md:text-3xl font-extrabold">¿Estás listo?</p>
        <ScrollLink href="#planes">
          <Button
            text="INICIAR AHORA"
            background="bg-black"
            textColor="text-white"
          />
        </ScrollLink>
      </div>
    </section>
  );
};

export default DividerReady;
