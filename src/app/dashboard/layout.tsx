import type React from "react";
import "../globals.css";
import { Toaster } from "sonner";
import { Providers } from "./providers";

export const metadata = {
  title: "MT Fitness Dashboard",
  description: "Panel de control para gestión de pagos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      {children}
      <Toaster position="top-right" />
    </Providers>
  );
}
