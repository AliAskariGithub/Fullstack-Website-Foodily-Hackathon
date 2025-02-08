import { defineField, defineType } from 'sanity';
import { BiSolidCategoryAlt } from "react-icons/bi";

export const Category = defineType({
  name: 'category',
  type: 'document',
  icon: BiSolidCategoryAlt,
  title: 'Food Category',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      title: 'Category Name',
      validation: (Rule) => Rule.required().max(100).warning('Category name should not exceed 100 characters.'),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Category Description',
      validation: (Rule) => Rule.max(500).warning('Description should not exceed 500 characters.'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Category Image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'eatType',
      title: 'Eat Type',
      type: 'string',
      options: {
        list: [
          { title: 'Solid', value: 'solid' },
          { title: 'Liquid', value: 'liquid' },
        ]
      }
    }),
    defineField({
      name: 'mealType',
      type: 'string',
      title: 'Meal Type',
      description: 'Indicates the type of meal this category represents',
      options: {
        list: [
          { title: 'Breakfast', value: 'breakfast' },
          { title: 'Lunch', value: 'lunch' },
          { title: 'Dinner', value: 'dinner' },
          { title: 'Desserts', value: 'desserts' },
          { title: 'Drinks', value: 'drinks' },
          { title: 'Available anytime', value: 'available-anytime' },
        ],
      }
    }),
  ],
});
