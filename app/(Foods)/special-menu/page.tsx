"use client";

import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import Image from "next/image";
import { MenuItem } from "@/types";
import Sidebar from "@/components/Sidebar";
import { Caveat, Chakra_Petch, Cinzel, Satisfy } from "next/font/google";
import { FaMinus, FaPlus, FaSearch } from "react-icons/fa";
import Link from "next/link";
import { IoCartSharp } from "react-icons/io5";

const caveat = Caveat({ weight: "600", subsets: ["latin"] });
const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });
const cinzel = Cinzel({ weight: "800", subsets: ["latin"] });

const SpecialMenu = () => {
  const [menu, setMenu] = useState<MenuItem[]>([]);
  const [filteredMenu, setFilteredMenu] = useState<MenuItem[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  useEffect(() => {
    const fetchMenu = async () => {
      const response = await fetch("/api/special-menu");
      const data = await response.json();
      setMenu(data);
      setFilteredMenu(data);
      setLoading(false);
    };

    fetchMenu();
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = menu.filter((item) =>
      item.food.toLowerCase().includes(query)
    );
    setFilteredMenu(filtered);
  };

  const toggleSearch = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen px-4 w-full">
      <div>
        <Sidebar />
      </div>

      <div className="flex justify-end items-center gap-2 fixed z-10 right-5 bg-opacity-10 backdrop-blur-md py-3  bg-darkpeach h-max w-full">
        <div
          className={`flex items-center duration-300 transition-all pr-2 py-1 rounded-xl ${
            isExpanded ? " bg-[#f0d5a6]" : "w-max"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch}
            className={`ml-2 rounded px-3 py-1 transition-all duration-300 focus:outline-none bg-[#f0d5a6] text-[#8f613c] ${
              caveat.className
            } ${isExpanded ? "w-48 md:w-72 opacity-100" : "w-0 opacity-0"}`}
          />
          <FaSearch
            onClick={toggleSearch}
            size={24}
            className="text-[#8f613c] hover:text-[#744732] hover:scale-125 duration-200 transition-all cursor-pointer ml-2 mr-2"
          />
        </div>
        <Link
          href="/cart"
          className="w-max cursor-pointer  text-[#8f613c] hover:text-[#744732] hover:scale-125 duration-200 transition-all"
        >
          <div className="w-4 h-4 flex justify-center items-center bg-[#e9b966] rounded-full fixed ml-4 -mt-0.5 border border-[#744732]">
            <span
              className={`text-xs text-[#744732] fixed ${chakra_petch.className}`}
            >
              0
            </span>
          </div>
          <IoCartSharp size={28} />
        </Link>
      </div>

      <div className="flex flex-col w-full ml-14 mt-24">
        <h1
          className={`text-4xl font-bold text-center mb-8 text-[#8f613c] relative z-10 ${chakra_petch.className}`}
        >
          Special Menu
        </h1>

        {loading ? (
          <div className="text-center text-xl">
            <Loader />
          </div>
        ) : (
          <div className="w-full flex justify-center itrems-center">
            {filteredMenu.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 slide-in-bck-center lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-4xl">
                {filteredMenu.map((item) => (
                  <div
                    key={item.id}
                    className="max-w-sm rounded-lg shadow-lg bg-white transform transition duration-300 hover:scale-105 hover:shadow-2xl"
                  >
                    <Image
                      className="w-full h-56 object-cover rounded-t-lg"
                      src={item.image_url}
                      alt={item.food}
                      width={1000}
                      height={1000}
                    />
                    <div className="p-4">
                      <h3
                        className={`text-xl font-extrabold ${satisfy.className}`}
                      >
                        {item.food}
                      </h3>

                      <p
                        className={`text-gray-600 text-sm mt-1 line-clamp-3 ${satisfy.className}`}
                      >
                        {item.description}
                      </p>

                      <div className="flex items-center justify-between mt-5">
                        <span
                          className={`flex items-center font-extrabold text-lg ${satisfy.className}`}
                        >
                          Rs {item.price}
                        </span>
                        
                        <span className="text-lg font-bold">
                          {item.ratings}
                        </span>
                      </div>

                      <div className="flex -space-x-1 w-full">
                        <button className="mt-4 button-hover-effect w-full rounded-l-xl">
                          <span
                            className={`${cinzel.className} relative left-[40%]`}
                          >
                            <FaMinus size={20} />
                          </span>
                        </button>
                        <button className="mt-4 border-4 border-[#8f613c] w-full">
                          <span
                            className={`${cinzel.className} text-lg text-[#8f613c]`}
                          >
                            Items
                          </span>
                        </button>
                        <button className=" mt-4 button-hover-effect  rounded-r-xl w-full">
                          <span
                            className={`${cinzel.className} relative left-[40%]`}
                          >
                            <FaPlus size={20} />
                          </span>
                        </button>
                      </div>
                      
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600 text-lg">
                No items match from the search.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SpecialMenu;
