import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/sonner"; // <-- 1. Import Toaster

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Samarpan - Ek Soch, Ek Viswas",
  description: "An NGO of Haldia Institute of Technology, providing free primary education to the needy children of nearby areas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          inter.variable
        )}
      >
        <Navbar />
        <main>{children}</main>
        <Footer />
        <Toaster /> {/* <-- 2. Add Toaster here */}
      </body>
    </html>
  );
}
