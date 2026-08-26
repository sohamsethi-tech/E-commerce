import CollectionCard from '../components/CollectionCard'
import { collections } from '../data/carpets'

export default function CollectionsPage() {
  return (
    <div>
      <section className="bg-navy py-20 text-center text-white">
        <p className="text-xs tracking-[0.3em] text-gold uppercase">Browse</p>
        <h1 className="mt-4 font-serif text-5xl">Our Collections</h1>
        <p className="mx-auto mt-4 max-w-xl text-white/60">
          From traditional heirlooms to bold contemporary statements — explore carpets crafted for every space and sensibility.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {collections.map((col) => (
            <CollectionCard key={col.id} collection={col} />
          ))}
        </div>
      </section>

      <section className="bg-white py-16">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-8">
          <h2 className="font-serif text-3xl text-navy">By Quality</h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {[
              { name: 'Hand Knotted', desc: 'Woven inch by inch by master artisans. The pinnacle of carpet craftsmanship.' },
              { name: 'Hand Tufted', desc: 'Crafted with care and technique, offering extensive flexibility in design and colour.' },
            ].map((q) => (
              <div key={q.name} className="border border-cream-dark p-8">
                <h3 className="font-serif text-2xl text-navy">{q.name}</h3>
                <p className="mt-3 text-sm text-charcoal/60">{q.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
