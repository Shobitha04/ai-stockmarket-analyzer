import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StockSage AI - Indian Stock Market Intelligence",
  description: "AI-powered stock market analysis and insights for Indian markets (NSE/BSE)",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <div className="hidden md:flex md:w-64 md:flex-col">
            <Sidebar />
          </div>
          <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div className="py-6">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                {children}
              </div>
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}
