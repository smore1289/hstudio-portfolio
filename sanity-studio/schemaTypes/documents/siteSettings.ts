import {defineType, defineField, defineArrayMember} from 'sanity'
import {CogIcon} from '@sanity/icons'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: CogIcon,
  groups: [
    {name: 'general', title: 'General'},
    {name: 'navigation', title: 'Navigation'},
    {name: 'footer', title: 'Footer'},
  ],
  fields: [
    defineField({
      name: 'siteTitle',
      type: 'string',
      group: 'general',
      description: 'Logo / brand text shown in the nav and footer.',
      validation: (rule) => rule.required(),
      initialValue: 'H.Studio',
    }),
    defineField({
      name: 'tagline',
      type: 'string',
      group: 'general',
      description: 'Short description used near the contact CTA.',
      initialValue: 'H.Studio is a full-service creative studio creating beautiful digital experience',
    }),
    defineField({
      name: 'navLinks',
      title: 'Primary nav links',
      type: 'array',
      group: 'navigation',
      of: [defineArrayMember({type: 'navLink'})],
      validation: (rule) => rule.max(8),
    }),
    defineField({
      name: 'primaryCta',
      title: 'Primary CTA',
      type: 'cta',
      group: 'navigation',
      description: 'The "Let’s talk" button reused throughout the site.',
    }),
    defineField({
      name: 'footerHeadline',
      type: 'string',
      group: 'footer',
      initialValue: 'Have a project in mind?',
    }),
    defineField({
      name: 'footerColumns',
      title: 'Footer link columns',
      type: 'array',
      group: 'footer',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'footerColumn',
          fields: [
            defineField({name: 'links', type: 'array', of: [defineArrayMember({type: 'navLink'})]}),
          ],
          preview: {
            select: {label0: 'links.0.label', label1: 'links.1.label'},
            prepare: ({label0, label1}) => ({
              title: [label0, label1].filter(Boolean).join(' · ') || 'Empty column',
            }),
          },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: 'legalLinks',
      title: 'Legal links',
      type: 'array',
      group: 'footer',
      of: [defineArrayMember({type: 'navLink'})],
    }),
    defineField({
      name: 'codedByLabel',
      title: '"Coded by" vertical label',
      type: 'string',
      group: 'footer',
      initialValue: '[ Coded By Claude ]',
    }),
  ],
  preview: {
    prepare: () => ({title: 'Site Settings'}),
  },
})
