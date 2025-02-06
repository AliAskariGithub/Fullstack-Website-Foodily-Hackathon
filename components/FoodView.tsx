import { Food } from "@/sanity/Types/schemasTypes";
import React from "react";
import FoodGrid from "./FoodsGrid";

interface FoodViewProps {
  foods: Food[];
}

const FoodView = ({ foods }: FoodViewProps) => {
  return (
    <div className="flex flex-col">

      <div className="flex-1">
        <FoodGrid foods={foods} />
      </div>
    </div>
  );
};

export default FoodView;
