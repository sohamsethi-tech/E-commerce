import { Link } from 'react-router-dom'
import { useParams } from 'react-router-dom'
import CarpetCard from '../components/CarpetCard'
import { getCollectionBySlug, getCarpetsByCollection } from '../data/carpets'

export default function CollectionDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const collection = getCollectionBySlug(slug ?? '')
  const carpets = collection ? getCarpetsByCollection(collection.id) : []

  if (!collection) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="font-serif text-3xl text-navy">Collection Not Found</h1>
        <Link to="/collections" className="mt-4 text-gold hover:underline">← Back to Collections</Link>
      </div>
    )
  }

  return (
    <div>
      <section className="relative h-[50vh] min-h-[400px]">
        <img src={collection.image} alt={collection.name} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-navy/50" />
        <div className="absolute inset-0 flex items-end">
          <div className="mx-auto w-full max-w-7xl px-6 pb-12 lg:px-8">
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Collection</p>
            <h1 className="mt-2 font-serif text-5xl text-white">{collection.name}</h1>
            <p className="mt-4 max-w-2xl text-white/80">{collection.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <p className="mb-8 text-sm text-charcoal/60">{carpets.length} designs in this collection</p>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {carpets.map((carpet) => (
            <CarpetCard key={carpet.id} carpet={carpet} />
          ))}
        </div>
      </section>
    </div>
  )
}
