import { defineField, defineType } from 'sanity';
import { FaBook } from "react-icons/fa";

export const Recipe = defineType({
  name: 'recipe',
  type: 'document',
  title: 'Recipe',
  icon: FaBook,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Recipe Title',
      validation: (Rule) => Rule.required().max(50),
    }),
    defineField({
      name: 'ingredients',
      type: 'array',
      title: 'Ingredients',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'instructions',
      type: 'text',
      title: 'Cooking Instructions',
      validation: (Rule) => Rule.max(500).warning('Description should not exceed 500 characters.'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Recipe Image',
      validation: (Rule) => Rule.required(),
      options: {
        hotspot: true,
      },
    }),
  ],
});
