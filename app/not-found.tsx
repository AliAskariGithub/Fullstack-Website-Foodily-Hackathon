import { Chakra_Petch } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen relative z-[10000] bg-gradient-to-r from-[#e1d3b6] via-[#e9b966] to-[#e1d3b6]">
      <Image src={"/404.png"} alt="404 not Found" width={300} height={300} />
      <p className={`${chakra_petch.className} text-2xl`}>
        Oops😅! Page not found.
      </p>
      <Link
        href="/"
        className="mt-6 px-4 py-2 flex justify-center items-center gap-1 bg-darkpeach hover:bg-darkorange/80 w-max duration-200 transition-all rounded-[4px] shadow-md border border-darkorange/30"
      >
        <IoArrowBack /> Go Back
      </Link>
    </div>
  );
}
