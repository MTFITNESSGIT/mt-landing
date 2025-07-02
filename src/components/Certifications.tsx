"use client";
import React from "react";
import CertificationsCarousel from "./CertificationsCarousel";

const Certifications: React.FC = () => {
  return (
    <section className=" bg-black w-full flex  flex-col items-center justify-start mt-14 px-4 md:px-10 lg:px-20  max-w-[1200px] mx-auto py-4">
      <div className="h-[40px] w-full flex justify-center items-center px-4 md:px-10 lg:px-20 max-w-[1350px] mx-auto">
        <div className="divider"></div>
      </div>
      <div className="flex flex-col justify-center items-center gap-4">
        <div className="w-full flex justify-center">
          <div className="w-10 h-[3px] bg-red"></div>
        </div>
        <div className="flex flex-col justify-center items-center gap-4">
          <h3 className="text-4xl sm:text-3xl lg:text-4xl 2xl:text-5xl font-extrabold text-red">
            Certificaciones
          </h3>
        </div>
      </div>

      <div className="my-20 w-full h-full mx-auto">
        <CertificationsCarousel />
      </div>
    </section>
  );
};

export default Certifications;
