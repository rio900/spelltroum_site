import type { Metadata } from "next";
import { Geist, Geist_Mono, Lilita_One } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const lilita = Lilita_One({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-lilita-one",
});

export const metadata: Metadata = {
  title: "Spelltroum",
  description: "Multiplayer battle arena game on Solana blockchain.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${lilita.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}