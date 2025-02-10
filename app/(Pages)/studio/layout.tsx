import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WareHouse",
  description: "This is a food website. Here you can add food and can maange orders details.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="relative z-50">
        {children}
        </div>
      </body>
    </html>
  );
}
