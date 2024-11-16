"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { capitalizeFirstLetter } from "@/utils/capitalLetter";
import DownloadFilesButton from "./DownloadButton";

const ThankYou = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const type = searchParams.get("type");
  const category = searchParams.get("category");
  const paymentId = searchParams.get("payment_id");
  const adjustedType = type === "Muscular" ? "Musculo" : type;

  const [loading, setLoading] = useState(true);
  const [download, setDownload] = useState<number>(0);
  const [progress, setProgress] = useState(0);

  const capitalizeType = capitalizeFirstLetter(adjustedType as string);
  const capitalizeCategory = capitalizeFirstLetter(category as string);

  const DownloadData = capitalizeType + capitalizeCategory;

  useEffect(() => {
    setLoading(true);

    if (!paymentId) return;

    const fetchPayment = async () => {
      try {
        const { data } = await axios.get(
          `/api/get-payment?paymentId=${paymentId}`
        );
        setDownload(data.download);
      } catch (error) {
        console.error("Failed to fetch payment info", error);
        router.replace("/404");
      } finally {
        setLoading(false);
      }
    };

    fetchPayment();
    window.scrollTo(0, 350);
  }, [paymentId, router]);

  return (
    <section className=" bg-black w-full flex flex-col items-center justify-start px-4 md:px-10 lg:px-20 gap-8 max-w-[1200px] mx-auto animate-fade-up">
      <div className="p-6 w-full bg-white rounded-2xl flex flex-col items-center justify-center gap-10">
        <div className="">
          <h2 className="text-4xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold text-red">
            ¡MUCHAS GRACIAS!
          </h2>
        </div>
        <div className="w-full h-full flex flex-col justify-center gap-5 items-center md:flex-row">
          <div className="flex-1 flex justify-end">
            <Image
              src="/imgs/plan3.webp"
              alt="image"
              width={1000}
              height={1000}
              className="w-full max-w-[400px] rounded-xl"
            />
          </div>
          <div className="flex-1 flex flex-col items-center justify-between h-full w-full gap-5">
            <div className="items-left">
              <p className="text-xl text-black text-center">
                Acá te dejo el link para que descargues
              </p>
              {loading ? (
                <Skeleton className="w-full h-4" />
              ) : (
                <p className="text-xl text-black text-center font-bold uppercase">
                  Plan {capitalizeType} nivel {capitalizeCategory}
                </p>
              )}
            </div>
            <div className="flex flex-col justify-start w-full h-full gap-5 bg-gray-200 p-4 rounded-xl max-w-[500px]">
              <div className="flex justify-start w-full items-center gap-2">
                <img src="/svgs/pdf.svg" alt="Icon" width={25} height={25} />
                {loading ? (
                  <Skeleton className="w-full h-4" />
                ) : (
                  <p className="text-black text-sm text-left sm:text-base sm:text-center uppercase">
                    PLAN {type} - {category}
                  </p>
                )}
              </div>
              <div className="flex justify-start w-full items-center gap-2">
                <img src="/svgs/pdf.svg" alt="Icon" width={25} height={25} />
                {loading ? (
                  <Skeleton className="w-full h-4" />
                ) : (
                  <p className="text-black text-sm text-left sm:text-base sm:text-center ">
                    GUIA DE ALIMENTACIÓN PARA{" "}
                    {type === "grasa" ? "PERDER GRASA" : "GANAR MÚSCULO"}
                  </p>
                )}
              </div>
              {type === "grasa" && (
                <div className="flex justify-start w-full items-center gap-2">
                  <img src="/svgs/pdf.svg" alt="Icon" width={25} height={25} />
                  {loading ? (
                    <Skeleton className="w-full h-4" />
                  ) : (
                    <p className="text-black text-sm text-left sm:text-base sm:text-center ">
                      LA GUIA DEFINITIVA PARA PERDER GRASA
                    </p>
                  )}
                </div>
              )}
              <div className="flex justify-start w-full items-center gap-2">
                <img src="/svgs/pdf.svg" alt="Icon" width={25} height={25} />
                {loading ? (
                  <Skeleton className="w-full h-4" />
                ) : (
                  <p className="text-black text-sm text-left sm:text-base sm:text-center ">
                    RECETARIO FIT
                  </p>
                )}
              </div>
            </div>
            {loading ? (
              <Skeleton className="w-full h-4" />
            ) : (
              <>
                {download < 2 ? (
                  <>
                    <div>
                      <p className="text-lg text-black text-center font-bold">
                        ⚠️¡Atencion!
                      </p>
                      <p className="text-lg text-black text-center font-bold">
                        Podrás descargar el plan hasta un máximo de 2 veces
                      </p>
                    </div>
                    <div className="w-full max-w-[500px] lg:max-w-[300px]">
                      <DownloadFilesButton
                        pathFile={DownloadData}
                        download={download}
                        paymentId={paymentId as string}
                        onProgress={setProgress} // Set progress update handler
                      />
                    </div>

                    {progress && (
                      <div className="h-full w-full flex items-center justify-center gap-2">
                        <Progress className="text-red" value={progress} />
                        <p className="text-lg text-black text-center w-60">
                          Descargado: {progress}%
                        </p>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-xl text-black text-center sm:text-xl 2xl:text-2xl">
                    ⚠️ Has superado el máximo número de descargas.
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThankYou;
