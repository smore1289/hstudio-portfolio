import type {StructureResolver} from 'sanity/structure'
import {CogIcon, HomeIcon, RocketIcon, ImagesIcon, CommentIcon, DocumentTextIcon} from '@sanity/icons'

const SINGLETONS = ['siteSettings', 'homePage']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Site Settings')
        .icon(CogIcon)
        .child(S.editor().id('siteSettings').schemaType('siteSettings').documentId('siteSettings')),
      S.listItem()
        .title('Home Page')
        .icon(HomeIcon)
        .child(S.editor().id('homePage').schemaType('homePage').documentId('homePage')),
      S.divider(),
      S.documentTypeListItem('service').title('Services').icon(RocketIcon),
      S.documentTypeListItem('project').title('Projects').icon(ImagesIcon),
      S.documentTypeListItem('testimonial').title('Testimonials').icon(CommentIcon),
      S.documentTypeListItem('newsItem').title('News').icon(DocumentTextIcon),
      S.divider(),
      ...S.documentTypeListItems().filter(
        (li) => !['siteSettings', 'homePage', 'service', 'project', 'testimonial', 'newsItem'].includes(li.getId() ?? ''),
      ),
    ])

export {SINGLETONS}
