import { Link, useParams } from 'react-router-dom'
import { CheckCircle2 } from 'lucide-react'
import { getOrders } from '../lib/orders'
import { formatINR } from '../config/site'
import type { OrderItem } from '../types'

export default function OrderConfirmationPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const order = orderId ? getOrders().find((o) => o.id === orderId) : undefined

  if (!order) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
        <h1 className="font-serif text-3xl text-navy">Order Not Found</h1>
        <p className="mt-2 text-charcoal/60">We couldn't locate this order.</p>
        <Link to="/carpets" className="mt-4 text-gold hover:underline">← Browse All Rugs</Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center lg:px-8">
      <CheckCircle2 size={56} className="mx-auto text-green-600" />
      <h1 className="mt-6 font-serif text-4xl text-navy">Order Confirmed</h1>
      <p className="mt-3 text-charcoal/60">
        Thank you, {order.customerName}. Your advance payment has been received.
      </p>

      <div className="mt-10 border border-cream-dark bg-white p-6 text-left">
        <div className="flex justify-between border-b border-cream-dark pb-4">
          <span className="text-sm text-charcoal/60">Order ID</span>
          <span className="text-sm font-medium text-navy">{order.id}</span>
        </div>

        {order.items.map((item: OrderItem) => (
          <div key={item.carpetId} className="flex gap-4 border-b border-cream-dark py-4">
            <img src={item.carpetImage} alt={item.carpetName} className="h-16 w-16 object-cover" />
            <div className="flex-1">
              <p className="font-serif text-navy">{item.carpetName}</p>
              <p className="text-xs text-charcoal/50">Qty: {item.quantity}</p>
            </div>
          </div>
        ))}

        <div className="space-y-2 pt-4 text-sm">
          <div className="flex justify-between">
            <span className="text-charcoal/60">Total Amount</span>
            <span>{formatINR(order.totalAmount)}</span>
          </div>
          <div className="flex justify-between text-gold">
            <span>Advance Paid</span>
            <span className="font-semibold">{formatINR(order.advanceAmount)}</span>
          </div>
          <div className="flex justify-between text-charcoal/50">
            <span>Balance (on delivery)</span>
            <span>{formatINR(order.totalAmount - order.advanceAmount)}</span>
          </div>
        </div>
      </div>

      <Link
        to="/carpets"
        className="mt-10 inline-block bg-navy px-8 py-3.5 text-sm tracking-widest text-white uppercase hover:bg-navy-light"
      >
        Continue Shopping
      </Link>
    </div>
  )
}