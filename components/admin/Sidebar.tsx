"use client";
import Link from "next/link";
import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { useAuth, useUser } from "@clerk/clerk-react";
import { FiSidebar } from "react-icons/fi";
import { Caveat } from "next/font/google";
import { RiFilePaper2Line } from "react-icons/ri";
import { AiOutlineProduct } from "react-icons/ai";
import { BsBoxes } from "react-icons/bs";
import { BsChatSquareText } from "react-icons/bs";

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
      <div
        className={`flex flex-col h-full z-20 bg-[#e9b966] px-4 pr-10 fixed top-0 left-0 duration-200 transition-all ${
          isExpanded ? "w-44" : "w-16"
        }`}
      >
        <FiSidebar
          onClick={toggleSidebar}
          size={20}
          className={`fixed top-5 duration-150 transition-all text-[#8f613c] ${
            isExpanded ? "left-[182px]" : "left-[70px]"
          }`}
        />
        <div className="flex items-center justify-start mt-4 mb-8 h-max w-full">
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
                  Welcome Back
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

        <ul className="flex flex-col gap-4 justify-center items-start">
          <Link
            href={"/admin"}
            className="flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition"
          >
            <BsBoxes size={22} />
            {isExpanded && (
              <span
                onClick={toggleSidebar}
                className={`${caveat.className} hover:underline-effect text-xl hover:font-bold `}
              >
                Dashboard
              </span>
            )}
          </Link>

          <Link
            href={"/NewFood"}
            className="flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition"
          >
            <AiOutlineProduct size={22} />
            {isExpanded && (
              <span
                onClick={toggleSidebar}
                className={`${caveat.className} hover:underline-effect text-xl hover:font-bold `}
              >
                Add Food
              </span>
            )}
          </Link>

          <Link
            href={"/studio"}
            className="flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition"
          >
            <RiFilePaper2Line size={22} />
            {isExpanded && (
              <span
                onClick={toggleSidebar}
                className={`${caveat.className} hover:underline-effect text-xl hover:font-bold `}
              >
                Menu
              </span>
            )}
          </Link>

          <Link
            href={"/admin/chat"}
            className="flex justify-center items-center gap-2 hover:scale-125 text-[#8f613c] hover:text-[#744732] duration-200 transition"
          >
            <BsChatSquareText size={22} />
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
