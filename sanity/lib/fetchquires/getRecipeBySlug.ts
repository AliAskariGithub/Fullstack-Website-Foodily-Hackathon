import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";
import { Recipe } from "@/sanity/Types/schemasTypes";


const RECIPE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "recipe" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    about,
    image {
      asset -> {
        _id,
        url
      },
      hotspot
    },
    chef -> {
      name,
      bio
    },
    category -> {
      name,
      slug
    },
    ingredients[] {
      step,
      items[] {
        name,
        quantity
      }
    },
    instructions
  }
`);

export const getRecipeBySlug = async (slug: string): Promise<Recipe | null> => {
  try {
    const response = await sanityFetch({
      query: RECIPE_BY_SLUG_QUERY,
      params: { slug },
    });

    return response.data ?? null;
  } catch (error) {
    console.error("❌ Error fetching recipe by slug:", error);
    return null;
  }
};
