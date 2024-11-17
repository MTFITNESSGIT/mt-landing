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
        className="bottom-10 right-10 fixed cursor-pointer"
      >
        <Image
          src="/imgs/whatsapp.webp"
          alt="WhatsApp"
          width="300"
          height="300"
          className="w-[100px] h-[100px]"
        />
      </div>
    </div>
  );
};

export default Whatsapp;
