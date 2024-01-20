import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Profile",
  description: "Your Profile",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body
          className={inter.className + " w-full min-h-screen flex flex-col"}
        >
          <Header active="" />
          {children}
        </body>
      </html>
    </ClientProvider>
  );
}
