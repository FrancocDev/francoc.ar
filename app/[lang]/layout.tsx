import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import { cookies, headers } from "next/headers";
import Header from "../components/header";
import Script from "next/script";
import Umami from "../utils/umami";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"], preload: true});

export const metadata: Metadata = {
  title: "Franco Carrara"
};

export default function RootLayout({children}: {children: React.ReactNode}) {;
  const nextCookies = cookies();
  const colorMode = (nextCookies.get("theme")?.value as undefined | "light" | "dark") || "dark";
  const language = nextCookies.get("lang")?.value as undefined | "es"| "en" || "en";

  return (
    <html className={colorMode} lang={language}>
      <Umami/>
      <body
        className={`${inter.className} bg-white dark:bg-slate-950 text-black/90 dark:text-white/90 overflow-x-hidden`}
      >
        <main className="max-w-4xl m-auto">
          <Header colorMode={colorMode} language={language}/>
          <article className="relative px-4">{children}</article>
          <footer className="print:hidden border-t border-neutral-500/20 px-4 mt-24 py-4 flex items-center justify-between">
            <p className="m-auto">
              Franco Carrara - Hecho con ♥ y Next.js
            </p>
          </footer>
        </main>
      </body>
    </html>
  );
}