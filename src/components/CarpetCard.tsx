import { Link } from 'react-router-dom'
import type { Carpet } from '../types'

interface CarpetCardProps {
  carpet: Carpet
  variant?: 'default' | 'large'
}

export default function CarpetCard({ carpet, variant = 'default' }: CarpetCardProps) {
  return (
    <Link
      to={`/carpets/${carpet.slug}`}
      className="group block overflow-hidden bg-white transition-shadow duration-300 hover:shadow-xl"
    >
      <div className={`relative overflow-hidden ${variant === 'large' ? 'aspect-[4/3]' : 'aspect-[3/4]'}`}>
        <img
          src={carpet.image}
          alt={carpet.name}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-navy/0 transition-colors duration-300 group-hover:bg-navy/10" />
        {carpet.newArrival && (
          <span className="absolute top-4 left-4 bg-gold px-3 py-1 text-xs font-medium tracking-widest text-navy uppercase">
            New
          </span>
        )}
      </div>
      <div className="p-5">
        <p className="mb-1 text-xs tracking-widest text-gold uppercase">{carpet.style}</p>
        <h3 className="font-serif text-xl text-navy transition-colors group-hover:text-gold">{carpet.name}</h3>
        <p className="mt-2 line-clamp-2 text-sm text-charcoal/70">{carpet.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {carpet.colors.slice(0, 3).map((color) => (
            <span key={color} className="rounded-full bg-cream-dark px-2.5 py-0.5 text-xs text-charcoal/60">
              {color}
            </span>
          ))}
        </div>
      </div>
    </Link>
  )
}
