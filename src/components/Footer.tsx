import { Link } from 'react-router-dom'
import { Mail, Share2 } from 'lucide-react'

const socialLinks = [
  { label: 'Instagram', href: '#' },
  { label: 'Facebook', href: '#' },
  { label: 'YouTube', href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-navy text-white">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h3 className="font-serif text-2xl text-gold">Carpets &amp; Beyond</h3>
            <p className="mt-2 text-xs tracking-[0.22em] text-gold uppercase">by Dinesh Sethi</p>
            <p className="mt-4 text-sm leading-relaxed text-white/60">
              Luxury handmade carpets, hospitality flooring, and bespoke rug artistry designed for grand spaces and unforgettable interiors.
            </p>
            <div className="mt-6 flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  title={link.label}
                  aria-label={link.label}
                  className="flex h-9 w-9 items-center justify-center border border-white/20 text-xs transition-colors hover:border-gold hover:text-gold"
                >
                  <Share2 size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-xs tracking-[0.2em] text-gold uppercase">Collections</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/collections/traditional" className="hover:text-gold">Traditional</Link></li>
              <li><Link to="/collections/contemporary" className="hover:text-gold">Contemporary</Link></li>
              <li><Link to="/collections/persian-heritage" className="hover:text-gold">Persian Heritage</Link></li>
              <li><Link to="/collections/hospitality" className="hover:text-gold">Hospitality</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs tracking-[0.2em] text-gold uppercase">Customer Service</h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li><Link to="/custom-made" className="hover:text-gold">Custom Made</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Book Appointment</Link></li>
              <li><Link to="/contact" className="hover:text-gold">Contact Us</Link></li>
              <li><Link to="/about" className="hover:text-gold">Our Showrooms</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-xs tracking-[0.2em] text-gold uppercase">Newsletter</h4>
            <p className="text-sm text-white/60">Stay updated with our latest collections and trends.</p>
            <form className="mt-4 flex" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-white/10 px-4 py-2.5 text-sm text-white placeholder:text-white/40 outline-none focus:bg-white/15"
              />
              <button
                type="submit"
                className="bg-gold px-4 py-2.5 text-navy transition-colors hover:bg-gold-light"
              >
                <Mail size={18} />
              </button>
            </form>
          </div>
        </div>

        <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/40">
          © {new Date().getFullYear()} Carpets & Beyond. All rights reserved. Crafted with care in Panipat, Haryana, India.
        </div>
      </div>
    </footer>
  )
}
