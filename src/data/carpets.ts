import type { Carpet, Collection, Project } from '../types'

export const collections: Collection[] = [
  {
    id: 'traditional',
    name: 'Traditional',
    slug: 'traditional',
    description:
      'Age-old design themes with classic patterns, traditional symbolism, and cohesive colour — heirlooms for grand spaces.',
    image: '/images/carpets/image-5fbb4b00-1372-41eb-80af-eccd7b297dd4.png',
    style: 'traditional',
  },
  {
    id: 'contemporary',
    name: 'Contemporary',
    slug: 'contemporary',
    description:
      'Bold geometrics, organics, and abstract art — from minimal to vibrant, designed for the modern psyche.',
    image: '/images/carpets/image-4ff3b911-b05a-4378-b0ae-c8cff4be6f39.png',
    style: 'contemporary',
  },
  {
    id: 'persian',
    name: 'Persian Heritage',
    slug: 'persian-heritage',
    description:
      'Opulent Persian-inspired motifs with rich medallions, intricate borders, and regal colour palettes.',
    image: '/images/carpets/image-c714a311-00a5-428a-b065-127d15b39e65.png',
    style: 'traditional',
  },
  {
    id: 'hospitality',
    name: 'Hospitality & Commercial',
    slug: 'hospitality',
    description:
      'Large-scale installations for hotels, banquet halls, corridors, and luxury commercial spaces.',
    image: '/images/carpets/image-22921b40-f969-4aca-8e84-2a6419eae46f.png',
    style: 'modern',
  },
]

export const carpets: Carpet[] = [
  {
    id: '1',
    name: 'Forma Mosaic Corridor',
    slug: 'forma-mosaic-corridor',
    description: 'Bold geometric mosaic pattern in terracotta and teal for contemporary corridors.',
    longDescription:
      'A striking contemporary corridor carpet featuring concentric circular mosaic motifs in terracotta orange and deep teal against a dark charcoal ground. Designed for high-traffic hospitality spaces, this wall-to-wall installation transforms ordinary hallways into gallery-worthy passages.',
    image: '/images/carpets/image-4ff3b911-b05a-4378-b0ae-c8cff4be6f39.png',
    images: ['/images/carpets/image-4ff3b911-b05a-4378-b0ae-c8cff4be6f39.png'],
    collectionId: 'contemporary',
    style: 'contemporary',
    quality: 'hand-tufted',
    shape: 'runner',
    colors: ['Terracotta', 'Teal', 'Charcoal', 'Cream'],
    materials: ['New Zealand Wool', 'Viscose'],
    featured: true,
    newArrival: true,
    projectType: 'Hotel Corridor',
    basePrice: 125000,
  },
  {
    id: '2',
    name: 'Grand Ballroom Runner',
    slug: 'grand-ballroom-runner',
    description: 'Elegant traditional runner with dense floral damask in warm golden tones.',
    longDescription:
      'An exquisite ballroom runner featuring dense traditional damask and floral motifs in shades of tan, beige, and golden-brown. Framed by polished marble and dark accent stripes, this carpet creates a sense of procession and grandeur in luxury event spaces.',
    image: '/images/carpets/image-22921b40-f969-4aca-8e84-2a6419eae46f.png',
    images: ['/images/carpets/image-22921b40-f969-4aca-8e84-2a6419eae46f.png'],
    collectionId: 'hospitality',
    style: 'traditional',
    quality: 'hand-knotted',
    shape: 'runner',
    colors: ['Gold', 'Beige', 'Tan', 'Brown'],
    materials: ['100% Wool', 'Silk Accents'],
    featured: true,
    newArrival: false,
    projectType: 'Ballroom',
    basePrice: 350000,
  },
  {
    id: '3',
    name: 'Crimson Mandala',
    slug: 'crimson-mandala',
    description: 'Deep crimson field with intricate gold mandala motifs for banquet halls.',
    longDescription:
      'A magnificent crimson-red carpet adorned with repeating gold and cream mandala-style geometric floral motifs. The lace-like concentric patterns create visual depth across vast floor areas, perfect for luxury banquet halls and event venues.',
    image: '/images/carpets/image-05b489f7-207d-4671-b975-5a71f12d1fe8.png',
    images: ['/images/carpets/image-05b489f7-207d-4671-b975-5a71f12d1fe8.png'],
    collectionId: 'persian',
    style: 'traditional',
    quality: 'hand-tufted',
    shape: 'rectangular',
    colors: ['Crimson', 'Gold', 'Cream'],
    materials: ['Wool', 'Bamboo Silk'],
    featured: true,
    newArrival: false,
    projectType: 'Banquet Hall',
    basePrice: 480000,
  },
  {
    id: '4',
    name: 'Regal Sunburst Medallion',
    slug: 'regal-sunburst-medallion',
    description: 'Classic red and gold sunburst medallions with flowing acanthus scrollwork.',
    longDescription:
      'A regal carpet featuring large sunburst-style circular medallions in crimson and gold, surrounded by elegant acanthus leaf scrollwork. The wide decorative border and subtle diamond trellis field make this a centerpiece for grand ballrooms and ceremonial halls.',
    image: '/images/carpets/image-113f1e19-7179-484b-a183-fe4178c5abce.png',
    images: ['/images/carpets/image-113f1e19-7179-484b-a183-fe4178c5abce.png'],
    collectionId: 'persian',
    style: 'traditional',
    quality: 'hand-knotted',
    shape: 'rectangular',
    colors: ['Crimson', 'Gold', 'Maroon', 'Cream'],
    materials: ['100% Wool', 'Silk'],
    featured: false,
    newArrival: true,
    projectType: 'Ballroom',
    basePrice: 520000,
  },
  {
    id: '5',
    name: 'Terra Flow Round',
    slug: 'terra-flow-round',
    description: 'Abstract topographic round carpet in navy, ochre, and copper tones.',
    longDescription:
      'A stunning circular carpet with organic topographic contour lines in deep navy, slate blue, warm ochre, and copper. Resembling flowing landscapes from above, this contemporary masterpiece is ideal for grand lobbies, showrooms, and luxury residences.',
    image: '/images/carpets/image-859b39f7-d9ad-4201-8601-9d15f4fe04ee.png',
    images: [
      '/images/carpets/image-859b39f7-d9ad-4201-8601-9d15f4fe04ee.png',
      '/images/carpets/image-25cdaea7-6846-41a4-a723-e6cfd47ab04a.png',
    ],
    collectionId: 'contemporary',
    style: 'contemporary',
    quality: 'hand-tufted',
    shape: 'round',
    colors: ['Navy', 'Ochre', 'Slate Blue', 'Copper'],
    materials: ['Wool', 'Viscose', 'Silk'],
    featured: true,
    newArrival: true,
    projectType: 'Showroom Lobby',
    basePrice: 285000,
  },
  {
    id: '6',
    name: 'Terra Flow — Detail',
    slug: 'terra-flow-detail',
    description: 'Close-up of the Terra Flow collection — fine linework and organic depth.',
    longDescription:
      'The Terra Flow collection up close reveals the extraordinary fineness of its linework. Deep navy rivers cut through ochre landmasses, creating a sense of motion and depth that transforms any floor into a work of art.',
    image: '/images/carpets/image-25cdaea7-6846-41a4-a723-e6cfd47ab04a.png',
    images: ['/images/carpets/image-25cdaea7-6846-41a4-a723-e6cfd47ab04a.png'],
    collectionId: 'contemporary',
    style: 'contemporary',
    quality: 'hand-tufted',
    shape: 'round',
    colors: ['Navy', 'Ochre', 'Grey', 'Cream'],
    materials: ['Wool', 'Viscose'],
    featured: false,
    newArrival: false,
    projectType: 'Private Residence',
    basePrice: 285000,
  },
  {
    id: '7',
    name: 'Imperial Crest',
    slug: 'imperial-crest',
    description: 'Navy field with cream scrollwork, red ribbon borders, and gold accents.',
    longDescription:
      'An imperial-class carpet with a deep navy central field decorated with intricate cream floral scrollwork. Multiple layered borders in gold, red ribbon patterns, and fleur-de-lis motifs frame a magnificent central medallion — crafted for the most prestigious venues.',
    image: '/images/carpets/image-bbb69fe9-1ecf-476b-967e-5ab195f99c70.png',
    images: ['/images/carpets/image-bbb69fe9-1ecf-476b-967e-5ab195f99c70.png'],
    collectionId: 'traditional',
    style: 'traditional',
    quality: 'hand-knotted',
    shape: 'rectangular',
    colors: ['Navy', 'Gold', 'Red', 'Cream'],
    materials: ['100% Wool', 'Silk Highlights'],
    featured: true,
    newArrival: false,
    projectType: 'Grand Hall',
    basePrice: 950000,
  },
  {
    id: '8',
    name: 'Mughal Heritage',
    slug: 'mughal-heritage',
    description: 'Burgundy Persian field with navy borders and classical Mughal motifs.',
    longDescription:
      'Inspired by Mughal architectural grandeur, this carpet features a rich burgundy field densely packed with cream, gold, and light blue floral motifs. The multi-layered navy border and circular medallions create a sense of timeless heritage and opulence.',
    image: '/images/carpets/image-5fbb4b00-1372-41eb-80af-eccd7b297dd4.png',
    images: ['/images/carpets/image-5fbb4b00-1372-41eb-80af-eccd7b297dd4.png'],
    collectionId: 'persian',
    style: 'traditional',
    quality: 'hand-knotted',
    shape: 'rectangular',
    colors: ['Burgundy', 'Navy', 'Gold', 'Cream'],
    materials: ['100% Wool', 'Silk'],
    featured: true,
    newArrival: false,
    projectType: 'Ceremonial Hall',
    basePrice: 1200000,
  },
  {
    id: '9',
    name: 'Impulse Abstract',
    slug: 'impulse-abstract',
    description: 'Sweeping organic forms in burnt orange and gold on a painterly navy ground.',
    longDescription:
      'A bold contemporary carpet where sweeping organic shapes in burnt orange and gold rise from a painterly navy and grey ground. The large-scale, non-repeating abstract pattern flows seamlessly across vast floor areas without losing its visual impact.',
    image: '/images/carpets/image-4ad88c8f-2880-4621-9a8d-47583cc956db.png',
    images: ['/images/carpets/image-4ad88c8f-2880-4621-9a8d-47583cc956db.png'],
    collectionId: 'contemporary',
    style: 'contemporary',
    quality: 'hand-tufted',
    shape: 'rectangular',
    colors: ['Navy', 'Burnt Orange', 'Gold', 'Grey'],
    materials: ['Wool', 'Bamboo Silk'],
    featured: true,
    newArrival: true,
    projectType: 'Event Hall',
    basePrice: 650000,
  },
  {
    id: '10',
    name: 'Celestial Round Medallion',
    slug: 'celestial-round-medallion',
    description: 'Symmetrical circular design with navy, gold, and light blue rings.',
    longDescription:
      'A perfectly symmetrical circular carpet featuring concentric rings — from a central red starburst through gold radiating lines, ochre scalloped bands, and a light blue floral vine ring, all framed by a bold navy fleur-de-lis border.',
    image: '/images/carpets/image-994d165f-40db-47ca-88d2-cf7aca8bf9c6.png',
    images: ['/images/carpets/image-994d165f-40db-47ca-88d2-cf7aca8bf9c6.png'],
    collectionId: 'traditional',
    style: 'traditional',
    quality: 'hand-knotted',
    shape: 'round',
    colors: ['Navy', 'Gold', 'Light Blue', 'Ochre'],
    materials: ['100% Wool', 'Silk'],
    featured: false,
    newArrival: true,
    projectType: 'Ballroom',
    basePrice: 420000,
  },
  {
    id: '11',
    name: 'Royal Persian Suite',
    slug: 'royal-persian-suite',
    description: 'Classic Persian with navy scrollwork, gold borders, and central medallion.',
    longDescription:
      'A royal Persian suite carpet with deep navy scrollwork, prominent gold and red borders, and a magnificent central medallion. Installed beneath a crystal chandelier, it exemplifies the marriage of fine craftsmanship and architectural grandeur.',
    image: '/images/carpets/image-eb90f5f5-4e31-41a6-b285-1a1fd3c1b932.png',
    images: ['/images/carpets/image-eb90f5f5-4e31-41a6-b285-1a1fd3c1b932.png'],
    collectionId: 'persian',
    style: 'traditional',
    quality: 'hand-knotted',
    shape: 'rectangular',
    colors: ['Navy', 'Gold', 'Red', 'Cream'],
    materials: ['Wool', 'Silk'],
    featured: false,
    newArrival: false,
    projectType: 'Grand Ballroom',
    basePrice: 880000,
  },
  {
    id: '12',
    name: 'Heritage Palace',
    slug: 'heritage-palace',
    description: 'Burgundy field with navy borders in a Mughal-inspired palatial setting.',
    longDescription:
      'The Heritage Palace carpet fills a vast Mughal-inspired hall with its rich burgundy field, intricate multi-coloured motifs, and commanding navy border. A testament to scale and craftsmanship for the most ambitious interior projects.',
    image: '/images/carpets/image-c714a311-00a5-428a-b065-127d15b39e65.png',
    images: ['/images/carpets/image-c714a311-00a5-428a-b065-127d15b39e65.png'],
    collectionId: 'persian',
    style: 'traditional',
    quality: 'hand-knotted',
    shape: 'rectangular',
    colors: ['Burgundy', 'Navy', 'Gold', 'Cream'],
    materials: ['100% Wool', 'Silk'],
    featured: true,
    newArrival: false,
    projectType: 'Palace Hall',
    basePrice: 1500000,
  },
  {
    id: '13',
    name: 'GraphX Corridor',
    slug: 'graphx-corridor',
    description: 'Dark geometric quatrefoil lattice with a bold gold accent streak.',
    longDescription:
      'A modern corridor carpet featuring an interlocking quatrefoil geometric lattice on a dark charcoal ground, broken by a striking distressed gold accent streak. Perfect for upscale hotel corridors and premium residential hallways.',
    image: '/images/carpets/image-5fd586ba-7718-4ed9-bd61-6a73aa8759af.png',
    images: ['/images/carpets/image-5fd586ba-7718-4ed9-bd61-6a73aa8759af.png'],
    collectionId: 'hospitality',
    style: 'modern',
    quality: 'hand-tufted',
    shape: 'runner',
    colors: ['Charcoal', 'Gold', 'Black'],
    materials: ['Wool', 'Nylon Blend'],
    featured: false,
    newArrival: true,
    projectType: 'Hotel Corridor',
    basePrice: 95000,
  },
  {
    id: '14',
    name: 'Empire Grand Hall',
    slug: 'empire-grand-hall',
    description: 'Full-scale Persian installation with burgundy field and navy framing.',
    longDescription:
      'The Empire Grand Hall installation showcases our capability for full-scale bespoke projects. A burgundy Persian field with navy borders and cream-gold motifs, set within white Mughal architecture — a complete transformation of space through floor art.',
    image: '/images/carpets/image-e395eda3-5bbb-4938-838e-ded0db3e1a20.png',
    images: ['/images/carpets/image-e395eda3-5bbb-4938-838e-ded0db3e1a20.png'],
    collectionId: 'traditional',
    style: 'traditional',
    quality: 'hand-knotted',
    shape: 'rectangular',
    colors: ['Burgundy', 'Navy', 'Gold', 'Cream'],
    materials: ['100% Wool', 'Silk'],
    featured: true,
    newArrival: false,
    projectType: 'Grand Hall',
    basePrice: 1100000,
  },
]

export const projects: Project[] = [
  {
    id: '1',
    title: 'Grand Ballroom Installation',
    location: 'Luxury Hotel, India',
    description: 'A 2,400 sq.m hand-knotted Persian carpet for a five-star ballroom.',
    image: '/images/carpets/image-c714a311-00a5-428a-b065-127d15b39e65.png',
    carpetId: '12',
  },
  {
    id: '2',
    title: 'Circular Lobby Feature',
    location: 'Premium Showroom',
    description: 'Custom 8-meter diameter round carpet with topographic abstract design.',
    image: '/images/carpets/image-859b39f7-d9ad-4201-8601-9d15f4fe04ee.png',
    carpetId: '5',
  },
  {
    id: '3',
    title: 'Hotel Corridor Programme',
    location: 'Boutique Hotel Chain',
    description: 'Wall-to-wall corridor carpets across 120 rooms with bespoke geometric patterns.',
    image: '/images/carpets/image-4ff3b911-b05a-4378-b0ae-c8cff4be6f39.png',
    carpetId: '1',
  },
]

export function getCarpetBySlug(slug: string): Carpet | undefined {
  return carpets.find((c) => c.slug === slug)
}

export function getCollectionBySlug(slug: string): Collection | undefined {
  return collections.find((c) => c.slug === slug)
}

export function getCarpetsByCollection(collectionId: string): Carpet[] {
  return carpets.filter((c) => c.collectionId === collectionId)
}

export function getFeaturedCarpets(): Carpet[] {
  return carpets.filter((c) => c.featured)
}

export function getNewArrivals(): Carpet[] {
  return carpets.filter((c) => c.newArrival)
}

export function searchCarpets(query: string): Carpet[] {
  const q = query.toLowerCase().trim()
  if (!q) return carpets
  return carpets.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.description.toLowerCase().includes(q) ||
      c.colors.some((color) => color.toLowerCase().includes(q)) ||
      c.style.includes(q) ||
      c.projectType.toLowerCase().includes(q),
  )
}
