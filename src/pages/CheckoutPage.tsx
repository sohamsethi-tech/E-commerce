import { useState, type FormEvent } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ShieldCheck } from 'lucide-react'
import DummyRazorpayModal from '../components/DummyRazorpayModal'
import { getCarpetBySlug } from '../data/carpets'
import { SITE, formatINR } from '../config/site'
import { generateOrderId, saveOrder } from '../lib/orders'
import { initiatePayment, getPaymentLabel, getAdvanceNote } from '../lib/razorpay'
import { apiFetch } from '../lib/api'
import type { PaymentOptions } from '../lib/razorpay'
import type { Order } from '../types'

export default function CheckoutPage() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const slug = params.get('carpet') ?? ''
  const carpet = getCarpetBySlug(slug)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [notes, setNotes] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [error, setError] = useState('')
  const [paymentOptions, setPaymentOptions] = useState<PaymentOptions | null>(null)

  if (!carpet) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center">
        <h1 className="font-serif text-3xl text-navy">Select a carpet to order</h1>
        <Link to="/carpets" className="mt-4 text-gold hover:underline">Browse All Rugs →</Link>
      </div>
    )
  }

  const totalAmount = carpet.basePrice * quantity
  const advanceAmount = Math.round(totalAmount * (SITE.advancePercent / 100))
  const balanceAmount = totalAmount - advanceAmount

  async function submitOrderToBackend(order: Order) {
    await apiFetch('/orders', {
      method: 'POST',
      body: JSON.stringify({
        ...order,
        orderId: order.id,
        items: order.items,
      }),
    })
  }

  function handlePlaceOrder(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!name.trim() || !email.trim() || !phone.trim() || !address.trim()) {
      setError('Please fill in all required fields.')
      return
    }

    const orderId = generateOrderId()
    const orderedCarpet = carpet! // already guarded by the `if (!carpet)` early return above

    const opts: PaymentOptions = {
      amount: advanceAmount,
      orderId,
      customerName: name.trim(),
      customerEmail: email.trim(),
      customerPhone: phone.trim(),
      description: `${SITE.advancePercent}% advance — ${orderedCarpet.name}`,
      onSuccess: async (paymentId) => {
        const order: Order = {
          id: orderId,
          items: [{
            carpetId: orderedCarpet.id,
            carpetName: orderedCarpet.name,
            carpetSlug: orderedCarpet.slug,
            carpetImage: orderedCarpet.image,
            quantity,
            unitPrice: orderedCarpet.basePrice,
          }],
          customerName: name.trim(),
          customerEmail: email.trim(),
          customerPhone: phone.trim(),
          shippingAddress: address.trim(),
          notes: notes.trim(),
          totalAmount,
          advanceAmount,
          advancePaid: true,
          paymentId,
          status: 'confirmed',
          createdAt: new Date().toISOString(),
        }

        try {
          await submitOrderToBackend(order)
        } catch (err) {
          setError(err instanceof Error ? err.message : 'Unable to submit order. Please try again.')
          return
        }

        saveOrder(order)
        navigate(`/order-confirmation/${orderId}`)
      },
      onFailure: (msg) => setError(msg),
    }

    initiatePayment(opts, setPaymentOptions)
  }

  return (
    <div>
      {paymentOptions && (
        <DummyRazorpayModal
          options={paymentOptions}
          onClose={() => setPaymentOptions(null)}
        />
      )}

      <section className="bg-navy py-12 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <Link to={`/carpets/${carpet.slug}`} className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-gold">
            <ArrowLeft size={16} /> Back to Product
          </Link>
          <h1 className="mt-4 font-serif text-4xl">Place Your Order</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-5">
          {/* Form */}
          <form onSubmit={handlePlaceOrder} className="lg:col-span-3 space-y-5">
            <h2 className="font-serif text-2xl text-navy">Delivery Details</h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <input
                type="text"
                placeholder="Full Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
              />
              <input
                type="tel"
                placeholder="Phone *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
              />
            </div>
            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
            />
            <textarea
              placeholder="Delivery Address *"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              rows={3}
              className="w-full border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
            />
            <textarea
              placeholder="Special instructions (dimensions, custom size, etc.)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              className="w-full border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
            />

            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}

            <div className="flex items-start gap-3 rounded bg-cream-dark p-4">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-gold" />
              <p className="text-xs text-charcoal/70">{getAdvanceNote()} Balance due before delivery.</p>
            </div>

            <button
              type="submit"
              className="w-full bg-navy py-4 text-sm tracking-widest text-white uppercase transition-colors hover:bg-navy-light sm:w-auto sm:px-12"
            >
              {getPaymentLabel()} — {formatINR(advanceAmount)}
            </button>
          </form>

          {/* Summary */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 border border-cream-dark bg-white p-6">
              <h2 className="font-serif text-xl text-navy">Order Summary</h2>

              <div className="mt-4 flex gap-4">
                <img src={carpet.image} alt={carpet.name} className="h-24 w-24 object-cover" />
                <div>
                  <p className="font-serif text-lg text-navy">{carpet.name}</p>
                  <p className="text-sm text-charcoal/60 capitalize">{carpet.quality.replace('-', ' ')}</p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-3">
                <label className="text-sm text-charcoal/60">Qty:</label>
                <select
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="border border-cream-dark px-3 py-1.5 text-sm outline-none"
                >
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>

              <div className="mt-6 space-y-3 border-t border-cream-dark pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Unit Price</span>
                  <span>{formatINR(carpet.basePrice)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-charcoal/60">Total</span>
                  <span className="font-medium">{formatINR(totalAmount)}</span>
                </div>
                <div className="flex justify-between text-gold">
                  <span>{SITE.advancePercent}% Advance (now)</span>
                  <span className="font-semibold">{formatINR(advanceAmount)}</span>
                </div>
                <div className="flex justify-between text-charcoal/50">
                  <span>Balance (on delivery)</span>
                  <span>{formatINR(balanceAmount)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}