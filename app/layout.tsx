import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "@/components/ui/sonner";
import { SanityLive } from "@/sanity/lib/live";
import Sidebar from "@/components/Sidebar";

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

          <Toaster />
          <SanityLive />
        </body>
      </html>
    </ClerkProvider>
  );
}
