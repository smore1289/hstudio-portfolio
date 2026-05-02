import {defineType, defineField} from 'sanity'
import {RocketIcon} from '@sanity/icons'

export const service = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: RocketIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required().max(60),
    }),
    defineField({
      name: 'description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'order',
      type: 'number',
      description: 'Optional sort order in the list.',
    }),
  ],
  preview: {
    select: {title: 'name', media: 'image', subtitle: 'description'},
  },
  orderings: [
    {
      title: 'Manual order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
})
