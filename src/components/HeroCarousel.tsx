import { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { getFeaturedCarpets } from '../data/carpets'

export default function HeroCarousel() {
  const slides = getFeaturedCarpets().slice(0, 5)
  const [current, setCurrent] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const goTo = useCallback(
    (index: number) => {
      if (isAnimating) return
      setIsAnimating(true)
      setCurrent((index + slides.length) % slides.length)
      setTimeout(() => setIsAnimating(false), 600)
    },
    [isAnimating, slides.length],
  )

  useEffect(() => {
    const timer = setInterval(() => goTo(current + 1), 6000)
    return () => clearInterval(timer)
  }, [current, goTo])

  const slide = slides[current]

  return (
    <section className="relative h-[85vh] min-h-[600px] overflow-hidden bg-navy">
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-700 ${i === current ? 'opacity-100' : 'opacity-0'}`}
        >
          <img src={s.image} alt={s.name} className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/30 to-transparent" />
        </div>
      ))}

      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-xl animate-slide-up">
            <p className="mb-4 text-xs tracking-[0.3em] text-gold uppercase">Fine Handmade Carpets</p>
            <h1 className="font-serif text-5xl leading-tight text-white md:text-6xl lg:text-7xl">
              {slide.name}
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-white/80">{slide.description}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                to={`/carpets/${slide.slug}`}
                className="bg-gold px-8 py-3.5 text-sm font-medium tracking-widest text-navy uppercase transition-colors hover:bg-gold-light"
              >
                View Design
              </Link>
              <Link
                to="/collections"
                className="border border-white/40 px-8 py-3.5 text-sm font-medium tracking-widest text-white uppercase transition-colors hover:border-white hover:bg-white/10"
              >
                All Collections
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute right-6 bottom-8 z-10 flex items-center gap-3 md:right-8">
        <button
          onClick={() => goTo(current - 1)}
          className="flex h-10 w-10 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-1 transition-all duration-300 ${i === current ? 'w-8 bg-gold' : 'w-4 bg-white/40'}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
        <button
          onClick={() => goTo(current + 1)}
          className="flex h-10 w-10 items-center justify-center border border-white/30 text-white transition-colors hover:border-white hover:bg-white/10"
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </section>
  )
}
