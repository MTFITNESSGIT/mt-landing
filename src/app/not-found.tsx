"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  const router = useRouter();

  const goToHome = () => {
    router.push("/");
  };
  return (
    <div className="flex flex-col justify-start items-center gap-5 min-h-[50vh]">
      <h1 className="text-xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold text-red">
        Ups... :(
      </h1>
      <p className="text-xl sm:text-2xl 2xl:text-3xl font-extrabold">
        La pagina que estas buscando no existe, por favor, vuelva al inicio
      </p>
      <Button onClick={goToHome}>Volver al inicio</Button>
    </div>
  );
}
