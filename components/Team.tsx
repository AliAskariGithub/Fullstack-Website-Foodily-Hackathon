import { Caveat, Chakra_Petch, Cinzel, Satisfy } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { BsEmojiSunglasses } from "react-icons/bs";

const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });
const cinzel = Cinzel({ weight: "800", subsets: ["latin"] });
const caveat = Caveat({ weight: "600", subsets: ["latin"] });

const Team = () => {
  return (
    <div className="flex flex-col items-center h-max w-full">
      <h1
        className={`text-4xl absolute top-10 font-bold text-center mb-8 text-[#8f613c] ${chakra_petch.className}`}
      >
        Meet The Team
      </h1>
      <div className="flex flex-col justify-between items-center w-full">
        <div className="flex justify-between items-center max-w-7xl">
          <BsEmojiSunglasses size={40} />

          <div className="flex absolute z-40 hover:z-50 duration-300 hover:translate-x-48 transition-all hover:scale-125 cursor-pointer mr-5 right-1/2 flex-col justify-center items-start max-w-sm  border bg-[#e1d3b6] border-[#8f613c] rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center w-full">
              <h1
                className={`text-2xl font-bold text-center text-[#8f613c] ${caveat.className}`}
              >
                Ali Askari
              </h1>
              <div className="flex justify-center items-center gap-2">
                <Link
                  href={""}
                  className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
                >
                  <FaLinkedin size={16} />
                </Link>
                <Link
                  href={""}
                  className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
                >
                  <FaGithub size={16} />
                </Link>
                <Link
                  href={""}
                  className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
                >
                  <FaFacebook size={16} />
                </Link>
                <Link
                  href={""}
                  className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
                >
                  <FaSquareXTwitter size={16} />
                </Link>
              </div>
            </div>

            <p className={`text-[#8f613c] text-sm mt-1 ${satisfy.className}`}>
              I There👋! I am Ali .And I am 16 and energatic Fullstack
              Developer. I have already worked on may projects😎. For more infor
              see my portfolio👀
            </p>

            <div className="flex justify-between items-center w-full">
              <Link href={"https://alis-x-portfolio.vercel.app"}>
                <button className="button-hover-effect-border text-sm rounded-full">
                  <span className={`${cinzel.className} text-sm px-2`}>
                    Portfolio
                  </span>
                </button>
              </Link>
              <Image
                src={"/Team01.png"}
                alt="Team 01"
                width={100}
                height={100}
                className="rounded-full w-16 h-16 -mt-2"
              />
            </div>
          </div>

          <div className="flex  absolute z-20 hover:z-50 duration-300 hover:-translate-x-48 transition-all hover:scale-125 cursor-pointer ml-5 left-1/2 flex-col justify-center items-start max-w-sm  border bg-[#e1d3b6] border-[#8f613c] rounded-xl shadow-lg p-4">
            <div className="flex justify-between items-center w-full">
              <h1
                className={`text-2xl font-bold text-center text-[#8f613c] ${caveat.className}`}
              >
                Ali Askari
              </h1>
              <div className="flex justify-center items-center gap-2">
                <Link
                  href={""}
                  className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
                >
                  <FaLinkedin size={16} />
                </Link>
                <Link
                  href={""}
                  className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
                >
                  <FaGithub size={16} />
                </Link>
                <Link
                  href={""}
                  className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
                >
                  <FaFacebook size={16} />
                </Link>
                <Link
                  href={""}
                  className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
                >
                  <FaSquareXTwitter size={16} />
                </Link>
              </div>
            </div>

            <p className={`text-[#8f613c] text-sm mt-1 ${satisfy.className}`}>
              I There👋! I am Ali .And I am 16 and energatic Fullstack
              Developer. I have already worked on may projects😎. For more infor
              see my portfolio👀
            </p>

            <div className="flex justify-between items-center w-full">
              <Link href={"https://alis-x-portfolio.vercel.app"}>
                <button className="button-hover-effect-border text-sm rounded-full">
                  <span className={`${cinzel.className} text-sm px-2`}>
                    Portfolio
                  </span>
                </button>
              </Link>
              <Image
                src={"/Team01.png"}
                alt="Team 01"
                width={100}
                height={100}
                className="rounded-full w-16 h-16 -mt-2"
              />
            </div>
          </div>
        </div>

        <div className="absolute top-1/2 mt-5 z-10 hover:z-50 duration-300 hover:-translate-y-28 transition-all hover:scale-125 cursor-pointer flex flex-col justify-center items-start bg-[#e1d3b6] max-w-sm  border border-[#8f613c] rounded-xl shadow-lg p-4">
          <div className="flex justify-between items-center w-full">
            <h1
              className={`text-2xl font-bold text-center text-[#8f613c] ${caveat.className}`}
            >
              Ali Askari
            </h1>
            <div className="flex justify-center items-center gap-2">
              <Link
                href={""}
                className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
              >
                <FaLinkedin size={16} />
              </Link>
              <Link
                href={""}
                className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
              >
                <FaGithub size={16} />
              </Link>
              <Link
                href={""}
                className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
              >
                <FaFacebook size={16} />
              </Link>
              <Link
                href={""}
                className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
              >
                <FaSquareXTwitter size={16} />
              </Link>
            </div>
          </div>

          <p className={`text-[#8f613c] text-sm mt-1 ${satisfy.className}`}>
            I There👋! I am Ali .And I am 16 and energatic Fullstack Developer.
            I have already worked on may projects😎. For more infor see my
            portfolio👀
          </p>

          <div className="flex justify-between items-center w-full">
            <Link href={"https://alis-x-portfolio.vercel.app"}>
              <button className="button-hover-effect-border text-sm rounded-full">
                <span className={`${cinzel.className} text-sm px-2`}>
                  Portfolio
                </span>
              </button>
            </Link>
            <Image
              src={"/Team01.png"}
              alt="Team 01"
              width={100}
              height={100}
              className="rounded-full w-16 h-16 -mt-2"
            />
          </div>
        </div>

        <div className="absolute bottom-1/2 mb-5 z-30 hover:z-50 duration-300 hover:translate-y-28 transition-all hover:scale-125 cursor-pointer flex flex-col justify-center items-start max-w-sm  border bg-[#e1d3b6] border-[#8f613c] rounded-xl shadow-lg p-4">
          <div className="flex justify-between items-center w-full">
            <h1
              className={`text-2xl font-bold text-center text-[#8f613c] ${caveat.className}`}
            >
              Ali Askari
            </h1>
            <div className="flex justify-center items-center gap-2">
              <Link
                href={""}
                className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
              >
                <FaLinkedin size={16} />
              </Link>
              <Link
                href={""}
                className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
              >
                <FaGithub size={16} />
              </Link>
              <Link
                href={""}
                className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
              >
                <FaFacebook size={16} />
              </Link>
              <Link
                href={""}
                className="text-[#8f613c] hover:text-[#724e31] hover:scale-125 duration-150 transition-all"
              >
                <FaSquareXTwitter size={16} />
              </Link>
            </div>
          </div>

          <p className={`text-[#8f613c] text-sm mt-1 ${satisfy.className}`}>
            I There👋! I am Ali .And I am 16 and energatic Fullstack Developer.
            I have already worked on may projects😎. For more infor see my
            portfolio👀
          </p>

          <div className="flex justify-between items-center w-full">
            <Link href={"https://alis-x-portfolio.vercel.app"}>
              <button className="button-hover-effect-border text-sm rounded-full">
                <span className={`${cinzel.className} text-sm px-2`}>
                  Portfolio
                </span>
              </button>
            </Link>
            <Image
              src={"/Team01.png"}
              alt="Team 01"
              width={100}
              height={100}
              className="rounded-full w-16 h-16 -mt-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
