import { Link } from 'react-router-dom'
import { projects, carpets } from '../data/carpets'

export default function ProjectsPage() {
  return (
    <div>
      <section className="bg-navy py-20 text-center text-white">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">Portfolio</p>
        <h1 className="mt-4 font-serif text-5xl">Project Showcase</h1>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          From royal palaces to luxury hotels — projects of every scale across 5 continents.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12">
          {projects.map((project) => {
            const carpet = carpets.find((c) => c.id === project.carpetId)

            return (
              <Link
                key={project.id}
                to={carpet ? `/carpets/${carpet.slug}` : '/carpets'}
                className="group grid overflow-hidden bg-white md:grid-cols-2"
              >
                <div className="aspect-[4/3] overflow-hidden md:aspect-auto">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col justify-center p-8 md:p-12">
                  <p className="text-xs tracking-widest text-gold uppercase">{project.location}</p>
                  <h2 className="mt-2 font-serif text-3xl text-navy group-hover:text-gold">{project.title}</h2>
                  <p className="mt-4 leading-relaxed text-charcoal/70">{project.description}</p>
                  <span className="mt-6 text-xs tracking-widest text-gold uppercase">View Design →</span>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-20">
        <div className="absolute inset-0 opacity-15">
          <img
            src="/images/carpets/image-e395eda3-5bbb-4938-838e-ded0db3e1a20.png"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="relative mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-serif text-3xl text-white">Have a Project in Mind?</h2>
          <p className="mt-4 text-white/60">
            Our expertise extends to almost all forms of carpet making, with installation teams worldwide.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-block bg-gold px-8 py-3.5 text-sm tracking-widest text-navy uppercase hover:bg-gold-light"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
