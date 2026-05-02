import {cta} from './objects/cta'
import {navLink} from './objects/navLink'
import {siteSettings} from './documents/siteSettings'
import {homePage} from './documents/homePage'
import {service} from './documents/service'
import {project} from './documents/project'
import {testimonial} from './documents/testimonial'
import {newsItem} from './documents/newsItem'

export const schemaTypes = [
  // Objects
  cta,
  navLink,
  // Singletons
  siteSettings,
  homePage,
  // Collections
  service,
  project,
  testimonial,
  newsItem,
]
