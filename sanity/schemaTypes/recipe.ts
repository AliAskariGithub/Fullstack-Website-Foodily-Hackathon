import { defineField, defineType } from "sanity";
import { FaBook } from "react-icons/fa";

export default defineType({
  name: "recipe",
  type: "document",
  title: "Recipe",
  icon: FaBook,
  fields: [
    defineField({
      name: "title",
      type: "string",
      title: "Recipe Title",
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "about",
      type: "string",
      title: "About Recipe",
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: "image",
      type: "image",
      title: "Recipe Image",
      validation: (Rule) => Rule.required(),
      options: { hotspot: true },
    }),
    defineField({
      name: "chef",
      type: "reference",
      to: [{ type: "chef" }],
      title: "Chef",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "category",
      type: "reference",
      to: [{ type: "category" }],
      title: "Category",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ingredients",
      title: "Ingredients",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            { name: "name", type: "string", title: "Ingredient Name" },
            { name: "quantity", type: "string", title: "Quantity" },
          ],
        },
      ],
    }),
    defineField({
      name: "instructions",
      type: "array",
      title: "Cooking Instructions",
      of: [{ type: "block" }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "category.title",
      media: "image",
    },
  },
});
