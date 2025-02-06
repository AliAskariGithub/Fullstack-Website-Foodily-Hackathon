import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@sanity/client";

const sanityClient = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false,
  apiVersion: "2021-03-25",
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN,
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {orderId, customerName, customerEmail, phone, address, items, totalPrice } = body;

    if (!orderId || !customerName || !customerEmail || !phone || !address || !items || !totalPrice) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const order = await sanityClient.create({
      _type: "order",
      orderId,
      customerName,
      customerEmail,
      phone,
      address,
      items,
      totalPrice,
      status: "pending",
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, order }, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
