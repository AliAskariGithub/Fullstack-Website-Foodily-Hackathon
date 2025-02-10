"use client";

import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";
import { FaMinus, FaPlus } from "react-icons/fa";
import { Food } from "@/sanity/Types/schemasTypes";
import { toast } from "sonner";

interface AddToBasketButtonProps {
  food: Food;
  disabled?: boolean;
}

const MAX_QUANTITY = 10;

const AddToBasketButton = ({ food, disabled }: AddToBasketButtonProps) => {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(food?._id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  const handleAddItem = () => {
    if (itemCount < MAX_QUANTITY) {
      addItem(food);
      toast(`${food.name} has been Added`, { description: new Date().toLocaleString() });
    } else {
      toast("Maximum limit reached (10 items)", { description: new Date().toLocaleString() });
    }
  };

  const handleRemoveItem = () => {
    if (itemCount > 0) {
      removeItem(food._id);
      toast(`${food.name} has been Removed`, { description: new Date().toLocaleString() });
    }
  };

  return (
    <div className="flex items-center w-full -space-x-2">
      <button
        onClick={handleRemoveItem}
        className={`mt-4 py-2 w-10 md:w-full button-hover-effect rounded-l-xl rounded-r-[4px] transition ${
          itemCount > 0 ? "" : "opacity-50 cursor-not-allowed"
        }`}
        disabled={itemCount === 0 || disabled}
      >
       <span className=" flex items-center justify-center text-xs md:text-base"><FaMinus /></span>
      </button>

      <div className={`mt-4 px-4 md:px-6 py-2 border-2 border-[#8f613c] text-[#8f613c] font-bold text-base md:text-lg rounded-md ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}>
         {itemCount}
      </div>

      <button
        onClick={handleAddItem}
        className={`mt-4 py-2 w-10 md:w-full button-hover-effect rounded-r-xl rounded-l-[4px] transition ${
          itemCount >= MAX_QUANTITY || disabled ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={itemCount >= MAX_QUANTITY || disabled}
      >
        <span className=" flex items-center justify-center text-xs md:text-base"><FaPlus/></span>
      </button>
    </div>
  );
};

export default AddToBasketButton;