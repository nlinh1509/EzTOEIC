import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({
  subsets: ["vietnamese"],
  weight: ["400", "700", "800", "900"],
  variable: "--font-inter",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi">
      <body
        className={`${inter.variable} antialiased bg-white dark:bg-slate-950`}
      >
        <Navbar />
        {children}
      </body>
    </html>
  );
}
