"use client";
import React, { Suspense } from "react";
import { plans } from "../../utils/plans";
import PlanCheckout from "../../components/PlanCheckout";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import { handleCheckout } from "./action";

const CheckoutClient: React.FC = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const plan = searchParams.get("plan");
  const selectedPlan = plans.find((p) => p.title.toLowerCase() === plan);
  const { title, background, category, includes, values } = selectedPlan || {};

  const handlePay = async () => {
    if (!selectedPlan) return;

    try {
      const url = await handleCheckout(selectedPlan);
      router.push(url);
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  if (!selectedPlan) {
    return <p>Loading plan details...</p>; // Fallback content while waiting for selectedPlan
  }

  return (
    <Suspense>
      <section className="bg-black w-full flex flex-col items-center justify-center gap-5 md:gap-0 md:justify-between px-4 md:px-10 lg:px-20 max-w-[1350px] mx-auto">
        <div className="p-6 w-full bg-white rounded-2xl flex flex-col items-center justify-center gap-10">
          <div className="flex flex-col justify-center items-center ">
            <h2 className="text-black font-bold text-2xl text-center">
              Estas por suscribirte al plan
            </h2>
            <h3 className="text-red font-bold text-3xl text-center uppercase">
              {title} nivel {category}
            </h3>
          </div>
          <div className="w-full h-full flex flex-col gap-5 justify-center items-start md:flex-row">
            <PlanCheckout
              title={title as string}
              background={background as number}
            />
            <div className="text-black mt-2">
              <div className="w-full h-full">
                {values &&
                  values.map((value, i) => (
                    <div
                      className="flex justify-start items-center gap-2"
                      key={i}
                    >
                      {value.approved && <p className="text-lg">✅</p>}
                      <p className="text-base">{value.text}</p>
                    </div>
                  ))}
              </div>
              <div className="w-full h-full">
                <h4 className="text-lg font-bold my-4">¿Que incluye?</h4>
                {includes &&
                  includes.map((include, i) => (
                    <div
                      className="flex justify-start items-center gap-2"
                      key={i}
                    >
                      {include.approved ? (
                        <p className="text-lg">✅</p>
                      ) : (
                        <p className="text-lg">❌</p>
                      )}
                      <p className="text-base">{include.text}</p>
                    </div>
                  ))}
              </div>
            </div>
          </div>
          <button
            onClick={handlePay}
            className="w-full max-w-[400px] cursor-pointer bg-blue p-3 rounded-md text-white flex justify-center items-center"
          >
            Mercado Pago
            <Image
              src="/imgs/mercadopago.png"
              width={30}
              height={30}
              alt="mercadopago"
              className="ml-2"
            />
          </button>
          <div className="w-[300px] h-[3px] bg-gray-200"></div>
          <div
            id="paypal-button-container"
            className="w-full max-w-[400px] h-full"
          ></div>
        </div>
      </section>
    </Suspense>
  );
};

export default CheckoutClient;
