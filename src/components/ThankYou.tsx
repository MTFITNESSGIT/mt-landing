"use client";
import React from "react";
import Button from "./Button";
import { useRouter } from "next/navigation";

const ThankYou = () => {
  const router = useRouter();
  return (
    <section className="w-full bg-black px-4 md:px-10 lg:px-20 py-12 animate-fade-up">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl p-8 md:p-12 flex flex-col gap-10 items-center shadow-md">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-bold text-red">
          ¡Muchas gracias por tu compra!
        </h2>

        <p className="text-center text-zinc-700 text-base sm:text-lg max-w-2xl">
          Hemos recibido tu pedido exitosamente. En breve recibirás un correo
          electrónico con los archivos PDF correspondientes a tu plan. Si no lo
          encuentras, recuerda revisar tu carpeta de spam o promociones.
        </p>

        <div className="w-full flex flex-col-reverse md:flex-row items-center justify-between gap-8 max-w-[300px]">
          <Button
            text="Volver al inicio"
            background="bg-red"
            textColor="text-white"
            onClick={() => router.push("/")}
          />
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
