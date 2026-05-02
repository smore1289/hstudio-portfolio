import {defineType, defineField} from 'sanity'
import {CommentIcon} from '@sanity/icons'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: CommentIcon,
  fields: [
    defineField({
      name: 'quote',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: 'authorName',
      title: 'Author',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authorRole',
      title: 'Author role',
      type: 'string',
    }),
    defineField({
      name: 'rating',
      type: 'number',
      validation: (rule) => rule.min(0).max(5).integer(),
      initialValue: 5,
    }),
  ],
  preview: {
    select: {title: 'authorName', subtitle: 'quote'},
  },
})
