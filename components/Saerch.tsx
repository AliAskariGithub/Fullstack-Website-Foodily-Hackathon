"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchQuery, onSearch }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleSearch = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div
      className={`flex items-center duration-300 transition-all pr-2 py-1 rounded-xl ${
        isExpanded ? "bg-[#f0d5a6]" : "w-max"
      }`}
    >
      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
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
  );
};

export default SearchBar;