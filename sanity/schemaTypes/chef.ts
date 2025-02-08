import { defineField, defineType } from "sanity";
import { GiCook } from "react-icons/gi";

export const Chef = defineType({
    name: 'chef',
    title: 'Chef',
    type: 'document',
    icon: GiCook,
    fields: [
        defineField({
        name: 'name',
        title: 'Name',
        type: 'string',
        validation: (Rule) => Rule.required(),
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
        options: {
          list: [
            { title: 'Pakistan', value: 'Pakistan' },
            { title: 'India', value: 'India' },
            { title: 'Afghanistan', value: 'Afghanistan' },
            { title: 'Turkey', value: 'Turkey' },
            { title: 'Other', value: 'Other' },
          ]
        },
        validation: (Rule) => Rule.required(),
      }),
      defineField({
        name: 'rating',
        title: 'Rating',
        type: 'string',      
        options: {
          list: [
            { title: '⭐⭐⭐⭐⭐', value: '⭐⭐⭐⭐⭐' },
            { title: '⭐⭐⭐⭐', value: '⭐⭐⭐⭐' },
            { title: '⭐⭐⭐', value: '⭐⭐⭐' },
            { title:'⭐⭐', value: '⭐⭐' },
            { title:'⭐', value: '⭐' },
          ]
        },
        validation: (Rule) => Rule.required(),
      }),
    ],
});
  