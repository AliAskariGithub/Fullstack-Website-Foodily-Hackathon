import { defineQuery } from "next-sanity";
import { sanityFetch } from "../live";

export const getFoodBySlug = async (slug: string) => {
  const FOOD_BY_ID_QUERY =
    defineQuery(`*[_type == "food" && slug.current == $slug] | order(name asc)[0] {
      _id,
      name,
      slug,
      price,
      fakePrice,
      image {
        asset -> {
          _id,
          url
        },
        hotspot
      },
      description,
      "category": category->{
        name,
        description,
        mealType
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
      },
      tags,
      rating,
      discount,
      availability
    }`);

  try {
    const food = await sanityFetch({
      query: FOOD_BY_ID_QUERY,
      params: {
        slug,
      },
    });
    return food.data || null;
  } catch (error) {
    console.error("Error fetching food by ID: ", error);
    return null;
  }
};
