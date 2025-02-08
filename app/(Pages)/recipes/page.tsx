"use client";

import { useState, useEffect } from "react";
import RecipeCard from "@/components/RecipeCard";
import { getRecipes } from "@/sanity/lib/fetchquires/recipe";
import { Recipe } from "@/sanity/Types/schemasTypes";
import { Chakra_Petch } from "next/font/google";
import { FaSearch } from "react-icons/fa";
import Image from "next/image";
import { BiBook } from "react-icons/bi";

const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

export default function RecipesPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSearch = () => {
    setIsExpanded((prev) => !prev);
  };

  useEffect(() => {
    async function fetchData() {
      const data = await getRecipes();
      setRecipes(data);
      setFilteredRecipes(data);
    }
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredRecipes(filtered);
  }, [searchTerm, recipes]);

  return (
    <div className="container mx-auto px-4 py-10 mt-10">
      <h1
        className={`text-4xl font-bold text-center mb-8 text-[#8f613c] relative z-20 ${chakra_petch.className}`}
      >
        Foods Recipes
      </h1>

      <div className="flex justify-end items-center gap-2 fixed top-0 right-[70px] z-10 bg-opacity-10 backdrop-blur-md py-2 bg-darkpeach h-16 w-full">
        <div
          className={`flex items-center duration-300 transition-all pr-2 py-1 rounded-xl ${
            isExpanded ? "bg-[#f0d5a6]" : "w-max"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={`ml-2 rounded px-3 py-1 transition-all duration-300 focus:outline-none bg-[#f0d5a6] text-[#8f613c] ${
              isExpanded ? "w-48 md:w-72 opacity-100" : "w-0 opacity-0"
            }`}
          />
          <FaSearch
            onClick={toggleSearch}
            size={24}
            className="text-[#8f613c] hover:text-[#744732] hover:scale-125 duration-200 transition-all cursor-pointer ml-2 mr-2"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.title} recipe={recipe} />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-[40vh] col-span-full text-gray-500">
            <div className="flex items-center justify-center -space-x-6">
              <BiBook size={70} color="8f613c" className="-rotate-45 mt-8" />
              <Image
                src="/no-recipe-found.png"
                alt="No recipe found"
                width={500}
                height={500}
                className="w-40 h-40 rounded-full border-4 bg-darkpeach relative z-10 border-[#8f613c]"
              />
              <BiBook size={70} color="8f613c" className="rotate-45 mt-8" />
            </div>
            <p className={`text-2xl ${chakra_petch.className} text-black/80`}>
              No recipes found.
            </p>
            <p className={`text-sm ${chakra_petch.className} text-black/80`}>
              Try searching with a different keyword.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
