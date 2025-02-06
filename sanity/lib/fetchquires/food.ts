import { client } from "../client";

export const fetchFoods = async () => {
  const query = `*[_type == "food"]{
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
    category -> {
      name,
      slug
    },
    chiefs -> {
      name,
      bio
    },
    tags,
    rating,
    discount,
    stockQuantity,
    availability
  }`;

  const foods = await client.fetch(query);
  return foods;
};
