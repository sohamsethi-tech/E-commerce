import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Mail, Phone, ShoppingBag } from 'lucide-react'
import { getCarpetBySlug, collections, carpets } from '../data/carpets'
import CarpetCard from '../components/CarpetCard'

export default function ProductPage() {
  const { slug } = useParams<{ slug: string }>()
  const carpet = getCarpetBySlug(slug ?? '')
  const [activeImage, setActiveImage] = useState(0)

  if (!carpet) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="font-serif text-3xl text-navy">Carpet Not Found</h1>
        <Link to="/carpets" className="mt-4 text-gold hover:underline">← Back to All Rugs</Link>
      </div>
    )
  }

  const collection = collections.find((c) => c.id === carpet.collectionId)
  const related = carpets
    .filter((c) => c.collectionId === carpet.collectionId && c.id !== carpet.id)
    .slice(0, 3)

  return (
    <div>
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8">
        <Link to="/carpets" className="inline-flex items-center gap-2 text-sm text-charcoal/60 hover:text-gold">
          <ArrowLeft size={16} /> Back to All Rugs
        </Link>
      </div>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Images */}
          <div>
            <div className="aspect-[4/3] overflow-hidden bg-cream-dark">
              <img
                src={carpet.images[activeImage]}
                alt={carpet.name}
                className="h-full w-full object-cover"
              />
            </div>
            {carpet.images.length > 1 && (
              <div className="mt-4 flex gap-3">
                {carpet.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    className={`h-20 w-20 overflow-hidden border-2 transition-colors ${
                      i === activeImage ? 'border-gold' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="h-full w-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            {collection && (
              <Link
                to={`/collections/${collection.slug}`}
                className="text-xs tracking-[0.2em] text-gold uppercase hover:underline"
              >
                {collection.name}
              </Link>
            )}
            <h1 className="mt-2 font-serif text-4xl text-navy md:text-5xl">{carpet.name}</h1>
            <p className="mt-6 leading-relaxed text-charcoal/70">{carpet.longDescription}</p>

            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <h4 className="text-xs tracking-widest text-charcoal/40 uppercase">Style</h4>
                <p className="mt-1 capitalize text-navy">{carpet.style}</p>
              </div>
              <div>
                <h4 className="text-xs tracking-widest text-charcoal/40 uppercase">Quality</h4>
                <p className="mt-1 capitalize text-navy">{carpet.quality.replace('-', ' ')}</p>
              </div>
              <div>
                <h4 className="text-xs tracking-widest text-charcoal/40 uppercase">Shape</h4>
                <p className="mt-1 capitalize text-navy">{carpet.shape}</p>
              </div>
              <div>
                <h4 className="text-xs tracking-widest text-charcoal/40 uppercase">Project Type</h4>
                <p className="mt-1 text-navy">{carpet.projectType}</p>
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-xs tracking-widest text-charcoal/40 uppercase">Colours</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {carpet.colors.map((color) => (
                  <span key={color} className="border border-cream-dark px-3 py-1 text-sm text-charcoal/80">
                    {color}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h4 className="text-xs tracking-widest text-charcoal/40 uppercase">Materials</h4>
              <div className="mt-2 flex flex-wrap gap-2">
                {carpet.materials.map((mat) => (
                  <span key={mat} className="bg-cream-dark px-3 py-1 text-sm text-charcoal/80">
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to={`/checkout?carpet=${carpet.slug}`}
                className="inline-flex items-center gap-2 bg-gold px-8 py-3.5 text-sm tracking-widest text-navy uppercase transition-colors hover:bg-gold-light"
              >
                <ShoppingBag size={16} /> Order Now
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 bg-navy px-8 py-3.5 text-sm tracking-widest text-white uppercase transition-colors hover:bg-navy-light"
              >
                <Mail size={16} /> Enquire Now
              </Link>
              <a
                href="tel:+911234567890"
                className="inline-flex items-center gap-2 border border-navy px-8 py-3.5 text-sm tracking-widest text-navy uppercase transition-colors hover:bg-navy hover:text-white"
              >
                <Phone size={16} /> Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-white py-16">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="mb-8 font-serif text-3xl text-navy">More from this Collection</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((c) => (
                <CarpetCard key={c.id} carpet={c} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}