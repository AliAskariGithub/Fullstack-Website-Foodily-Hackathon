"use client";
import useBasketStore from "@/store/store";
import { useEffect, useState } from "react";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { Food } from "@/sanity/Types/schemasTypes";
import { toast } from "sonner";
import { Cinzel } from "next/font/google";

const cinzel = Cinzel({ weight: "800", subsets: ["latin"] });

interface AddToBasketButtonProps {
  food: Food;
  disabled?: boolean;
}

const AddToBasketButton = ({ food, disabled }: AddToBasketButtonProps) => {
  const { addItem, removeItem, getItemCount } = useBasketStore();
  const itemCount = getItemCount(food?._id);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleAddItem = () => {
    addItem(food);
    const now = new Date();
    const formattedDateTime = `${now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })} at ${now.toLocaleTimeString()}`;

    toast("Your order has been Added", {
      description: formattedDateTime,
    });
  };

  const handleRemoveItem = () => {
    removeItem(food._id);
    const now = new Date();
    const formattedDateTime = `${now.toLocaleDateString(undefined, {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    })} at ${now.toLocaleTimeString()}`;

    toast("Your order has been Removed", {
      description: formattedDateTime,
    });
  };

  return (
    <div className="flex items-center justify-start -space-x-2 w-full">
      <button
        onClick={handleRemoveItem}
        className={`mt-4 button-hover-effect w-full rounded-l-xl ${
          food.stockQuantity > 0 ? "" : "cursor-not-allowed"
        }`}
        disabled={food.stockQuantity === 0}
      >
        <span className={`${cinzel.className} relative left-[40%]`}>
          <FaMinus size={20} />
        </span>
      </button>

      <button
        className={`mt-4 border-4 border-[#8f613c] w-full ${
          food.stockQuantity > 0 ? "" : "cursor-not-allowed"
        }`}
        disabled={food.stockQuantity === 0}
      >
        <span className={`${cinzel.className} text-lg text-[#8f613c]`}>
          {itemCount}
        </span>
      </button>

      <button
        onClick={handleAddItem}
        className={`mt-4 button-hover-effect rounded-r-xl w-full ${
          food.stockQuantity > 0 ? "" : "cursor-not-allowed"
        }`}
        disabled={disabled}
      >
        <span className={`${cinzel.className} relative left-[40%]`}>
          <FaPlus size={20} />
        </span>
      </button>
    </div>
  );
};

export default AddToBasketButton;
