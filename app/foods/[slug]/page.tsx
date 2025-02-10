import AddToBasketButton from "@/components/AddToBasketButton";
import { getFoodBySlug } from "@/sanity/lib/fetchquires/getFoodBySlug";
import { Chakra_Petch, Satisfy } from "next/font/google";
import Image from "next/image";

interface Review {
  reviewerName: string;
  reviewText: string;
  rating: number;
}

const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

async function FoodPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const foods = await getFoodBySlug(slug);

  if (!foods) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold">Food not found</h1>
      </div>
    );
  }

  const isOutOfStock = !foods.availability; 

  return (
    <div className="container mx-auto px-4 py-8 pl-10 md:pl-20 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div
          className={`relative h-full w-full overflow-hidden ${
            isOutOfStock ? "opacity-50" : "opacity-100"
          }`}
        >
          {foods.image?.asset?.url ? (
            <Image
              src={foods.image.asset.url}
              alt={foods.name || "Product Image"}
              width={1000}
              height={1000}
              className="object-cover transition-transform duration-300 hover:scale-105"
            />
          ) : (
            <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
              <span>No Image Available</span>
            </div>
          )}

          {isOutOfStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-bold text-lg">Out of stock</span>
            </div>
          )}
        </div>

        <div
          key={foods._id}
          className={`w-full rounded-lg shadow-lg h-full bg-white transform transition duration-300 ${
            isOutOfStock ? "opacity-50" : "hover:shadow-2xl"
          }`}
        >
          {foods.tags && (
            <div className="bg-[#7e502b] absolute top-2 right-2 text-white px-2 py-1 rounded-full text-xs">
              <span className={`${chakra_petch.className}`}>{foods.tags}</span>
            </div>
          )}

          {foods.discount > 0 && (
            <div className="absolute top-2 -left-1 rounded-r-full bg-red-600 z-10 w-max px-3 py-1 text-xs">
              <span className="font-medium text-xs text-white pr-1">
                {foods.discount}% off
              </span>
            </div>
          )}

          <div className="p-4 mt-8">
            <h2 className={`text-4xl font-extrabold ${satisfy.className}`}>
              {foods.name}
            </h2>

            <p className={`text-gray-600 text-lg mt-1 line-clamp-3 ${satisfy.className}`}>
              {foods.description}
            </p>
            <div className="flex items-end justify-between mt-5">
              <span className={`flex items-center font-extrabold text-2xl ${satisfy.className}`}>
                Rs {foods.price}
                {foods.fakePrice && (
                  <span className="ml-2 line-through text-base opacity-50">
                    Rs {foods.fakePrice}
                  </span>
                )}
              </span>

              <div className="flex flex-col gap-1 items-end">
                <div>
                  <span
                    className={`font-medium text-lg ${
                      isOutOfStock
                        ? "text-red-800"
                        : "text-green-600 px-3 py-1 rounded-full shadow"
                    } ${chakra_petch.className}`}
                  >
                    {isOutOfStock ? "Out of Stock" : "In Stock"}
                  </span>
                </div>

                <div>
                  {foods.rating &&
                    Array.isArray(foods.rating) &&
                    foods.rating.map((review: Review, index: number) => (
                      <span
                        key={index}
                        className={`text-2xl font-bold ${chakra_petch.className}`}
                      >
                        {review.rating}
                      </span>
                    ))}
                  <span className={`opacity-70 text-md ${chakra_petch.className}`}>/5</span> ⭐
                </div>
              </div>
            </div>

            <div className="mt-4">
              <AddToBasketButton food={foods} disabled={isOutOfStock} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FoodPage;