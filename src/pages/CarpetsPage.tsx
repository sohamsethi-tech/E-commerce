import { useMemo } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import CarpetCard from '../components/CarpetCard'
import { carpets, searchCarpets, collections } from '../data/carpets'
import type { CarpetStyle } from '../types'

const styles: { value: CarpetStyle | 'all'; label: string }[] = [
  { value: 'all', label: 'All Styles' },
  { value: 'traditional', label: 'Traditional' },
  { value: 'contemporary', label: 'Contemporary' },
  { value: 'modern', label: 'Modern' },
]

export default function CarpetsPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const query = searchParams.get('q') ?? ''
  const styleFilter = (searchParams.get('style') ?? 'all') as CarpetStyle | 'all'
  const collectionFilter = searchParams.get('collection') ?? 'all'

  const filtered = useMemo(() => {
    let result = query ? searchCarpets(query) : [...carpets]
    if (styleFilter !== 'all') {
      result = result.filter((c) => c.style === styleFilter)
    }
    if (collectionFilter !== 'all') {
      result = result.filter((c) => c.collectionId === collectionFilter)
    }
    return result
  }, [query, styleFilter, collectionFilter])

  function updateFilter(key: string, value: string) {
    const params = new URLSearchParams(searchParams)
    if (value === 'all' || value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    setSearchParams(params)
  }

  return (
    <div>
      <section className="bg-navy py-16 text-center text-white">
        <h1 className="font-serif text-5xl">All Rugs</h1>
        <p className="mt-4 text-white/60">Browse our complete catalogue of handmade carpets</p>
      </section>

      <section className="sticky top-[73px] z-40 border-b border-cream-dark bg-cream/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-6 py-4 lg:px-8">
          <div className="flex flex-wrap gap-2">
            {styles.map((s) => (
              <button
                key={s.value}
                onClick={() => updateFilter('style', s.value)}
                className={`px-4 py-1.5 text-xs tracking-widest uppercase transition-colors ${
                  styleFilter === s.value
                    ? 'bg-navy text-white'
                    : 'bg-white text-charcoal/70 hover:text-navy'
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
          <select
            value={collectionFilter}
            onChange={(e) => updateFilter('collection', e.target.value)}
            className="ml-auto border border-cream-dark bg-white px-4 py-1.5 text-xs tracking-wide text-charcoal outline-none"
          >
            <option value="all">All Collections</option>
            {collections.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        {query && (
          <p className="mb-6 text-sm text-charcoal/60">
            Showing results for &ldquo;{query}&rdquo; — {filtered.length} found
          </p>
        )}
        {filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="font-serif text-2xl text-navy">No carpets found</p>
            <Link to="/carpets" className="mt-4 inline-block text-gold hover:underline">
              Clear filters
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((carpet) => (
              <CarpetCard key={carpet.id} carpet={carpet} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
