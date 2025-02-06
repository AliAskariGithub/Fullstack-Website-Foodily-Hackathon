"use client";

import FoodThumb from "@/components/FoodThumb";
import { Food } from "@/sanity/Types/schemasTypes";

function FoodGrid({ foods }: { foods: Food[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
      {foods?.map((food) => {
        return (
          <div key={food._id}>
            <div className="flex justify-center ">
              <FoodThumb key={food._id} foods={food} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default FoodGrid;
