import { Link } from 'react-router-dom'
import type { Collection } from '../types'

interface CollectionCardProps {
  collection: Collection
}

export default function CollectionCard({ collection }: CollectionCardProps) {
  return (
    <Link
      to={`/collections/${collection.slug}`}
      className="group relative block aspect-[3/4] overflow-hidden"
    >
      <img
        src={collection.image}
        alt={collection.name}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/20 to-transparent" />
      <div className="absolute right-0 bottom-0 left-0 p-6 text-white">
        <h3 className="font-serif text-2xl md:text-3xl">{collection.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-white/80">{collection.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 text-xs tracking-widest text-gold uppercase transition-transform group-hover:translate-x-1">
          Explore Collection →
        </span>
      </div>
    </Link>
  )
}
