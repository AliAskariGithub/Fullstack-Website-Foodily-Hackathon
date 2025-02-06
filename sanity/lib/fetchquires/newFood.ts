import { NextRequest, NextResponse } from "next/server"; 
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2021-03-25",
  token: process.env.SANITY_API_TOKEN, // Fixed incorrect environment variable
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      name,
      slug,
      price,
      fakePrice,
      image,
      description,
      category,
      chef,
      tags,
      discount,
      stockQuantity,
      availability,
    } = body;

    if (
      [name, slug, price, fakePrice, image, description, category, chef, tags, discount, stockQuantity, availability].some(
        (field) => field === undefined || field === null
      )
    ) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const newFood = await sanityClient.create({
      _type: "food",
      name,
      slug: { _type: "slug", current: slug }, 
      price,
      fakePrice,
      image: { _type: "image", asset: { _ref: image } },
      description,
      category: { _type: "reference", _ref: category },
      chef: { _type: "reference", _ref: chef },
      tags,
      discount,
      stockQuantity,
      availability,
    });

    return NextResponse.json({ success: true, newFood }, { status: 201 });
  } catch (error) {
    console.error("Error creating newFood:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
