import {defineType, defineField, defineArrayMember} from 'sanity'
import {HomeIcon} from '@sanity/icons'

export const homePage = defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  icon: HomeIcon,
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'statement', title: 'Statement'},
    {name: 'about', title: 'About'},
    {name: 'banner', title: 'Banner'},
    {name: 'services', title: 'Services'},
    {name: 'work', title: 'Work'},
    {name: 'testimonials', title: 'Testimonials'},
    {name: 'news', title: 'News'},
  ],
  fields: [
    defineField({
      name: 'heroEyebrow',
      title: 'Hero eyebrow',
      type: 'string',
      group: 'hero',
      initialValue: '[ Hello i’m ]',
    }),
    defineField({
      name: 'heroTitle',
      type: 'string',
      group: 'hero',
      validation: (rule) => rule.required(),
      initialValue: 'Harvey Specter',
    }),
    defineField({
      name: 'heroImage',
      type: 'image',
      group: 'hero',
      options: {hotspot: true},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroIntro',
      title: 'Hero intro paragraph',
      type: 'text',
      rows: 3,
      group: 'hero',
    }),

    defineField({
      name: 'statementEyebrow',
      type: 'string',
      group: 'statement',
      initialValue: '[ 8+ years in industry ]',
    }),
    defineField({
      name: 'statementLines',
      title: 'Statement lines',
      type: 'array',
      group: 'statement',
      description: 'Each line of the big "A creative director / Photographer …" block.',
      of: [defineArrayMember({type: 'string'})],
      validation: (rule) => rule.min(1),
      initialValue: [
        'A creative director   /',
        'Photographer',
        'Born & raised',
        'on the south side',
        'of chicago.',
      ],
    }),
    defineField({
      name: 'statementEndTag',
      title: 'Statement end tag',
      type: 'string',
      group: 'statement',
      initialValue: '[ creative freelancer ]',
    }),

    defineField({
      name: 'aboutEyebrow',
      type: 'string',
      group: 'about',
      initialValue: '[ About ]',
    }),
    defineField({
      name: 'aboutCtaText',
      title: 'About CTA paragraph',
      type: 'text',
      rows: 3,
      group: 'about',
    }),
    defineField({
      name: 'aboutBody',
      title: 'About body',
      type: 'array',
      group: 'about',
      of: [defineArrayMember({type: 'block'})],
    }),
    defineField({
      name: 'aboutImage',
      type: 'image',
      group: 'about',
      options: {hotspot: true},
    }),

    defineField({
      name: 'bannerImage',
      type: 'image',
      group: 'banner',
      options: {hotspot: true},
    }),

    defineField({
      name: 'servicesEyebrow',
      type: 'string',
      group: 'services',
      initialValue: '[ services ]',
    }),
    defineField({
      name: 'servicesHeading',
      type: 'string',
      group: 'services',
      initialValue: 'Deliverables',
    }),
    defineField({
      name: 'services',
      title: 'Services list',
      type: 'array',
      group: 'services',
      of: [defineArrayMember({type: 'reference', to: [{type: 'service'}]})],
      validation: (rule) => rule.unique(),
    }),

    defineField({
      name: 'workHeading',
      title: 'Work heading',
      type: 'string',
      group: 'work',
      initialValue: 'Selected Work',
    }),
    defineField({
      name: 'workEyebrow',
      type: 'string',
      group: 'work',
      initialValue: '[ portfolio ]',
    }),
    defineField({
      name: 'workCtaText',
      title: 'Work CTA paragraph',
      type: 'text',
      rows: 3,
      group: 'work',
    }),
    defineField({
      name: 'projects',
      title: 'Featured projects',
      type: 'array',
      group: 'work',
      of: [defineArrayMember({type: 'reference', to: [{type: 'project'}]})],
      validation: (rule) => rule.unique().max(8),
    }),

    defineField({
      name: 'testimonialsHeading',
      type: 'string',
      group: 'testimonials',
      initialValue: 'Testimonials',
    }),
    defineField({
      name: 'testimonials',
      type: 'array',
      group: 'testimonials',
      of: [defineArrayMember({type: 'reference', to: [{type: 'testimonial'}]})],
      validation: (rule) => rule.unique(),
    }),

    defineField({
      name: 'newsHeading',
      type: 'string',
      group: 'news',
      initialValue: 'Keep up with my latest news & achievements',
    }),
    defineField({
      name: 'newsItems',
      type: 'array',
      group: 'news',
      of: [defineArrayMember({type: 'reference', to: [{type: 'newsItem'}]})],
      validation: (rule) => rule.unique().max(6),
    }),
  ],
  preview: {
    prepare: () => ({title: 'Home Page'}),
  },
})
