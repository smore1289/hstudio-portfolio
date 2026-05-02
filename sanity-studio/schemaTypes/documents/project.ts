import {defineType, defineField, defineArrayMember} from 'sanity'
import {ImagesIcon} from '@sanity/icons'

export const project = defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  icon: ImagesIcon,
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required().max(80),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'name'},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      description: 'Pill labels shown on the cover, e.g. "Social Media", "Photography".',
      of: [defineArrayMember({type: 'string'})],
      options: {layout: 'tags'},
    }),
    defineField({
      name: 'cover',
      type: 'image',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'externalUrl',
      title: 'External URL',
      type: 'url',
    }),
    defineField({
      name: 'summary',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {title: 'name', media: 'cover', tags: 'tags'},
    prepare: ({title, media, tags}) => ({
      title,
      subtitle: Array.isArray(tags) ? tags.join(' · ') : undefined,
      media,
    }),
  },
})
