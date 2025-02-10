import { getRecipeBySlug } from "@/sanity/lib/fetchquires/recipe";
import Image from "next/image";
import { PortableText } from "@portabletext/react";
import { Satisfy, Chakra_Petch } from "next/font/google";
import { BiBook } from "react-icons/bi";

const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });

interface Ingredient {
  name: string;
  quantity: string;
}

export default async function RecipeDetailsPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resovledParams = await params;
  const { slug } = resovledParams;
  const recipe = await getRecipeBySlug(slug);

  if (!recipe) {
    return (
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
    );
  }

  return (
    <div className="container mx-auto px-4 py-10 relative md:left-4">
      <div className="mx-auto p-8 rounded-2xl">
        <h1
          className={`${chakra_petch.className} text-5xl text-[#8f613c] font-bold text-center mb-6`}
        >
          {recipe.title}
        </h1>

        <p
          className={`text-[#8f613c] text-center text-2xl italic mb-10 ${satisfy.className}`}
        >
          {recipe.about}
        </p>

        <Image
          src={recipe.image?.asset?.url || "/placeholder.jpg"}
          alt={recipe.title || "Recipe Image"}
          width={1000}
          height={500}
          className="w-full h-96 object-contain bg-black rounded-xl"
        />

        <div className="mt-8 bg-[#e9b966] p-6 rounded-xl shadow-md">
          <h2
            className={`${chakra_petch.className} text-3xl text-[#8f613c] font-bold mb-4`}
          >
            Meet the Chef
          </h2>
          {recipe.chef ? (
            <div className="flex items-center space-x-6">
              {recipe.chef && (
                <Image
                  src={recipe.chef.image?.asset?.url || "placeholder.jpg"}
                  alt={recipe.chef.name}
                  width={500}
                  height={500}
                  className="w-24 h-24 rounded-full border-4 border-[#8f613c]"
                />
              )}
              <div>
                <p
                  className={`${satisfy.className} text-2xl font-semibold text-[#8f613c]`}
                >
                  {recipe.chef.name}
                </p>
                <p className={`text-black text-lg italic ${satisfy.className}`}>
                  {recipe.chef.bio}
                </p>
                <p
                  className={`text-black/80 text-xl ${chakra_petch.className}`}
                >
                  Experience:{" "}
                  <span className={`text-base`}> {recipe.chef.experience}</span>{" "}
                  years
                </p>
                <p
                  className={`text-black/80 text-xl ${chakra_petch.className}`}
                >
                  Country:{" "}
                  <span className={`text-base`}> {recipe.chef.country}</span>
                </p>
                <p
                  className={`text-black/80 text-xl ${chakra_petch.className}`}
                >
                  Rating:{" "}
                  <span className={`text-base`}> {recipe.chef.rating}</span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No chef details available.</p>
          )}
        </div>

        <div className="mt-8 bg-[#e9b966] p-6 rounded-xl shadow-md">
          <h2
            className={`${chakra_petch.className} text-3xl text-[#8f613c] font-bold mb-4`}
          >
            Food Category
          </h2>
          {recipe.category ? (
            <div className="flex items-center space-x-6">
              {recipe.chef && (
                <Image
                  src={recipe.category.image?.asset?.url || "placeholder.jpg"}
                  alt={recipe.category.name}
                  width={500}
                  height={500}
                  className="w-24 h-24 rounded-full border-4 border-[#8f613c]"
                />
              )}
              <div>
                <p
                  className={`${satisfy.className} text-2xl font-semibold text-[#8f613c]`}
                >
                  {recipe.category.name}
                </p>
                <p className={`text-black text-lg italic ${satisfy.className}`}>
                  {recipe.category.description}
                </p>
                <p
                  className={`text-black/80 text-xl ${chakra_petch.className}`}
                >
                  Meal:{" "}
                  <span className={`text-base`}>
                    {" "}
                    {recipe.category.mealType}
                  </span>
                </p>
                <p
                  className={`text-black/80 text-xl ${chakra_petch.className}`}
                >
                  Type:{" "}
                  <span className={`text-base`}>
                    {" "}
                    {recipe.category.eatType}
                  </span>
                </p>
              </div>
            </div>
          ) : (
            <p className="text-gray-600">No category details available.</p>
          )}
        </div>

        <div className="mt-6">
          <h2
            className={`${chakra_petch.className} text-2xl font-bold text-[#8f613c]`}
          >
            Ingredients
          </h2>
          <ul className="list-disc pl-5 text-lg text-gray-800">
            {recipe.ingredients.map((item: Ingredient, index: number) => (
              <li key={index}>
                {item.quantity} {item.name}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2
            className={`${chakra_petch.className} text-2xl font-bold text-[#8f613c]`}
          >
            Instructions
          </h2>
          <div className="prose text-gray-900">
            {recipe.instructions ? (
              <PortableText value={recipe.instructions} />
            ) : (
              <p>No instructions available.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
