import { useState } from 'react'
import { Link } from 'react-router-dom'
import CarpetCard from '../components/CarpetCard'
import IntroSplash from '../components/ui/intro-splash'
import ParallaxHeroImages from '../components/ui/parallax-hero-images'
import { collections, getFeaturedCarpets, getNewArrivals, projects, carpets } from '../data/carpets'

export default function HomePage() {
  const featured = getFeaturedCarpets()
  const newArrivals = getNewArrivals()
  const [showSplash, setShowSplash] = useState(true)
  const [activeCollection, setActiveCollection] = useState(0)

  const heroImages = [
    '/images/carpets/image-4ff3b911-b05a-4378-b0ae-c8cff4be6f39.png',
    '/images/carpets/image-05b489f7-207d-4671-b975-5a71f12d1fe8.png',
    '/images/carpets/image-22921b40-f969-4aca-8e84-2a6419eae46f.png',
    '/images/carpets/image-5fbb4b00-1372-41eb-80af-eccd7b297dd4.png',
    '/images/carpets/image-859b39f7-d9ad-4201-8601-9d15f4fe04ee.png',
    '/images/carpets/image-c714a311-00a5-428a-b065-127d15b39e65.png',
  ]

  return (
    <>
      {showSplash && <IntroSplash onComplete={() => setShowSplash(false)} />}

      <main className={`transition-opacity duration-700 ${showSplash ? 'opacity-0' : 'opacity-100'}`}>
        <section className="relative isolate overflow-hidden bg-[#111827]">
          <div className="absolute inset-0">
            <ParallaxHeroImages images={heroImages} className="h-full w-full" />
          </div>

          <div className="relative mx-auto flex min-h-screen max-w-7xl items-center px-6 pb-16 pt-32 lg:px-8">
            <div className="max-w-xl md:max-w-2xl">
              <p className="mb-3 text-[11px] tracking-[0.42em] text-[#d7c290] uppercase">
                Carpets &amp; Beyond by Dinesh Sethi
              </p>
              <p className="mb-5 text-[11px] tracking-[0.42em] text-white/70 uppercase">
                Luxury handmade rugs • bespoke interiors
              </p>
              <h1 className="font-serif text-5xl leading-[0.9] tracking-[-0.04em] text-white md:text-6xl lg:text-[7rem]">
                CRAFTED TO DEFINE YOUR SPACE
              </h1>
              <p className="mt-6 max-w-lg text-base leading-relaxed text-white/75 md:text-lg">
                Handcrafted rugs designed to bring warmth, character and timeless beauty to exceptional spaces.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link to="/collections" className="luxury-button-primary">
                  Explore Collection
                </Link>
                <Link to="/custom-made" className="luxury-button-secondary">
                  Create Bespoke
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="section-label">Curated Luxury</p>
              <h2 className="editorial-heading mt-3">Collections for grand living</h2>
            </div>
            <Link to="/collections" className="text-sm tracking-[0.24em] text-navy uppercase transition-colors hover:text-gold">
              View all collections →
            </Link>
          </div>

          <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            <div className="space-y-4">
              {collections.map((collection, index) => (
                <Link
                  key={collection.id}
                  to={`/collections/${collection.slug}`}
                  onMouseEnter={() => setActiveCollection(index)}
                  className={`group flex items-end justify-between gap-6 border-b border-[#d9d0c3] pb-5 transition-all duration-300 ${
                    activeCollection === index ? 'text-navy' : 'text-charcoal/60'
                  }`}
                >
                  <div>
                    <p className="text-[10px] tracking-[0.35em] uppercase text-gold">0{index + 1}</p>
                    <h3 className="mt-4 font-serif text-4xl leading-none transition-transform duration-300 group-hover:translate-x-1 md:text-5xl">
                      {collection.name}
                    </h3>
                  </div>
                  <p className="max-w-md text-sm leading-relaxed text-charcoal/60">
                    {collection.description}
                  </p>
                </Link>
              ))}
            </div>

            <div className="relative overflow-hidden rounded-[32px] border border-[#e6dcc8] bg-[#efe7dd] soft-shadow">
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={collections[activeCollection]?.image}
                  alt={collections[activeCollection]?.name}
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#111827]/70 via-transparent to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-7 text-white">
                <p className="text-[11px] tracking-[0.32em] uppercase text-[#d8c38d]">Featured Collection</p>
                <h3 className="mt-3 font-serif text-4xl leading-none">{collections[activeCollection]?.name}</h3>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f0e8] py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="section-label">Most loved</p>
                <h2 className="editorial-heading mt-3">Signature pieces for exceptional interiors</h2>
              </div>
              <Link to="/carpets" className="text-sm tracking-[0.24em] text-navy uppercase transition-colors hover:text-gold">
                Browse all rugs →
              </Link>
            </div>
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {featured.slice(0, 6).map((carpet) => (
                <CarpetCard key={carpet.id} carpet={carpet} />
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-[1.05fr_1.45fr] lg:items-center">
            <div className="overflow-hidden rounded-[30px] border border-[#e6dcc8] bg-[#efe7dc] soft-shadow">
              <img src="/images/carpets/image-113f1e19-7179-484b-a183-fe4178c5abce.png" alt="Luxury rug styling" className="h-full w-full object-cover" />
            </div>

            <div>
              <p className="section-label">Design Ethos</p>
              <h2 className="editorial-heading mt-3">Art that brings rooms to life.</h2>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-charcoal/70">
                Every carpet tells a story of craftsmanship, texture, and timeless elegance. We design for homes, hospitality, and spaces that deserve character.
              </p>
              <div className="mt-8 grid gap-5 sm:grid-cols-3">
                {['Bespoke Design', 'Handcrafted Finish', 'Heritage Craft'].map((tag) => (
                  <span key={tag} className="border border-[#d9c59b] bg-[#faf6f1] px-4 py-3 text-center text-[11px] tracking-[0.2em] text-navy uppercase">
                    {tag}
                  </span>
                ))}
              </div>
              <Link to="/about" className="mt-10 inline-flex items-center gap-2 text-sm tracking-[0.24em] text-navy uppercase transition-colors hover:text-gold">
                Our Story →
              </Link>
            </div>
          </div>
        </section>

        <section className="bg-white py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="mb-12 flex items-end justify-between">
              <div>
                <p className="section-label">Portfolio</p>
                <h2 className="editorial-heading mt-3">Recent installations</h2>
              </div>
              <Link to="/projects" className="text-sm tracking-[0.24em] text-navy uppercase transition-colors hover:text-gold">
                All projects →
              </Link>
            </div>

            <div className="space-y-8">
              {projects.map((project, index) => {
                const carpet = carpets.find((c) => c.id === project.carpetId)
                const isReverse = index % 2 !== 0

                return (
                  <Link
                    key={project.id}
                    to={carpet ? `/carpets/${carpet.slug}` : '/carpets'}
                    className="group block"
                  >
                    <div className={`grid gap-8 lg:grid-cols-2 lg:items-center ${isReverse ? 'lg:[&>*:first-child]:order-2' : ''}`}>
                      <div className="overflow-hidden rounded-[30px] border border-[#eadfce] bg-[#f8f1e8] soft-shadow">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                      </div>

                      <div className="px-1 lg:px-6">
                        <p className="text-[11px] tracking-[0.3em] text-gold uppercase">{project.location}</p>
                        <h3 className="mt-4 font-serif text-4xl text-navy md:text-5xl">{project.title}</h3>
                        <p className="mt-4 max-w-lg text-base leading-relaxed text-charcoal/70">{project.description}</p>
                        <span className="mt-8 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-navy uppercase transition-colors group-hover:text-gold">
                          View project →
                        </span>
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {newArrivals.slice(0, 4).map((carpet) => (
              <CarpetCard key={carpet.id} carpet={carpet} />
            ))}
          </div>
        </section>

        <section className="relative overflow-hidden bg-[#1b2435]">
          <div className="absolute inset-0 opacity-30">
            <img src="/images/carpets/image-4ad88c8f-2880-4621-9a8d-47583cc956db.png" alt="" className="h-full w-full object-cover" />
          </div>
          <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_1.25fr] lg:items-center">
              <div className="max-w-xl">
                <p className="section-label text-[#d8c38d]">Bespoke</p>
                <h2 className="mt-4 font-serif text-5xl leading-none text-white md:text-6xl">
                  YOUR SPACE.<br />YOUR STORY.<br />YOUR RUG.
                </h2>
              </div>
              <div className="space-y-6 text-white/75">
                <p className="text-lg leading-relaxed">
                  From concept to creation, we craft handmade carpets tailored to your architecture, mood, and way of living.
                </p>
                <Link to="/custom-made" className="luxury-button-primary">
                  Start Your Project
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="grid md:grid-cols-3">
          {[
            { title: 'Contact Us', desc: 'Speak with our team for tailored recommendations and project guidance.', link: '/contact', cta: 'Get in Touch' },
            { title: 'Book an Appointment', desc: 'Schedule a design consultation for your next masterpiece.', link: '/contact', cta: 'Consult Us' },
            { title: 'Visit Our Store', desc: 'Explore collections in person with our design specialists.', link: '/about', cta: 'Visit Us' },
          ].map((item) => (
            <div key={item.title} className="border-t border-[#e3d9ca] bg-[#f7f2ea] px-8 py-12 text-center md:border-t-0 md:border-l">
              <h3 className="font-serif text-2xl text-navy">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{item.desc}</p>
              <Link to={item.link} className="mt-6 inline-block text-xs tracking-[0.2em] text-gold uppercase transition-colors hover:text-navy">
                {item.cta} →
              </Link>
            </div>
          ))}
        </section>
      </main>
    </>
  )
}
