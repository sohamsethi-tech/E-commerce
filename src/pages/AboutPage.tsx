import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'

const showrooms = [
  { city: 'New Delhi', address: 'Defence Colony, New Delhi 110024' },
  { city: 'Mumbai', address: 'Bandra West, Mumbai 400050' },
  { city: 'Dubai', address: 'Jumeirah, Dubai, UAE' },
  { city: 'Singapore', address: 'Dempsey Hill, Singapore' },
]

export default function AboutPage() {
  return (
    <div>
      <section className="relative h-[50vh] min-h-[400px]">
        <img
          src="/images/carpets/image-c714a311-00a5-428a-b065-127d15b39e65.png"
          alt="Heritage Loom craftsmanship"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 lg:px-8">
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Since 1881</p>
            <h1 className="mt-2 font-serif text-5xl text-white">Our Story</h1>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-20 lg:px-8">
        <h2 className="font-serif text-3xl text-navy">The Birth of the Beautiful</h2>
        <p className="mt-6 leading-relaxed text-charcoal/70">
          The journey of Heritage Loom dates back to 1881. A surprise discovery of an artistically gifted
          carpet weaving community of Bhadohi, a tiny hamlet in the ancient city of Varanasi, pioneered
          the trend of masterfully created handmade carpets in the country.
        </p>
        <p className="mt-4 leading-relaxed text-charcoal/70">
          Today, with a legacy spanning over 140 years, we are not only one of the oldest carpet
          manufacturing companies of India but also the carpet makers of the modern world. From royal
          palaces to quaint residences, across 5 continents — we have handled projects of every scale.
        </p>

        <h2 className="mt-16 font-serif text-3xl text-navy">Design Emotion</h2>
        <p className="mt-6 leading-relaxed text-charcoal/70">
          Design defines the experience of a carpet, pushing the boundaries of the craft. Carpets are
          truly art that's transcendent — to not just please the eye but to inspire joy. Each collection
          is an expression of emotion, crafted to evoke a powerful response from those who walk upon it.
        </p>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-10 text-center font-serif text-3xl text-navy">Our Showrooms</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {showrooms.map((s) => (
              <div key={s.city} className="border border-cream-dark p-6 text-center">
                <MapPin className="mx-auto text-gold" size={24} />
                <h3 className="mt-3 font-serif text-xl text-navy">{s.city}</h3>
                <p className="mt-2 text-sm text-charcoal/60">{s.address}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3">
        {[
          { img: '/images/carpets/image-5fbb4b00-1372-41eb-80af-eccd7b297dd4.png', label: 'Hand Knotted' },
          { img: '/images/carpets/image-4ad88c8f-2880-4621-9a8d-47583cc956db.png', label: 'Hand Tufted' },
          { img: '/images/carpets/image-994d165f-40db-47ca-88d2-cf7aca8bf9c6.png', label: 'Custom Projects' },
        ].map((item) => (
          <div key={item.label} className="relative aspect-square overflow-hidden">
            <img src={item.img} alt={item.label} className="h-full w-full object-cover" />
            <div className="absolute inset-0 flex items-end bg-gradient-to-t from-navy/70 to-transparent p-6">
              <span className="font-serif text-xl text-white">{item.label}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="py-16 text-center">
        <Link
          to="/contact"
          className="inline-block bg-gold px-8 py-3.5 text-sm tracking-widest text-navy uppercase hover:bg-gold-light"
        >
          Book an Appointment
        </Link>
      </section>
    </div>
  )
}
