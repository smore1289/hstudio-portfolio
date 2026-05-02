/* eslint-disable no-console */
/**
 * Seed sample content matching the static index.html.
 * Run with:  npx sanity exec --with-user-token seed.mjs
 */
import {getCliClient} from 'sanity/cli'
import {readFile} from 'node:fs/promises'
import {fileURLToPath} from 'node:url'
import {dirname, resolve} from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const PORTFOLIO_ROOT = resolve(__dirname, '..')
const IMAGES_DIR = resolve(PORTFOLIO_ROOT, 'images')

const client = getCliClient({apiVersion: '2024-01-01'})

async function uploadImage(filename) {
  const path = resolve(IMAGES_DIR, filename)
  const buf = await readFile(path)
  console.log(`  uploading ${filename} …`)
  const asset = await client.assets.upload('image', buf, {filename})
  return asset._id
}

function imageField(assetId) {
  return {_type: 'image', asset: {_type: 'reference', _ref: assetId}}
}

async function main() {
  console.log('Uploading images …')
  const assets = {
    hero: await uploadImage('hero.jpg'),
    about: await uploadImage('about.jpg'),
    banner: await uploadImage('banner.jpg'),
    service1: await uploadImage('service-1.jpg'),
    service2: await uploadImage('service-2.jpg'),
    service3: await uploadImage('service-3.jpg'),
    service4: await uploadImage('service-4.jpg'),
    project: await uploadImage('project.jpg'),
    news1: await uploadImage('news-1.jpg'),
    news2: await uploadImage('news-2.jpg'),
    news3: await uploadImage('news-3.jpg'),
  }

  console.log('\nCreating services …')
  const serviceDefs = [
    {id: 'service-brand-discovery', name: 'Brand Discovery', order: 1, image: assets.service1},
    {id: 'service-web-design-dev', name: 'Web design & Dev', order: 2, image: assets.service2},
    {id: 'service-marketing', name: 'Marketing', order: 3, image: assets.service3},
    {id: 'service-photography', name: 'Photography', order: 4, image: assets.service4},
  ]
  for (const s of serviceDefs) {
    await client.createOrReplace({
      _id: s.id,
      _type: 'service',
      name: s.name,
      description:
        'Placeholder description of this service. Explain the value you provide and the outcomes clients can expect. Keep it to two or three sentences.',
      order: s.order,
      image: imageField(s.image),
    })
  }

  console.log('Creating projects …')
  const projectDefs = [
    {id: 'project-surfers-paradise', name: 'Surfers paradise', slug: 'surfers-paradise'},
    {id: 'project-cyberpunk-caffe', name: 'Cyberpunk caffe', slug: 'cyberpunk-caffe'},
    {id: 'project-agency-976', name: 'Agency 976', slug: 'agency-976'},
    {id: 'project-minimal-playground', name: 'Minimal Playground', slug: 'minimal-playground'},
  ]
  for (const p of projectDefs) {
    await client.createOrReplace({
      _id: p.id,
      _type: 'project',
      name: p.name,
      slug: {_type: 'slug', current: p.slug},
      tags: ['Social Media', 'Photography'],
      cover: imageField(assets.project),
    })
  }

  console.log('Creating testimonials …')
  const testimonialDefs = [
    {
      id: 'testimonial-lukas',
      authorName: 'Lukas Weber',
      quote:
        'Professional, precise, and incredibly fast at handling complex product visualizations and templates.',
    },
    {
      id: 'testimonial-marko',
      authorName: 'Marko Stojković',
      quote:
        'A brilliant creative partner who transformed our vision into a unique, high-impact brand identity. Their ability to craft everything from custom mascots to polished logos is truly impressive.',
    },
    {
      id: 'testimonial-sarah',
      authorName: 'Sarah Jenkins',
      quote:
        'A strategic partner who balances stunning aesthetics with high-performance UX for complex platforms. They don’t just make things look good; they solve business problems through visual clarity.',
    },
    {
      id: 'testimonial-sofia',
      authorName: 'Sofia Martínez',
      quote:
        'An incredibly versatile designer who delivers consistent quality across a wide range of styles and formats.',
    },
  ]
  for (const t of testimonialDefs) {
    await client.createOrReplace({
      _id: t.id,
      _type: 'testimonial',
      quote: t.quote,
      authorName: t.authorName,
      rating: 5,
    })
  }

  console.log('Creating news items …')
  const newsDefs = [
    {id: 'news-1', cover: assets.news1, daysAgo: 7},
    {id: 'news-2', cover: assets.news2, daysAgo: 21},
    {id: 'news-3', cover: assets.news3, daysAgo: 45},
  ]
  for (const [i, n] of newsDefs.entries()) {
    const publishedAt = new Date(Date.now() - n.daysAgo * 86400 * 1000).toISOString()
    await client.createOrReplace({
      _id: n.id,
      _type: 'newsItem',
      title: `News update ${i + 1}`,
      slug: {_type: 'slug', current: n.id},
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      cover: imageField(n.cover),
      publishedAt,
    })
  }

  console.log('Creating siteSettings …')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: 'H.Studio',
    tagline:
      'H.Studio is a full-service creative studio creating beautiful digital experience',
    navLinks: [
      {_key: 'nav-about', _type: 'navLink', label: 'About', href: '#about'},
      {_key: 'nav-services', _type: 'navLink', label: 'Services', href: '#services'},
      {_key: 'nav-projects', _type: 'navLink', label: 'Projects', href: '#projects'},
      {_key: 'nav-news', _type: 'navLink', label: 'News', href: '#news'},
      {_key: 'nav-contact', _type: 'navLink', label: 'Contact', href: '#contact'},
    ],
    primaryCta: {_type: 'cta', label: 'Let’s talk', href: '#contact'},
    footerHeadline: 'Have a project in mind?',
    footerColumns: [
      {
        _key: 'fcol-1',
        _type: 'footerColumn',
        links: [
          {_key: 'fb', _type: 'navLink', label: 'Facebook', href: '#'},
          {_key: 'ig', _type: 'navLink', label: 'Instagram', href: '#'},
        ],
      },
      {
        _key: 'fcol-2',
        _type: 'footerColumn',
        links: [
          {_key: 'x', _type: 'navLink', label: 'x.com', href: '#'},
          {_key: 'li', _type: 'navLink', label: 'Linkedin', href: '#'},
        ],
      },
    ],
    legalLinks: [
      {_key: 'licences', _type: 'navLink', label: 'licences', href: '#'},
      {_key: 'privacy', _type: 'navLink', label: 'Privacy policy', href: '#'},
    ],
    codedByLabel: '[ Coded By Claude ]',
  })

  console.log('Creating homePage …')
  const ref = (id, key) => ({_key: key, _type: 'reference', _ref: id})
  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroEyebrow: '[ Hello i’m ]',
    heroTitle: 'Harvey Specter',
    heroIntro:
      'H.Studio is a full-service creative studio creating beautiful digital experience',
    heroImage: imageField(assets.hero),

    statementEyebrow: '[ 8+ years in industry ]',
    statementLines: [
      'A creative director   /',
      'Photographer',
      'Born & raised',
      'on the south side',
      'of chicago.',
    ],
    statementEndTag: '[ creative freelancer ]',

    aboutEyebrow: '[ About ]',
    aboutCtaText:
      'Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.',
    aboutBody: [
      {
        _key: 'about-p1',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'about-p1-c',
            _type: 'span',
            marks: [],
            text:
              'Placeholder paragraph one. This is where you introduce yourself — your background, your passion for your craft, and what drives you creatively. Two to three sentences work best here.',
          },
        ],
      },
      {
        _key: 'about-p2',
        _type: 'block',
        style: 'normal',
        markDefs: [],
        children: [
          {
            _key: 'about-p2-c',
            _type: 'span',
            marks: [],
            text:
              'Placeholder paragraph two. Here you can describe your technical approach, how you collaborate with clients, or what sets your work apart from others in your field.',
          },
        ],
      },
    ],
    aboutImage: imageField(assets.about),

    bannerImage: imageField(assets.banner),

    servicesEyebrow: '[ services ]',
    servicesHeading: 'Deliverables',
    services: serviceDefs.map((s, i) => ref(s.id, `svc-${i}`)),

    workHeading: 'Selected Work',
    workEyebrow: '[ portfolio ]',
    workCtaText:
      'Discover how my creativity transforms ideas into impactful digital experiences — schedule a call with me to get started.',
    projects: projectDefs.map((p, i) => ref(p.id, `proj-${i}`)),

    testimonialsHeading: 'Testimonials',
    testimonials: testimonialDefs.map((t, i) => ref(t.id, `t-${i}`)),

    newsHeading: 'Keep up with my latest\nnews & achievements',
    newsItems: newsDefs.map((n, i) => ref(n.id, `n-${i}`)),
  })

  console.log('\nDone. Verifying …')
  const sanityCount = await client.fetch(`{
    "settings": *[_type=="siteSettings"][0]{_id, siteTitle},
    "home": *[_type=="homePage"][0]{_id, heroTitle},
    "services": count(*[_type=="service"]),
    "projects": count(*[_type=="project"]),
    "testimonials": count(*[_type=="testimonial"]),
    "newsItems": count(*[_type=="newsItem"])
  }`)
  console.log(JSON.stringify(sanityCount, null, 2))
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
