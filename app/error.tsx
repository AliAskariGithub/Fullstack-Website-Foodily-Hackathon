"use client";
import { BiError } from "react-icons/bi";
import { useEffect } from "react";
import { Chakra_Petch } from "next/font/google";
import { TbRefresh } from "react-icons/tb";

const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error("Error occurred:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center h-screen relative z-[10000] bg-gradient-to-r from-[#e1d3b6] via-[#e9b966] to-[#e1d3b6]">
    <BiError size={400} color="red"/>
    <p className={`${chakra_petch.className} text-2xl`}>
      505 Error! Refresh the Page.
    </p>
    <button
      onClick={() => reset()}
      className="mt-6 px-4 py-2 flex justify-center items-center gap-1 bg-darkpeach hover:bg-darkorange/80 w-max duration-200 transition-all rounded-[4px] shadow-md border border-darkorange/30"
    >
      <TbRefresh /> Refresh
    </button>
  </div>
  );
}
