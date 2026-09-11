import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, X, Search, Phone } from 'lucide-react'

const navLinks = [
  { to: '/collections', label: 'Collections' },
  { to: '/carpets', label: 'All Rugs' },
  { to: '/projects', label: 'Projects' },
  { to: '/custom-made', label: 'Custom Made' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
  { to: '/admin', label: 'Admin' },
]

export default function Header() {
  const headerRef = useRef<HTMLElement>(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const header = headerRef.current
    if (!header) return

    const updateHeaderHeight = () => {
      document.documentElement.style.setProperty('--navbar-height', `${header.getBoundingClientRect().height}px`)
    }

    updateHeaderHeight()
    const resizeObserver = new ResizeObserver(updateHeaderHeight)
    resizeObserver.observe(header)

    return () => {
      resizeObserver.disconnect()
      document.documentElement.style.removeProperty('--navbar-height')
    }
  }, [])

  const surfaceClass =
    isHome && !scrolled
      ? 'border-transparent bg-transparent'
      : 'border-[#eadfce] bg-[#f8f4ee]/90 shadow-[0_10px_30px_rgba(26,39,68,0.08)] backdrop-blur-md'

  const textClass = isHome && !scrolled ? 'text-white/85' : 'text-charcoal/80'
  const brandTextClass = isHome && !scrolled ? 'text-white' : 'text-navy'
  const iconClass = isHome && !scrolled ? 'text-white/80 hover:text-gold' : 'text-charcoal/70 hover:text-gold'

  return (
    <header ref={headerRef} className={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-500 ${surfaceClass}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="group shrink-0 whitespace-nowrap">
          <span className={`font-serif text-3xl tracking-wide transition-colors group-hover:text-gold ${brandTextClass}`}>
            Carpets &amp; Beyond
          </span>
          <span className={`block text-[10px] tracking-[0.25em] uppercase ${isHome && !scrolled ? 'text-white/60' : 'text-charcoal/50'}`}>
            by Dinesh Sethi
          </span>
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `whitespace-nowrap text-xs tracking-[0.18em] uppercase transition-colors hover:text-gold ${isActive ? 'text-gold' : textClass}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className={`p-2 transition-colors ${iconClass}`}
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <a
            href="tel:+919729177599"
            className={`hidden items-center gap-2 p-2 text-sm transition-colors sm:flex ${iconClass}`}
          >
            <Phone size={18} />
            <span className="hidden md:inline">+91 9729177599</span>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`p-2 xl:hidden ${isHome && !scrolled ? 'text-white' : 'text-charcoal'}`}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className={`border-t px-6 py-4 ${isHome && !scrolled ? 'border-white/10 bg-[#0f1724]/80' : 'border-cream-dark bg-cream'}`}>
          <form action="/carpets" method="get" className="mx-auto flex max-w-2xl gap-3">
            <input
              type="text"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, colour, style..."
              className={`flex-1 border px-4 py-2.5 text-sm outline-none ${
                isHome && !scrolled ? 'border-white/10 bg-white/5 text-white placeholder:text-white/50' : 'border-cream-dark bg-white text-charcoal placeholder:text-charcoal/40'
              }`}
              autoFocus
            />
            <Link
              to={`/carpets?q=${encodeURIComponent(searchQuery)}`}
              onClick={() => setSearchOpen(false)}
              className="bg-gold px-6 py-2.5 text-sm tracking-widest text-navy uppercase hover:bg-gold-light"
            >
              Search
            </Link>
          </form>
        </div>
      )}

      {menuOpen && (
        <nav className={`border-t px-6 py-6 lg:hidden ${isHome && !scrolled ? 'border-white/10 bg-[#0f1724]/90' : 'border-cream-dark bg-cream'}`}>
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-serif transition-colors ${isActive ? 'text-gold' : isHome && !scrolled ? 'text-white' : 'text-navy'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}
