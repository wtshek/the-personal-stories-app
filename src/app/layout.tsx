import type { Metadata } from "next";

import "./globals.css";
import { NextProviders } from "./providers";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <NextProviders>
        <body className="text-black bg-white min-w-screen min-h-screen">
          {children}
        </body>
      </NextProviders>
    </html>
  );
}
