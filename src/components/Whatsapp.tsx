"use client";
import Image from "next/image";
import React from "react";

const Whatsapp = () => {
  const handleWhatsAppClick = () => {
    window.open("https://chat.whatsapp.com/GkPhndvtlVz9OYAXyxCDxe", "_blank");
  };
  return (
    <div className="relative  w-full h-full">
      <div
        onClick={handleWhatsAppClick}
        className="bottom-5 right-5 fixed cursor-pointer"
      >
        <Image
          src="/imgs/whatsapp.webp"
          alt="WhatsApp"
          width="300"
          height="300"
          className="w-[60px] h-[60px] md:w-[75px] md:h-[75px]"
        />
      </div>
    </div>
  );
};

export default Whatsapp;
