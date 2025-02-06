import { client } from "../client";

export const fetchCategories = async () => {
  const query = `*[_type == "category" && available == true]{
    _id,
    name,
    slug,
    description,
    image {
      asset -> {
        _id,
        url
      },
      hotspot
    },
    mealType,
    promotions {
      promotionTitle,
      promotionDetails,
      discountPercentage,
      validUntil
    },
    specialOffers {
      offerTitle,
      offerDescription,
      offerValidity
    }
  }`;

  const categories = await client.fetch(query);
  return categories;
};
