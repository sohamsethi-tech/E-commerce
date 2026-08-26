import { useState, type FormEvent } from 'react'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div>
      <section className="bg-navy py-16 text-center text-white">
        <h1 className="font-serif text-5xl">Contact Us</h1>
        <p className="mt-4 text-white/60">Our team is happy to assist you with any query.</p>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2">
          {/* Form */}
          <div>
            <h2 className="font-serif text-3xl text-navy">Send an Enquiry</h2>
            <p className="mt-2 text-sm text-charcoal/60">
              For custom projects, appointments, or general queries.
            </p>

            {submitted ? (
              <div className="mt-8 border border-gold bg-cream-dark p-8 text-center">
                <p className="font-serif text-2xl text-navy">Thank You</p>
                <p className="mt-2 text-charcoal/60">We&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 sm:grid-cols-2">
                  <input
                    type="text"
                    placeholder="First Name"
                    required
                    className="border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    required
                    className="border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email Address"
                  required
                  className="w-full border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                />
                <select className="w-full border border-cream-dark bg-white px-4 py-3 text-sm text-charcoal/70 outline-none focus:border-gold">
                  <option value="">Enquiry Type</option>
                  <option value="custom">Custom Made Project</option>
                  <option value="appointment">Book Appointment</option>
                  <option value="catalogue">Request Catalogue</option>
                  <option value="general">General Enquiry</option>
                </select>
                <textarea
                  placeholder="Tell us about your project..."
                  rows={5}
                  required
                  className="w-full border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                />
                <button
                  type="submit"
                  className="w-full bg-navy py-3.5 text-sm tracking-widest text-white uppercase transition-colors hover:bg-navy-light sm:w-auto sm:px-12"
                >
                  Send Enquiry
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div>
            <h2 className="font-serif text-3xl text-navy">Get in Touch</h2>
            <div className="mt-8 space-y-8">
              {[
                { icon: Phone, label: 'Phone', value: '+91 123 456 7890' },
                { icon: Mail, label: 'Email', value: 'hello@heritageloom.com' },
                { icon: MapPin, label: 'Head Office', value: 'Bhadohi, Varanasi, Uttar Pradesh, India' },
                { icon: Clock, label: 'Hours', value: 'Mon – Sat, 10:00 AM – 7:00 PM IST' },
              ].map((item) => (
                <div key={item.label} className="flex gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center border border-gold text-gold">
                    <item.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs tracking-widest text-charcoal/40 uppercase">{item.label}</p>
                    <p className="mt-1 text-navy">{item.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 overflow-hidden">
              <img
                src="/images/carpets/image-22921b40-f969-4aca-8e84-2a6419eae46f.png"
                alt="Heritage Loom showroom"
                className="w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
