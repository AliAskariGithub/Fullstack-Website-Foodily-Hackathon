"use client";
import Link from "next/link";
import { useState } from "react";
import { BiDish } from "react-icons/bi";
import { UserButton } from "@clerk/nextjs";
import { useAuth, useUser } from "@clerk/clerk-react";
import { FiSidebar } from "react-icons/fi";
import { Caveat } from "next/font/google";
import { MdOutlineDashboard } from "react-icons/md";
import { RiWechatLine } from "react-icons/ri";

const caveat = Caveat({ weight: "600", subsets: ["latin"] });

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { userId } = useAuth();
  const { user } = useUser();

  const toggleSidebar = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div>
      <div>
        <FiSidebar
          onClick={toggleSidebar}
          size={20}
          className={`fixed top-5 z-50 duration-150 transition-all text-[#8f613c] ${
            isExpanded ? "left-[182px] " : "md:left-[70px] left-6"
          }`}
        />
      </div>

      <div
        className={`flex flex-col h-full z-50 bg-[#e9b966] md:px-4 md:pr-10 fixed top-0 left-0 overflow-hidden duration-200 transition-all ${
          isExpanded ? "w-44 px-4" : "w-3"
        }`}
      >
        <div
          className={`flex items-center justify-start mt-4 mb-8 h-max w-full ${
            isExpanded
              ? "md:opacity-100 opacity-100"
              : "md:opacity-100 opacity-0"
          }`}
        >
          {userId ? (
            <div className="flex justify-center items-center gap-2">
              <div className="border border-white rounded-full w-8 h-8 flex justify-center items-center">
                <UserButton />
              </div>
              <div className="flex flex-col justify-center items-start -space-y-2">
                <span
                  className={`flex justify-center items-center w-max  ${
                    caveat.className
                  } ${isExpanded ? "block" : "hidden"}`}
                >
                  Welcome Admin
                </span>
                <span
                  className={`flex justify-center items-center w-max font-extrabold text-xl ${
                    caveat.className
                  } ${isExpanded ? "block" : "hidden"}`}
                >
                  {user?.fullName}
                </span>
              </div>
            </div>
          ) : (
            <div className="w-8 h-8 bg-white/50 rounded-full animate-pulse">
              <span className="opacity-0">image</span>
            </div>
          )}
        </div>

        <ul
          className={`flex flex-col gap-4 justify-center items-start  ${
            isExpanded
              ? "md:opacity-100 opacity-100"
              : "md:opacity-100 opacity-0"
          }`}
        >
          <Link
            href={"/admin"}
            className="flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition"
          >
            <MdOutlineDashboard size={22} />
            {isExpanded && (
              <span
                onClick={toggleSidebar}
                className={`${caveat.className} hover:underline-effect text-xl hover:font-bold`}
              >
                Dashboard
              </span>
            )}
          </Link>

          <Link
            href={"/admin/foods"}
            className="flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition"
          >
            <BiDish size={22} />
            {isExpanded && (
              <span
                onClick={toggleSidebar}
                className={`${caveat.className} hover:underline-effect text-xl hover:font-bold `}
              >
                Food
              </span>
            )}
          </Link>

          <Link
            href={"/admin/chats"}
            className="flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition"
          >
            <RiWechatLine size={22} />
            {isExpanded && (
              <span
                onClick={toggleSidebar}
                className={`${caveat.className} hover:underline-effect text-xl hover:font-bold `}
              >
                Chats
              </span>
            )}
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
