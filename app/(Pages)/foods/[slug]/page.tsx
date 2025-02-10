import AddToBasketButton from "@/components/AddToBasketButton";
import { getFoodBySlug } from "@/sanity/lib/fetchquires/getFoodBySlug";
import { Chakra_Petch, Satisfy } from "next/font/google";
import Image from "next/image";
import { IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineFastfood } from "react-icons/md";

interface Review {
  reviewerName: string;
  reviewText: string;
  rating: number;
}

const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

async function FoodPage({ params }: { params: Promise<{ slug: string }> }) {
  const resovledParams = await params;
  const { slug } = resovledParams;
  const foods = await getFoodBySlug(slug);

  if (!foods) {
    return (
      <div className="flex flex-col items-center justify-center h-[40vh] col-span-full text-gray-500">
        <div className="flex items-center justify-center -space-x-6">
          <IoFastFoodOutline
            size={70}
            color="8f613c"
            className="-rotate-45 mt-8"
          />
          <Image
            src="/no-food-found.png"
            alt="No food found"
            width={500}
            height={500}
            className="w-40 h-40 rounded-full border-4 bg-darkpeach relative z-10 border-[#8f613c]"
          />
          <MdOutlineFastfood
            size={70}
            color="8f613c"
            className="rotate-45 mt-8"
          />
        </div>
        <p className={`text-2xl ${chakra_petch.className} text-black/80`}>.</p>
        <p className={`text-sm ${chakra_petch.className} text-black/80`}>
          Try searching with a different keyword.
        </p>
      </div>
    );
  }

  const isOutOfStock = !foods.availability;

  return (
    <div className="container mx-auto px-4 py-8 pl-6 md:pl-20 mt-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex justify-center items-center h-full bg-white">
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
                className="object-cover h-full transition-transform duration-300 hover:scale-105"
              />
            ) : (
              <div className="flex items-center justify-center h-full bg-gray-200 text-gray-500">
                <span>No Image Available</span>
              </div>
            )}

            {isOutOfStock && (
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-bold text-lg">
                  Out of stock
                </span>
              </div>
            )}
          </div>
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

            <p
              className={`text-gray-600 text-lg mt-1 line-clamp-3 ${satisfy.className}`}
            >
              {foods.description}
            </p>

            <div className="mt-12">
              <h2
                className={`${chakra_petch.className} text-xl text-right font-bold mb-4`}
              >
                Meet the Chef
              </h2>
              {foods.chef ? (
                <div className="flex items-center space-x-2">
                  <div>
                    <p
                      className={`text-xl font-extrabold ${satisfy.className}`}
                    >
                      {foods.chef.name}
                    </p>
                    <p
                      className={`text-gray-600 text-sm mt-1 ${satisfy.className}`}
                    >
                      {foods.chef.bio}
                    </p>
                  </div>
                  {foods.chef && (
                    <Image
                      src={foods.chef.image?.asset?.url || "placeholder.jpg"}
                      alt={foods.chef.name}
                      width={500}
                      height={500}
                      className="w-20 h-20 rounded-full border-4 border-[#8f613c]"
                    />
                  )}
                </div>
              ) : (
                <p className="text-gray-600">No chef details available.</p>
              )}
            </div>

            <div className="flex items-end justify-between mt-5">
              <span
                className={`flex items-center font-extrabold text-2xl ${satisfy.className}`}
              >
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
                  <span
                    className={`opacity-70 text-md ${chakra_petch.className}`}
                  >
                    /5
                  </span>{" "}
                  ⭐
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
