import { Link } from 'react-router-dom'
import { Pen, Palette, Hammer, Truck } from 'lucide-react'

const steps = [
  {
    icon: Pen,
    title: 'Conceptualization',
    description:
      'Have a fleeting notion or a well-rounded idea? Our in-house design studio creates original, beautiful, bespoke designs tailored to your space.',
  },
  {
    icon: Palette,
    title: 'Development',
    description:
      'Following sound planning and estimation, only the finest materials are chosen — allowing extensive flexibility in design, colour, and pattern.',
  },
  {
    icon: Hammer,
    title: 'Creation',
    description:
      'Our expertise extends to hand knotted, hand tufted, and hand woven carpets. Master artisans bring your vision to life inch by inch.',
  },
  {
    icon: Truck,
    title: 'Installation',
    description:
      'For any given project, anywhere in the world, our highly experienced installation team finishes the job at the site.',
  },
]

export default function CustomMadePage() {
  return (
    <div>
      <section className="relative h-[60vh] min-h-[450px]">
        <img
          src="/images/carpets/image-859b39f7-d9ad-4201-8601-9d15f4fe04ee.png"
          alt="Custom carpet"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-2xl px-6">
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Bespoke</p>
            <h1 className="mt-4 font-serif text-5xl text-white md:text-6xl">Design Your Own Rug</h1>
            <p className="mt-4 text-lg text-white/70">
              Custom made carpets, created not just for the space, but for its owner.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-gold text-gold">
                <step.icon size={28} />
              </div>
              <span className="mt-4 block text-xs tracking-widest text-gold uppercase">Step {i + 1}</span>
              <h3 className="mt-2 font-serif text-2xl text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[400px]">
          <img
            src="/images/carpets/image-bbb69fe9-1ecf-476b-967e-5ab195f99c70.png"
            alt="Custom installation"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-cream-dark px-8 py-16 md:px-16">
          <h2 className="font-serif text-3xl text-navy">Why Custom?</h2>
          <ul className="mt-6 space-y-4 text-charcoal/70">
            <li className="flex gap-3">
              <span className="text-gold">—</span>
              Every dimension, shape, and pattern tailored to your architecture
            </li>
            <li className="flex gap-3">
              <span className="text-gold">—</span>
              In-house design studio with 140+ years of heritage
            </li>
            <li className="flex gap-3">
              <span className="text-gold">—</span>
              Projects from intimate residences to 2,400 sq.m installations
            </li>
            <li className="flex gap-3">
              <span className="text-gold">—</span>
              Worldwide installation and aftercare support
            </li>
          </ul>
          <Link
            to="/contact"
            className="mt-8 inline-block w-fit bg-navy px-8 py-3.5 text-sm tracking-widest text-white uppercase hover:bg-navy-light"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  )
}
