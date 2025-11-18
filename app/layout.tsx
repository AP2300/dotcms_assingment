import type { Metadata } from "next";
import { Readex_Pro } from "next/font/google";
import "./globals.css";

const readexPro = Readex_Pro({
  subsets: ["latin"],
  variable: "--font-readex-pro",
});

export const metadata: Metadata = {
  title: "Outspire",
  description: "Creating inspiring digital experiences that connect and engage.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${readexPro.className} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
