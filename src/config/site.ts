export const SITE = {
  name: 'Heritage Loom',
  email: 'sohamsethi515@gmail.com',
  phone: '+91 9896817490',
  phoneTel: '+919896817490',
  address: 'Bhadohi, Varanasi, Uttar Pradesh, India',
  advancePercent: 50,
} as const

export const RAZORPAY = {
  /** Set to false and add your key when ready */
  dummyMode: true,
  keyId: 'rzp_test_DUMMY_KEY',
  merchantName: 'Heritage Loom',
} as const

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
