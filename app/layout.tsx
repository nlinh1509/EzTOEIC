/* eslint-disable @next/next/no-page-custom-font */
import { Inter, Lexend } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AuthProvider from "@/components/AuthProvider";

const inter = Inter({
  subsets: ["vietnamese"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-inter",
});

const lexend = Lexend({
  subsets: ["latin"],
  variable: "--font-lexend",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <head>
        {/* icon */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${inter.variable} ${lexend.variable} antialiased bg-[#f0f9f6] text-slate-900`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
