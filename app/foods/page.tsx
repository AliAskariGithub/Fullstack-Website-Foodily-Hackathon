"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Food } from "@/sanity/Types/schemasTypes";
import { Caveat, Chakra_Petch, Satisfy } from "next/font/google";
import { FaSearch } from "react-icons/fa";
import Link from "next/link";
import { IoCartSharp } from "react-icons/io5";
import { useUser } from "@clerk/nextjs";
import { fetchFoods } from "@/sanity/lib/fetchquires/food";
import AddToBasketButton from "@/components/AddToBasketButton";
import useBasketStore from "@/store/store";
import { IoIosPricetag } from "react-icons/io";
import FoodView from "@/components/FoodView";

 
const caveat = Caveat({ weight: "600", subsets: ["latin"] });
const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

const FoodPage = () => {
  const [foods, setFoods] = useState<Food[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [filteredMenu, setFilteredMenu] = useState<Food[]>([]);
  const { user } = useUser();
  const itemCount = useBasketStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    const filtered = foods.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setFilteredMenu(filtered);
  };

  const toggleSearch = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    const getFoods = async () => {
      const data = await fetchFoods();
      setFoods(data);
      setLoading(false);
      setFilteredMenu(data);
    };

    getFoods();
  }, []);

  return (
    <div className="flex min-h-screen px-4 w-full pl-16">
      <div className="flex justify-end items-center gap-2 fixed z-10 pr-16 md:pr-24 bg-opacity-10 backdrop-blur-md py-3  bg-darkpeach h-max w-full">
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
          href={user ? "/cart" : "/sign-in"}
          className="w-max cursor-pointer  text-[#8f613c] hover:text-[#744732] hover:scale-125 duration-200 transition-all"
        >
          <div className="w-4 h-4 flex justify-center items-center bg-[#e9b966] rounded-full fixed ml-4 -mt-0.5 border border-[#744732]">
            <span
              className={`text-xs text-[#744732] fixed ${chakra_petch.className}`}
            >
              {itemCount}
            </span>
          </div>
          <IoCartSharp size={28} />
        </Link>
      </div>

      <div className="flex flex-col items-center w-full mt-20">
        <h1
          className={`text-4xl font-bold text-center mb-8 text-[#8f613c] relative z-10 ${chakra_petch.className}`}
        >
          Special Menu
        </h1>

        {loading ? (
          <div className="w-full flex justify-center items-center">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-4xl">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="flex flex-col justify-between items-center max-w-sm rounded-xl shadow-lg bg-[#8f613c] animate-pulse"
                >
                  <div className="w-full h-56 bg-[#e9b966] rounded-t-lg"></div>

                  <div className="p-4 w-full">
                    <div className="w-3/4 h-6 bg-[#e1d3b6] rounded mb-2"></div>
                    <div className="w-full h-4 bg-[#e9b966] rounded mb-2"></div>
                    <div className="flex items-center justify-between mt-5">
                      <div className="w-1/3 h-6 bg-[#e1d3b6] rounded"></div>
                      <div className="w-1/4 h-6 bg-[#e9b966] rounded"></div>
                    </div>
                    <div className="flex -space-x-1 w-full mt-4">
                      <div className="w-1/3 h-10 bg-[#e9b966] rounded-l-xl"></div>
                      <div className="w-1/3 h-10 bg-[#e1d3b6]"></div>
                      <div className="w-1/3 h-10 bg-[#e9b966] rounded-r-xl"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
            <div className="w-full flex justify-center items-center">
              
              {filteredMenu.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 slide-in-bck-center lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full max-w-4xl">
                  {filteredMenu.map((food) => (
                    <div
                      key={food._id}
                      className={`max-w-sm rounded-lg shadow-lg bg-white transform transition duration-300 ${
                        food.stockQuantity > 0
                          ? "hover:scale-105 hover:shadow-2xl"
                          : "opacity-50"
                      }`}
                    ><FoodView foods={foods} />
                      <div className="bg-[#7e502b] absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs">
                        <span className={`${chakra_petch.className}`}>
                          {" "}
                          {food.tags}
                        </span>
                      </div>

                      <Image
                        src={food.image.asset.url}
                        alt={food.name}
                        width={1000}
                        height={1000}
                        className="w-full h-56 object-cover rounded-t-lg"
                      />

                      <div className="p-4">
                        <h2
                          className={`text-xl font-extrabold ${satisfy.className}`}
                        >
                          {food.name}
                        </h2>

                        <p
                          className={`text-gray-600 text-sm mt-1 line-clamp-3 ${satisfy.className}`}
                        >
                          {food.description}
                        </p>

                        <div className="flex items-center justify-between mt-5">
                          <span
                            className={`flex items-center font-extrabold text-lg ${satisfy.className}`}
                          >
                            Rs {food.price}
                            Rs {food.fakePrice}
                          </span>

                          <div>
                            {food.rating &&
                              Array.isArray(food.rating) &&
                              food.rating.length > 0 &&
                              food.rating.map((review, index) => (
                                <span
                                  key={index}
                                  className={`text-lg font-bold ${chakra_petch.className}`}
                                >
                                  {review.rating}/5 ⭐
                                </span>
                              ))}
                          </div>
                        </div>
                        {food.discount > 0 && (
                          <div>
                            <IoIosPricetag className="absolute top-2 -left-2 text-white bg-red-700 w-max px-3 py-1 text-xs" />
                            <span className="font-medium top-2 left-2 absolute z-10">
                              {food.discount}% off
                            </span>
                          </div>
                        )}
                        <div className=" w-full">
                          <AddToBasketButton food={food} />
                        </div>

                        <div
                          className={`${food.stockQuantity > 0 ? "absolute bottom-40 mb-1 right-2" : "cursor-not-allowed absolute top-0 left-0 w-full z-10 bg-opacity-60 backdrop-blur-sm flex justify-center items-center  bg-white h-full"}`}
                        >
                          <span
                            className={`font-medium text-2xl ${
                              food.stockQuantity >= 1
                                ? "text-green-600 text-xs px-3 py-1 rounded-full shadow"
                                : "text-red-800"
                            } ${chakra_petch.className}`}
                          >
                            {food.stockQuantity >= 1
                              ? "In Stock"
                              : "Out of Stock"}
                          </span>
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

export default FoodPage;
