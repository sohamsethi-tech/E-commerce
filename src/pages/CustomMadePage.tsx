import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { Pen, Palette, Hammer, Truck, Upload } from 'lucide-react'
import { apiFetch } from '../lib/api'

const steps = [
  {
    icon: Pen,
    title: 'Conceptualization',
    description:
      'Have a fleeting notion or a well-rounded idea? Our in-house design studio creates original, beautiful, bespoke designs tailored to your space.',
  },
  {
    icon: Palette,
    title: 'Development',
    description:
      'Following sound planning and estimation, only the finest materials are chosen — allowing extensive flexibility in design, colour, and pattern.',
  },
  {
    icon: Hammer,
    title: 'Creation',
    description:
      'Our expertise extends to hand knotted, hand tufted, and hand woven carpets. Master artisans bring your vision to life inch by inch.',
  },
  {
    icon: Truck,
    title: 'Installation',
    description:
      'For any given project, anywhere in the world, our highly experienced installation team finishes the job at the site.',
  },
]

export default function CustomMadePage() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [referenceImage, setReferenceImage] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'Custom Rug',
    dimensions: '',
    notes: '',
  })

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) return

    const ratio = window.devicePixelRatio || 1
    const width = 760
    const height = 420

    canvas.width = width * ratio
    canvas.height = height * ratio
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    context.scale(ratio, ratio)
    context.lineCap = 'round'
    context.lineJoin = 'round'
    context.lineWidth = 2.5
    context.strokeStyle = '#1f2d3d'
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, width, height)

    if (referenceImage) {
      const img = new Image()
      img.onload = () => {
        const padding = 30
        const maxWidth = width - padding * 2
        const maxHeight = height - padding * 2
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1)
        const drawWidth = img.width * scale
        const drawHeight = img.height * scale
        const x = (width - drawWidth) / 2
        const y = (height - drawHeight) / 2

        context.fillStyle = '#ffffff'
        context.fillRect(0, 0, width, height)
        context.drawImage(img, x, y, drawWidth, drawHeight)
      }
      img.src = referenceImage
    }
  }, [referenceImage])

  const getContext = () => canvasRef.current?.getContext('2d')

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    const context = getContext()
    if (!canvas || !context) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    context.beginPath()
    context.moveTo(x, y)
    setIsDrawing(true)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return

    const canvas = canvasRef.current
    const context = getContext()
    if (!canvas || !context) return

    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top

    context.lineTo(x, y)
    context.stroke()
  }

  const stopDrawing = () => setIsDrawing(false)

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const context = getContext()
    if (!canvas || !context) return

    context.clearRect(0, 0, canvas.width, canvas.height)
    context.fillStyle = '#ffffff'
    context.fillRect(0, 0, canvas.width, canvas.height)
    if (referenceImage) {
      const img = new Image()
      img.onload = () => {
        const width = canvas.width / (window.devicePixelRatio || 1)
        const height = canvas.height / (window.devicePixelRatio || 1)
        const padding = 30
        const maxWidth = width - padding * 2
        const maxHeight = height - padding * 2
        const scale = Math.min(maxWidth / img.width, maxHeight / img.height, 1)
        const drawWidth = img.width * scale
        const drawHeight = img.height * scale
        const x = (width - drawWidth) / 2
        const y = (height - drawHeight) / 2

        context.drawImage(img, x, y, drawWidth, drawHeight)
      }
      img.src = referenceImage
    }
  }

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const url = URL.createObjectURL(file)
    setReferenceImage(url)
  }

  const handleFormChange = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }))
  }

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setSubmitError('')

    const trimmedName = formData.name.trim()
    const nameParts = trimmedName ? trimmedName.split(/\s+/) : []
    const firstName = nameParts[0] || 'Customer'
    const lastName = nameParts.slice(1).join(' ') || 'Design'

    const sketchData = canvasRef.current?.toDataURL('image/png')
    const payload = {
      firstName,
      lastName,
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      enquiryType: `Custom Rug Design - ${formData.projectType}`,
      message: [
        'Custom Design Brief',
        `Project Type: ${formData.projectType}`,
        `Dimensions: ${formData.dimensions.trim() || 'Not specified'}`,
        `Client Name: ${trimmedName}`,
        `Email: ${formData.email.trim()}`,
        `Phone: ${formData.phone.trim()}`,
        '',
        'Design Notes:',
        formData.notes.trim(),
        '',
        sketchData ? `Sketch included as PNG image attachment in the admin submission.` : 'No sketch attached.',
      ].join('\n'),
      sketchData,
    }

    try {
      await apiFetch('/enquiries', {
        method: 'POST',
        body: JSON.stringify(payload),
      })
      setSubmitted(true)
      setFormData({
        name: '',
        email: '',
        phone: '',
        projectType: 'Custom Rug',
        dimensions: '',
        notes: '',
      })
      if (canvasRef.current) {
        const ctx = canvasRef.current.getContext('2d')
        if (ctx) {
          ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
          ctx.fillStyle = '#ffffff'
          ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
        }
      }
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit design brief. Please try again.')
    }
  }

  return (
    <div>
      <section className="relative h-[60vh] min-h-[450px]">
        <img
          src="/images/carpets/image-859b39f7-d9ad-4201-8601-9d15f4fe04ee.png"
          alt="Custom carpet"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="max-w-2xl px-6">
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Bespoke</p>
            <a
              href="#custom-board"
              className="mt-4 inline-block font-serif text-5xl text-white transition-colors hover:text-gold md:text-6xl"
            >
              Design Your Own Rug
            </a>
            <p className="mt-4 text-lg text-white/70">
              Custom made carpets, created not just for the space, but for its owner.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, i) => (
            <div key={step.title} className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center border border-gold text-gold">
                <step.icon size={28} />
              </div>
              <span className="mt-4 block text-xs tracking-widest text-gold uppercase">Step {i + 1}</span>
              <h3 className="mt-2 font-serif text-2xl text-navy">{step.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{step.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="custom-board" className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="luxury-panel p-6 md:p-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.3em] text-gold uppercase">Sketch Your Concept</p>
                <h2 className="mt-3 font-serif text-3xl text-navy md:text-4xl">Custom design board</h2>
              </div>
              <button
                type="button"
                onClick={clearCanvas}
                className="border border-gold px-4 py-2 text-xs tracking-widest text-gold uppercase transition-colors hover:bg-gold hover:text-navy"
              >
                Clear
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-2xl border border-cream-dark bg-white p-2">
              <canvas
                ref={canvasRef}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={stopDrawing}
                onPointerLeave={stopDrawing}
                className="w-full cursor-crosshair rounded-xl bg-white"
              />
            </div>

            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <label className="flex cursor-pointer items-center gap-3 text-sm text-charcoal/70">
                <span className="flex items-center gap-2 border border-gold px-4 py-2 text-gold">
                  <Upload size={16} />
                  Upload reference
                </span>
                <input type="file" accept="image/*" className="hidden" onChange={handleFileUpload} />
              </label>
              <p className="text-xs uppercase tracking-[0.2em] text-charcoal/50">Sketch or drop a reference image</p>
            </div>
          </div>

          <div className="bg-cream-dark p-6 md:p-8">
            <p className="text-xs tracking-[0.3em] text-gold uppercase">Tell us about your idea</p>
            <h2 className="mt-3 font-serif text-3xl text-navy">Custom rug brief</h2>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(event) => handleFormChange('name', event.target.value)}
                  required
                  className="border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={(event) => handleFormChange('phone', event.target.value)}
                  required
                  className="border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                />
              </div>

              <input
                type="email"
                placeholder="Email address"
                value={formData.email}
                onChange={(event) => handleFormChange('email', event.target.value)}
                required
                className="w-full border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
              />

              <div className="grid gap-4 sm:grid-cols-2">
                <select
                  value={formData.projectType}
                  onChange={(event) => handleFormChange('projectType', event.target.value)}
                  className="border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                >
                  <option value="Custom Rug">Custom Rug</option>
                  <option value="Runner">Runner</option>
                  <option value="Round Carpet">Round Carpet</option>
                  <option value="Hospitality Installation">Hospitality Installation</option>
                </select>
                <input
                  type="text"
                  placeholder="Dimensions / room size"
                  value={formData.dimensions}
                  onChange={(event) => handleFormChange('dimensions', event.target.value)}
                  className="border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
                />
              </div>

              <textarea
                rows={5}
                placeholder="Describe the pattern, colours, texture, border style, and mood you want. You can also mention how the room is used or which reference image inspired you."
                value={formData.notes}
                onChange={(event) => handleFormChange('notes', event.target.value)}
                required
                className="w-full border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
              />

              {submitted && (
                <div className="border border-gold bg-white px-4 py-3 text-sm text-navy">
                  Your custom rug brief has been noted. Our design team will review your sketch and get back to you shortly.
                </div>
              )}

              {submitError && (
                <div className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {submitError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-navy px-8 py-3.5 text-sm tracking-widest text-white uppercase transition-colors hover:bg-navy-light"
              >
                Submit design brief
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-2">
        <div className="relative min-h-[400px]">
          <img
            src="/images/carpets/image-bbb69fe9-1ecf-476b-967e-5ab195f99c70.png"
            alt="Custom installation"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center bg-cream-dark px-8 py-16 md:px-16">
          <h2 className="font-serif text-3xl text-navy">Why Custom?</h2>
          <ul className="mt-6 space-y-4 text-charcoal/70">
            <li className="flex gap-3">
              <span className="text-gold">—</span>
              Every dimension, shape, and pattern tailored to your architecture
            </li>
            <li className="flex gap-3">
              <span className="text-gold">—</span>
              In-house design studio with 140+ years of heritage
            </li>
            <li className="flex gap-3">
              <span className="text-gold">—</span>
              Projects from intimate residences to 2,400 sq.m installations
            </li>
            <li className="flex gap-3">
              <span className="text-gold">—</span>
              Worldwide installation and aftercare support
            </li>
          </ul>
          <Link
            to="/contact"
            className="mt-8 inline-block w-fit bg-navy px-8 py-3.5 text-sm tracking-widest text-white uppercase hover:bg-navy-light"
          >
            Start Your Project
          </Link>
        </div>
      </section>
    </div>
  )
}
