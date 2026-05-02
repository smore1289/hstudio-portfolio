import {defineType, defineField} from 'sanity'
import {LinkIcon} from '@sanity/icons'

export const cta = defineType({
  name: 'cta',
  title: 'Call to Action',
  type: 'object',
  icon: LinkIcon,
  fields: [
    defineField({
      name: 'label',
      type: 'string',
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'A URL, mailto: address, or page anchor (e.g. #contact).',
      validation: (rule) => rule.required(),
    }),
  ],
})
