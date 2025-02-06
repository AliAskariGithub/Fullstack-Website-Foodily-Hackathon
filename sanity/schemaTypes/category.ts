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
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'text',
      title: 'Category Description',
      validation: (Rule) => Rule.max(300).warning('Description should not exceed 300 characters.'),
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
      name: 'mealType',
      type: 'string',
      title: 'Meal Type',
      description: 'Indicates the type of meal this category represents',
      options: {
        list: [
          { title: 'Breakfast', value: 'breakfast' },
          { title: 'Lunch', value: 'lunch' },
          { title: 'Dinner', value: 'dinner' },
          { title: 'Snacks', value: 'snacks' },
          { title: 'Desserts', value: 'desserts' },
          { title: 'Drinks', value: 'drinks' },
          { title: 'Other', value: 'other' },
        ],
      }
    }),
    defineField({
      name: 'available',
      type: 'boolean',
      title: 'Category Availability',
      description: 'Indicates whether this category of food is available for ordering',
    }),
    defineField({
      name: 'promotions',
      type: 'array',
      title: 'Category Promotions',
      description: 'Special promotions or discounts for this category (e.g., “20% off on all Main Courses!”)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'promotionTitle', type: 'string', title: 'Promotion Title' },
            { name: 'promotionDetails', type: 'text', title: 'Promotion Details' },
            { name: 'discountPercentage', type: 'number', title: 'Discount Percentage', validation: (Rule) => Rule.min(0).max(100) },
            { name: 'validUntil', type: 'datetime', title: 'Valid Until' },
          ],
        },
      ],
    }),
    defineField({
      name: 'specialOffers',
      type: 'array',
      title: 'Special Offers',
      description: 'Special offers available for this category (e.g., “Buy One Get One Free”)',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'offerTitle', type: 'string', title: 'Offer Title' },
            { name: 'offerDescription', type: 'text', title: 'Offer Description' },
            { name: 'offerValidity', type: 'datetime', title: 'Offer Validity' },
          ],
        },
      ],
    }),
  ],
});
