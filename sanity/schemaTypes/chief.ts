import { defineField, defineType } from "sanity";
import { GiCook } from "react-icons/gi";

export const Chief = defineType({
    name: 'chiefs',
    title: 'Chiefs',
    type: 'document',
    icon: GiCook,
    fields: [
        defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required().min(3),
      }),
      defineField({
        name: 'bio',
        title: 'Bio',
        type: 'text',
        validation: (Rule) => Rule.max(200),
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
        name: 'experience',
        title: 'Experience',
        type: 'number',
        validation: (Rule) => Rule.required().min(1),
      }),
      defineField({
        name: 'country',
        title: 'Country',
        type: "string",
        validation: (Rule) => Rule.required(),
        options: {
          list: [
            { title: 'Pakistan', value: 'Pakistan' },
            { title: 'India', value: 'India' },
            { title: 'Nepal', value: 'Nepal' },
            { title: 'United States', value: 'United States' },
            { title: 'United Kingdom', value: 'United Kingdom' },
            { title: 'Other', value: 'Other' },
          ]
        }
      }),
      defineField({
        name: 'rating',
        title: 'Rating',
        type: 'string',
        validation: (Rule) => Rule.required(),
        options: {
          list: [
            { title: 'Five Star', value: 'five-star' },
            { title: 'Four Star', value: 'four-star' },
            { title: 'Three Star', value: 'three-star' },
            { title: 'Two Star', value: 'two-star' },
            { title: 'One Star', value: 'one-star' },
          ]
        }
      }),
    ],
});
  