import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'feedback',
  title: 'Feedback',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'url',
    }),
    defineField({
      name: 'feedback',
      title: 'Feedback',
      type: 'text',
    }),
    defineField({
      name: 'stars',
      title: 'Stars',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5),
    }),
  ],
});
