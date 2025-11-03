"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Button } from "./ui/button";

export function CyberMondayPopup() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => {
    triggerConfetti();
    setIsOpen(false);
  };

  const triggerConfetti = () => {
    // Create canvas for confetti if it doesn't exist
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      color: string;
      size: number;
    }> = [];

    // Create colorful confetti particles
    const colors = [
      "#FF6B6B",
      "#4ECDC4",
      "#45B7D1",
      "#FFA502",
      "#FF1654",
      "#9D4EDD",
    ];
    for (let i = 0; i < 100; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        vx: (Math.random() - 0.5) * 8,
        vy: Math.random() * 8 + 4,
        life: 2,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 6 + 2,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let hasAlive = false;
      particles.forEach((p) => {
        if (p.life > 0) {
          hasAlive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.2; // gravity
          p.life -= 0.015;

          ctx.globalAlpha = p.life;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
          ctx.globalAlpha = 1;
        }
      });

      if (hasAlive) {
        requestAnimationFrame(animate);
      } else {
        document.body.removeChild(canvas);
      }
    };

    animate();
  };

  useEffect(() => {
    // Show popup on page load
    setIsOpen(true);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-md"
        onClick={handleClose}
      />

      <div className="relative z-10 mx-4 max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <button
          onClick={handleClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 transition-colors"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <Image
            src="/imgs/cyber-monday.webp"
            alt="Cyber Monday Logo"
            width={280}
            height={200}
            className="object-contain"
            priority
          />
        </div>

        {/* Text content */}
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold text-gray-900">Cyber Monday</h2>
          <p className="text-lg text-gray-600 font-semibold">
            Toda la página tiene grandes descuentos! 🎉
          </p>
          <p className="text-sm text-gray-500">¡No te lo pierdas!</p>
        </div>

        <Button
          onClick={handleClose}
          className="w-full mt-8 bg-gradient-to-r from-[#650C0C] to-red text-white font-bold py-6 rounded-lg hover:shadow-lg transition-all transform hover:scale-105"
        >
          Empieza ya
        </Button>
      </div>
    </div>
  );
}
