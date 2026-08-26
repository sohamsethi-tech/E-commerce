import { Link } from 'react-router-dom'
import HeroCarousel from '../components/HeroCarousel'
import CollectionCard from '../components/CollectionCard'
import CarpetCard from '../components/CarpetCard'
import { collections, getFeaturedCarpets, getNewArrivals, projects, carpets } from '../data/carpets'

export default function HomePage() {
  const featured = getFeaturedCarpets()
  const newArrivals = getNewArrivals()

  return (
    <>
      <HeroCarousel />

      {/* Style Categories */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Explore Our Rugs</p>
          <h2 className="mt-3 font-serif text-4xl text-navy md:text-5xl">By Collection</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] text-gold uppercase">Curated Selection</p>
              <h2 className="mt-3 font-serif text-4xl text-navy">Featured Designs</h2>
            </div>
            <Link
              to="/carpets"
              className="hidden text-sm tracking-widest text-navy uppercase transition-colors hover:text-gold sm:block"
            >
              View All →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.slice(0, 6).map((carpet) => (
              <CarpetCard key={carpet.id} carpet={carpet} />
            ))}
          </div>
        </div>
      </section>

      {/* Design Emotion Banner */}
      <section className="relative overflow-hidden bg-navy py-24">
        <div className="absolute inset-0 opacity-20">
          <img
            src="/images/carpets/image-bbb69fe9-1ecf-476b-967e-5ab195f99c70.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-8">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Design Emotion</p>
          <h2 className="mt-4 font-serif text-4xl text-white md:text-5xl">
            Art That Transcends the Floor
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-white/70">
            Design defines the experience of a carpet, pushing the boundaries of the craft.
            Carpets are truly art that's transcendent — to not just please the eye but to inspire joy.
          </p>
          <Link
            to="/about"
            className="mt-8 inline-block border border-gold px-8 py-3.5 text-sm tracking-widest text-gold uppercase transition-colors hover:bg-gold hover:text-navy"
          >
            Our Story
          </Link>
        </div>
      </section>

      {/* New Arrivals */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="mb-12 text-center">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Latest</p>
          <h2 className="mt-3 font-serif text-4xl text-navy">New Arrivals</h2>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {newArrivals.map((carpet) => (
            <CarpetCard key={carpet.id} carpet={carpet} />
          ))}
        </div>
      </section>

      {/* Custom Made CTA */}
      <section className="grid md:grid-cols-2">
        <div className="flex flex-col justify-center bg-cream-dark px-8 py-16 md:px-16">
          <p className="text-xs tracking-[0.3em] text-gold uppercase">Bespoke</p>
          <h2 className="mt-4 font-serif text-4xl text-navy">Design Your Own Rug</h2>
          <p className="mt-4 leading-relaxed text-charcoal/70">
            With design and production wholly in-house, we custom make carpets in our own special way.
            Our finest weavers bring to life designs created for the space and its owner.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {['Conceptualization', 'Development', 'Creation'].map((step) => (
              <div key={step}>
                <h4 className="font-serif text-lg text-navy">{step}</h4>
                <div className="mt-2 h-0.5 w-8 bg-gold" />
              </div>
            ))}
          </div>
          <Link
            to="/custom-made"
            className="mt-10 inline-block w-fit bg-navy px-8 py-3.5 text-sm tracking-widest text-white uppercase transition-colors hover:bg-navy-light"
          >
            Start Your Project
          </Link>
        </div>
        <div className="relative min-h-[400px]">
          <img
            src="/images/carpets/image-4ad88c8f-2880-4621-9a8d-47583cc956db.png"
            alt="Custom carpet design"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
      </section>

      {/* Projects */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <p className="text-xs tracking-[0.3em] text-gold uppercase">Portfolio</p>
              <h2 className="mt-3 font-serif text-4xl text-navy">Project Showcase</h2>
            </div>
            <Link
              to="/projects"
              className="text-sm tracking-widest text-navy uppercase transition-colors hover:text-gold"
            >
              All Projects →
            </Link>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {projects.map((project) => {
              const carpet = carpets.find((c) => c.id === project.carpetId)
              return (
              <Link
                key={project.id}
                to={carpet ? `/carpets/${carpet.slug}` : '/carpets'}
                className="group overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="mt-4">
                  <p className="text-xs tracking-widest text-gold uppercase">{project.location}</p>
                  <h3 className="mt-1 font-serif text-xl text-navy group-hover:text-gold">{project.title}</h3>
                  <p className="mt-2 text-sm text-charcoal/60">{project.description}</p>
                </div>
              </Link>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact CTAs */}
      <section className="grid md:grid-cols-3">
        {[
          { title: 'Contact Us', desc: 'Our team is happy to assist with any query.', link: '/contact', cta: 'Get in Touch' },
          { title: 'Book an Appointment', desc: 'Complimentary consultation for your special project.', link: '/contact', cta: 'Consult Us' },
          { title: 'Visit Our Store', desc: 'New Delhi, Mumbai, Dubai & Singapore.', link: '/about', cta: 'Visit Us' },
        ].map((item) => (
          <div key={item.title} className="border-t border-cream-dark bg-cream px-8 py-12 text-center md:border-t-0 md:border-l">
            <h3 className="font-serif text-2xl text-navy">{item.title}</h3>
            <p className="mt-3 text-sm text-charcoal/60">{item.desc}</p>
            <Link
              to={item.link}
              className="mt-6 inline-block text-xs tracking-widest text-gold uppercase transition-colors hover:text-navy"
            >
              {item.cta} →
            </Link>
          </div>
        ))}
      </section>
    </>
  )
}
