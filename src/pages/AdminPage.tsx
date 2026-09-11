import { useEffect, useState, type FormEvent } from 'react'
import { apiFetch } from '../lib/api'

interface AdminEntry {
  _id?: string
  id?: string
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
  enquiryType?: string
  message?: string
  createdAt?: string
  orderId?: string
  customerName?: string
  customerEmail?: string
  customerPhone?: string
  shippingAddress?: string
  notes?: string
  totalAmount?: number
  advanceAmount?: number
  status?: string
}

export default function AdminPage() {
  const [enquiries, setEnquiries] = useState<AdminEntry[]>([])
  const [orders, setOrders] = useState<AdminEntry[]>([])
  const [adminToken, setAdminToken] = useState(() => sessionStorage.getItem('adminToken') || '')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function loadData() {
      try {
        const response = await apiFetch<{ enquiries: AdminEntry[]; orders: AdminEntry[] }>('/admin', {
          headers: { 'x-admin-token': adminToken },
        })
        setEnquiries(response.enquiries || [])
        setOrders(response.orders || [])
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load admin data.')
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [adminToken])

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    sessionStorage.setItem('adminToken', adminToken)
    setLoading(true)
    setError('')
  }

  if (!adminToken) {
    return (
      <div className="mx-auto max-w-md px-6 py-20">
        <h1 className="font-serif text-4xl text-navy">Admin Login</h1>
        <p className="mt-3 text-sm text-charcoal/60">Enter the admin token configured on the backend.</p>
        <form onSubmit={handleLogin} className="mt-8 flex gap-3">
          <input
            type="password"
            value={adminToken}
            onChange={(event) => setAdminToken(event.target.value)}
            placeholder="Admin token"
            required
            className="min-w-0 flex-1 border border-cream-dark bg-white px-4 py-3 text-sm outline-none focus:border-gold"
          />
          <button type="submit" className="bg-navy px-5 py-3 text-sm text-white">Open</button>
        </form>
      </div>
    )
  }

  if (loading) {
    return <div className="mx-auto max-w-7xl px-6 py-20">Loading admin data...</div>
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
      <h1 className="font-serif text-5xl text-navy">Admin Dashboard</h1>
      <p className="mt-3 text-charcoal/60">Manage received enquiries and placed orders.</p>

      {error && <div className="mt-8 rounded border border-red-200 bg-red-50 p-4 text-sm text-red-700">{error}</div>}

      <section className="mt-12">
        <h2 className="mb-6 font-serif text-3xl text-navy">Enquiries</h2>
        {enquiries.length === 0 ? (
          <p className="text-charcoal/60">No enquiries yet.</p>
        ) : (
          <div className="space-y-4">
            {enquiries.map((entry, index) => (
              <div key={`${entry._id || entry.email || index}`} className="rounded-2xl border border-cream-dark bg-white p-5">
                <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                  <div>
                    <p className="font-serif text-2xl text-navy">
                      {entry.firstName || 'Unknown'} {entry.lastName || ''}
                    </p>
                    <p className="text-sm text-charcoal/60">{entry.enquiryType || 'General Enquiry'}</p>
                  </div>
                  <span className="text-xs tracking-[0.2em] text-gold uppercase">{new Date(entry.createdAt || Date.now()).toLocaleDateString()}</span>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-charcoal/70 md:grid-cols-2">
                  <p><strong>Email:</strong> {entry.email || 'N/A'}</p>
                  <p><strong>Phone:</strong> {entry.phone || 'N/A'}</p>
                </div>
                <p className="mt-4 whitespace-pre-wrap text-sm leading-relaxed text-charcoal/70">{entry.message || 'No message provided.'}</p>
              </div>
            ))}
          </div>
        )}
      </section>

      <section className="mt-16">
        <h2 className="mb-6 font-serif text-3xl text-navy">Orders</h2>
        {orders.length === 0 ? (
          <p className="text-charcoal/60">No orders yet.</p>
        ) : (
          <div className="space-y-4">
            {orders.map((entry, index) => (
              <div key={`${entry._id || entry.orderId || index}`} className="rounded-2xl border border-cream-dark bg-white p-5">
                <div className="flex flex-col gap-2 md:flex-row md:justify-between">
                  <div>
                    <p className="font-serif text-2xl text-navy">{entry.orderId || 'Order ID missing'}</p>
                    <p className="text-sm text-charcoal/60">{entry.customerName || 'Customer name missing'}</p>
                  </div>
                  <span className="text-xs tracking-[0.2em] text-gold uppercase">{entry.status || 'pending_payment'}</span>
                </div>
                <div className="mt-4 grid gap-2 text-sm text-charcoal/70 md:grid-cols-2">
                  <p><strong>Email:</strong> {entry.customerEmail || 'N/A'}</p>
                  <p><strong>Phone:</strong> {entry.customerPhone || 'N/A'}</p>
                  <p><strong>Total:</strong> ₹{entry.totalAmount || 0}</p>
                  <p><strong>Advance:</strong> ₹{entry.advanceAmount || 0}</p>
                </div>
                <p className="mt-4 text-sm text-charcoal/70"><strong>Address:</strong> {entry.shippingAddress || 'N/A'}</p>
                <p className="mt-2 text-sm text-charcoal/70"><strong>Notes:</strong> {entry.notes || 'None'}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
