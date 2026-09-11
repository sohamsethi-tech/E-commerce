export const SITE = {
  name: 'Carpets & Beyond by Dinesh Sethi',
  email: 'carpetsandbeyond2018@gmail.com',
  phone: '+91 9729177599',
  phoneTel: '+919729177599',
  address: 'Panipat, Haryana, India',
  advancePercent: 50,
} as const

export const RAZORPAY = {
  /** Set to false and add your key when ready */
  dummyMode: true,
  keyId: 'rzp_test_DUMMY_KEY',
  merchantName: 'Carpets & Beyond by Dinesh Sethi',
} as const

export function formatINR(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}
