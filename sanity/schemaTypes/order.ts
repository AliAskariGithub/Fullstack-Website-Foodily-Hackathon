import { defineField, defineType } from "sanity";

export default defineType({
  name: "order",
  title: "Order",
  type: "document",
  fields: [
    defineField({
      name: "orderId",
      title: "Order ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerName",
      title: "Customer Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "customerEmail",
      title: "Customer Email",
      type: "string",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "phone",
      title: "Phone Number",
      type: "string",
      validation: (Rule) =>
        Rule.required().regex(/^[0-9]+$/, {
          name: "phone",
          invert: false,
        }),
    }),
    defineField({
      name: "address",
      title: "Delivery Address",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "items",
      title: "Ordered Items",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ 
              name: "image", 
              type: "image", 
              title: "Food Image", 
              options: { 
                hotspot: true 
              } 
            }),
            defineField({ name: "food", type: "string", title: "Food Item" }),
            defineField({ name: "quantity", type: "number", title: "Quantity", validation: (Rule) => Rule.min(1) }),
            defineField({ name: "price", type: "number", title: "Price" }),
          ],
        },
      ],
    }),    
    defineField({
      name: "totalPrice",
      title: "Total Price",
      type: "number",
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: "status",
      title: "Order Status",
      type: "string",
      options: {
        list: [
          { title: "Pending", value: "pending" },
          { title: "Processing", value: "processing" },
          { title: "Shipped", value: "shipped" },
          { title: "Delivered", value: "delivered" },
        ],
      },
      initialValue: "pending",
    }),
    defineField({
      name: "createdAt",
      title: "Order Date",
      type: "datetime",
      initialValue: new Date().toISOString(),
    }),
    defineField({
      name: "processingTime",
      title: "Processing Time",
      type: "number",
    }),
  ],
});
