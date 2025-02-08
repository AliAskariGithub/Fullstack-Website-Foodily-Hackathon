import Image from "next/image";
import Link from "next/link";
import { Caveat, Chakra_Petch, Cinzel, Satisfy } from "next/font/google";
import { Recipe } from "@/sanity/Types/schemasTypes";

const satisfy = Satisfy({ weight: "400", subsets: ["latin"] });
const chakra_petch = Chakra_Petch({ weight: "700", subsets: ["latin"] });
const cinzel = Cinzel({ weight: "800", subsets: ["latin"] });
const caveat = Caveat({ weight: "600", subsets: ["latin"] });

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link href={`/recipes/${recipe.slug?.current || "#"}`} className="block">
      <div className="bg-white shadow-lg relative left-4 md:left-10 rounded-xl overflow-hidden transition hover:scale-105">
        <Image
          src={recipe.image?.asset?.url || "/placeholder.jpg"}
          alt={recipe.title || "Recipe Image"}
          width={1000}
          height={1000}
          className="w-full h-60 object-contain bg-black"
        />
        <div className="p-4">
          <h3
            className={`text-2xl font-bold mb-2 text-[#8f613c] ${chakra_petch.className}`}
          >
            {recipe.title ?? "Untitled Recipe"}
          </h3>
          <p
            className={`text-sm text-black/90 line-clamp-2 ${satisfy.className}`}
          >
            {recipe.about ?? "No description available."}
          </p>
          <div className="mt-2 text-xs text-black/90">
            <p
              className={`text-lg font-bold text-[#7c4c25] ${cinzel.className}`}
            >
              Chef:{" "}
              <span className={`text-base text-black/90 ${caveat.className}`}>
                {recipe.chef?.name ?? "Unknown Chef"}
              </span>
            </p>
            <p
              className={`text-lg font-bold text-[#7c4c25] ${cinzel.className}`}
            >
              Category:{" "}
              <span className={`text-base text-black/90 ${caveat.className}`}>
                {recipe.category.name}
              </span>
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}