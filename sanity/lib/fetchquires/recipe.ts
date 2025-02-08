import { createClient } from "next-sanity";
import { client as sanityClient } from "@/sanity/lib/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-01-01",
  useCdn: false,
});

export async function getRecipes() {
  return sanityClient.fetch(
    `*[_type == "recipe"]{
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
      "chef": chef->{
        _id,
    name,
    bio,
    image {
      asset -> {
        _id,
      url,
      },
    },
    experience,
    country,
    rating
      },
      "category": category->{
        name,
        description,
        image {
          asset -> {
            _id,
            url
          },
          hotspot
        },
        eatType,
        mealType
      }
    }`
  );
}

export async function getRecipeBySlug(slug: string) {
  const query = `*[_type == "recipe" && slug.current == $slug][0]{
    title,
    "slug": slug.current,
    about,
    image {
      asset -> {
        _id,
        url
      },
      hotspot
    },
    "chef": chef->{
      _id,
    name,
    bio,
    image {
      asset -> {
        _id,
      url,
      },
    },
    experience,
    country,
    rating
    },
    "category": category->{
      name,
      description,
      image {
        asset -> {
          _id,
          url
        },
        hotspot
      },
      eatType,
      mealType
    },
    ingredients[] {
      name,
      quantity
    },
    instructions
  }`;

  return await sanityClient.fetch(query, { slug });
}
