import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import Header from "@/components/Header";
import ClientProvider from "@/components/ClientProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Chats",
  description: "Your Chats",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClientProvider>
      <html lang="en">
        <body className={inter.className}>
          <Header active="chats" />
          {children}
        </body>
      </html>
    </ClientProvider>
  );
}
