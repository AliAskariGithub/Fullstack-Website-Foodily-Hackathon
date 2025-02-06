import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import Sidebar from "@/components/Sidebar";
import { SanityLive } from "@/sanity/lib/live";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Foodily",
  description:
    "This is a food website. Here you can order food and The interesting part is it is Home Made Food. So order the Food and Enjoy alot.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Sidebar />

          <div>{children}</div>

          <Footer />

          <Toaster />
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
