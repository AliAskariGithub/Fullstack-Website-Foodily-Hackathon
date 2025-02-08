import { defineField, defineType } from "sanity";
import { PiBowlFoodFill } from "react-icons/pi";

export default defineType({
  name: 'food',
  title: 'Food',
  type: 'document',
  icon: PiBowlFoodFill,
  fields: [
    defineField({
      name: 'name',
      title: 'Food Name',
      type: 'string',
      validation: (Rule) => Rule.required().max(100).warning('Food name should not exceed 100 characters.'),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.min(49).warning('Price should be a positive number.'),
    }),
    defineField({
      name: 'fakePrice',
      title: 'Fake Price',
      type: 'number',
      validation: (Rule) => Rule.min(0).warning('Price should be a more than price number.'),
    }),
    defineField({
      name: 'image',
      title: 'Food Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.min(200).max(500).warning('Description should not exceed 500 characters or be less than 200 characters.'),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
      validation: (Rule) => Rule.required(),
    }),  
    defineField({
      name: 'chef',
      title: 'Chef',
      type: 'reference',
      to: [{ type: 'chef' }],
      description: 'The chief responsible for creating this food item',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'string',
      options: {
        list: [
          { title: 'Popular', value: 'Popular' },
          { title: 'New', value: 'New' },
          { title: 'Top Hot', value: 'Top Hot' },
          { title: 'Special', value: 'Special' },
          { title: 'Recommended', value: 'Recommended' },
          { title: 'Best Seller', value: 'Best Seller' },
        ]
      }
    }),
    defineField({
      name: 'rating',
      title: 'Ratings and Reviews',
      type: 'array',
      description: 'Customer ratings and reviews for the food item',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'reviewerName', type: 'string', title: 'Reviewer Name' }),
            defineField({ name: 'reviewText', type: 'text', title: 'Review Text' }),
            defineField({
              name: 'rating',
              type: 'number',
              title: 'Rating',
              validation: (Rule) => Rule.min(1).max(5).warning('Rating should be between 1 and 5.'),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: 'discount',
      title: 'Discount Percentage',
      type: 'number',
      description: 'Discount on the price of the food item, if applicable or otherwise you can leave it.',
    }),
    defineField({
      name: 'stockQuantity',
      title: 'Stock Quantity',
      type: 'number',
      description: 'Number of units available in stock',
      validation: (Rule) => Rule.min(0).warning('Stock quantity should be positive.'),
    }),
    defineField({
      name: 'availability',
      title: 'Available',
      type: 'boolean',
      description: 'Indicates whether the food item is currently available for order',
    }),
  ],
});
