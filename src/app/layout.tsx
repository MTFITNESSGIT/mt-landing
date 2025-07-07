import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Tomás Medina | Personal Trainer Online",
  description:
    "Transformá tu cuerpo con planes personalizados de entrenamiento y nutrición. Entrená con Tomás Medina desde cualquier lugar del mundo.",
  keywords: [
    "entrenador personal",
    "planes de entrenamiento",
    "nutrición online",
    "fitness",
    "tomás medina",
    "personal trainer argentina",
    "rutinas personalizadas",
    "tomymedina",
  ],
  authors: [{ name: "Tomás Medina" }],
  creator: "Tomás Medina",
  metadataBase: new URL("https://tomymedina.com"),
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Tomás Medina | Entrenador Personal Online",
    description:
      "Entrenamiento y nutrición personalizada para lograr tus objetivos. Online y a medida.",
    url: "https://tomymedina.com",
    siteName: "Tomás Medina",
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "https://tomymedina.com/twitter.png",
        width: 1200,
        height: 630,
        alt: "Tomás Medina - Entrenador Personal Online",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tomás Medina | Entrenador Personal Online",
    description:
      "Planes personalizados de entrenamiento y nutrición. Transformá tu vida con Tomás Medina.",
    site: "@tomymedina",
    creator: "@tomymedina",
    images: ["https://tomymedina.com/twitter.png"],
  },
};

import { Oswald } from "next/font/google";
import { Providers } from "./providers";
import Script from "next/script";

const oswald = Oswald({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="!scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="Tomás Medina" />
        <meta name="format-detection" content="telephone=no" />
        <link
          rel="preload"
          as="image"
          href="https://tomymedina.com/twitter.png"
          type="image/png"
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-4F1R7JFJTV"
          strategy="afterInteractive"
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-4F1R7JFJTV');
            `,
          }}
        />
      </head>
      <body
        className={`text-white w-full max-w-[1350px] mx-auto ${oswald.className}`}
      >
        <Header />
        <main className="flex w-full flex-col items-center justify-between text-white blob-background">
          <Providers>{children}</Providers>
        </main>
        <Footer />
      </body>
    </html>
  );
}
