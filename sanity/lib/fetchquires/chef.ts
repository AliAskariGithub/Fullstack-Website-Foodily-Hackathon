import { createClient } from "next-sanity";
import { client as sanityClient } from "@/sanity/lib/client";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-01-01",
  useCdn: false,
});

export async function getChef() {
  return sanityClient.fetch( 
    `*[_type == "chef"]{
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
  }`
);
}
