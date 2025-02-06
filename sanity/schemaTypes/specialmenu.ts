import { defineField, defineType } from "sanity";
import { FaBowlFood } from "react-icons/fa6";

export const SpecialMenu = defineType({
  name: 'specialmenu',
  title: 'Special Menu',
  type: 'document',
  icon: FaBowlFood,
  fields: [
    defineField({
      name: 'food',
      title: 'Food Name',
      type: 'string',
      validation: (Rule) => Rule.required().min(3).max(50),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'food',
        maxLength: 200, 
      },
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required().positive().precision(2),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      validation: (Rule) => Rule.max(500),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ratings',
      type: 'string',
      options: {
        list: [
          { title: 'Five Star', value: 'five-star' },
          { title: 'Four Star', value: 'four-star' },
          { title: 'Three Star', value: 'three-star' },
          { title: 'Two Star', value: 'two-star' },
          { title: 'One Star', value: 'one-star' },
        ],
      },
    }),
    defineField({
      name: 'chief',
      type: 'reference',
      to: [{ type: 'chiefs' }], 
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'inStock',
      type: 'boolean',
      description: 'Toggle to mark whether the food is in stock or not.',
    }),
  ],
});