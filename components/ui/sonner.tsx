"use client";

import { Chakra_Petch } from "next/font/google";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className={`toaster group border-[#8f613c] text-[#f7c170] ${chakra_petch.className}`}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-[#8f613c] text-xl group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground text-xs",
          actionButton: "bg-white text-[#8f613c]",
          cancelButton: "bg-white text-[#8f613c]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
