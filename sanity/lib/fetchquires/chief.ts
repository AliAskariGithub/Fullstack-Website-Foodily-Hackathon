import { client } from "../client";

export const fetchChiefs = async () => {
  const query = `*[_type == "chiefs"]{
    _id,
    name,
    bio,
    image {
      asset -> {
        _id,
        url
      },
      hotspot
    },
    experience,
    country,
    rating
  }`;

  const chiefs = await client.fetch(query);
  return chiefs;
};
