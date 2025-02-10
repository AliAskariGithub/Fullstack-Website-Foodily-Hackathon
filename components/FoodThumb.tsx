import { Food } from "@/sanity/Types/schemasTypes";
import Image from "next/image";
import Link from "next/link";
import { Chakra_Petch, Satisfy } from "next/font/google";

const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

function FoodThumb({ foods }: { foods: Food }) {
  const isOutOfStock = !foods.availability;
  const isFake = foods.fakePrice != null && foods.fakePrice > 0;

  return (
    <>
      <Link
        href={`${isOutOfStock ? `` : `/foods/${foods.name.toLowerCase().replace(/ /g, "-")}` }`}
        className={`group flex flex-col bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden ${
          isOutOfStock ? "opacity-50" : ""
        }`}
      >
        <div className="relative aspect-square w-full h-full overflow-hidden">
          <div className="bg-[#7e502b] absolute top-2 z-10 right-2 text-white px-2 py-1 rounded-full text-xs">
            <span className={`${chakra_petch.className}`}> {foods.tags}</span>
          </div>
          {foods.discount > 0 && (
            <div>
              <div className="absolute top-2 -left-1 rounded-r-full bg-red-600 z-10 w-max px-3 py-1 text-xs">
                <span className="font-medium text-xs text-white pr-1">
                  {foods.discount}% off
                </span>
              </div>
            </div>
          )}
          {foods && (
            <Image
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              src={foods.image.asset.url}
              alt={foods.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          )}
          {isOutOfStock && (
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <span className="text-white font-bold text-lg">Out of stock</span>
            </div>
          )}
        </div>
        <div
          key={foods._id}
          className={`max-w-sm rounded-lg shadow-lg bg-white transform transition duration-300 ${
            foods.availability ? "hover:shadow-2xl" : "opacity-50"
          }`}
        >
          <div className="p-4">
            <h2 className={`text-xl font-extrabold line-clamp-1 ${satisfy.className}`}>
              {foods.name}
            </h2>

            <p
              className={`text-gray-600 text-sm mt-1 line-clamp-2 ${satisfy.className}`}
            >
              {foods.description}
            </p>

            <div className="flex items-center justify-between mt-5">
              {isFake ? (
                <span
                  className={`flex items-center font-extrabold text-lg ${satisfy.className}`}
                >
                  Rs {foods.price}
                  <span className="pl-2 text-xs line-through opacity-50">
                    Rs {foods.fakePrice}
                  </span>
                </span>
              ) : (
                <span
                  className={`flex items-center font-extrabold text-lg ${satisfy.className}`}
                >
                  Rs {foods.price}
                </span>
              )}

              <div>
                {foods.rating &&
                  Array.isArray(foods.rating) &&
                  foods.rating.length > 0 &&
                  foods.rating.map((review, index) => (
                    <span
                      key={index}
                      className={`text-lg font-bold ${chakra_petch.className}`}
                    >
                      {review.rating}/5 ⭐
                    </span>
                  ))}
              </div>
            </div>

            <div
              className={`${
                foods.availability
                  ? "absolute bottom-40 mb-1 right-2"
                  : "cursor-not-allowed absolute top-0 left-0 w-full z-10 bg-opacity-60 backdrop-blur-sm flex justify-center items-center bg-white h-full"
              }`}
            >
              <span
                className={`font-medium text-2xl ${
                  foods.availability
                    ? "text-green-600 text-xs px-3 py-1 rounded-full shadow"
                    : "text-red-800"
                } ${chakra_petch.className}`}
              >
                {foods.availability ? "In Stock" : "Out of Stock"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
}

export default FoodThumb;