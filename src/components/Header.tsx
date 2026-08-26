import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Menu, X, Search, Phone } from 'lucide-react'

const navLinks = [
  { to: '/collections', label: 'Collections' },
  { to: '/carpets', label: 'All Rugs' },
  { to: '/projects', label: 'Projects' },
  { to: '/custom-made', label: 'Custom Made' },
  { to: '/about', label: 'Our Story' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="sticky top-0 z-50 bg-cream/95 backdrop-blur-md border-b border-cream-dark">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
        <Link to="/" className="group">
          <span className="font-serif text-2xl tracking-wide text-navy transition-colors group-hover:text-gold">
            Heritage Loom
          </span>
          <span className="block text-[10px] tracking-[0.25em] text-charcoal/50 uppercase">
            Fine Carpets Since 1881
          </span>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm tracking-wide transition-colors hover:text-gold ${isActive ? 'text-gold' : 'text-charcoal/80'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-charcoal/70 transition-colors hover:text-gold"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          <a
            href="tel:+911234567890"
            className="hidden items-center gap-2 p-2 text-sm text-charcoal/70 transition-colors hover:text-gold sm:flex"
          >
            <Phone size={18} />
            <span className="hidden md:inline">+91 123 456 7890</span>
          </a>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2 text-charcoal lg:hidden"
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {searchOpen && (
        <div className="border-t border-cream-dark bg-cream px-6 py-4">
          <form action="/carpets" method="get" className="mx-auto flex max-w-2xl gap-3">
            <input
              type="text"
              name="q"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by name, colour, style..."
              className="flex-1 border border-cream-dark bg-white px-4 py-2.5 text-sm outline-none focus:border-gold"
              autoFocus
            />
            <Link
              to={`/carpets?q=${encodeURIComponent(searchQuery)}`}
              onClick={() => setSearchOpen(false)}
              className="bg-navy px-6 py-2.5 text-sm tracking-widest text-white uppercase hover:bg-navy-light"
            >
              Search
            </Link>
          </form>
        </div>
      )}

      {menuOpen && (
        <nav className="border-t border-cream-dark bg-cream px-6 py-6 lg:hidden">
          <div className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) =>
                  `text-lg font-serif transition-colors ${isActive ? 'text-gold' : 'text-navy'}`
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
