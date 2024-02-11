import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Franco Carrara",
};

export default function RootLayout({
  children,
  intro
}: Readonly<{
  children: React.ReactNode;
  intro: React.ReactNode;
}>) {
  return (
    <>
        {intro}
        {children}
    </>
  );
}
