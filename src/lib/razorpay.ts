import { RAZORPAY, SITE } from '../config/site'
import { apiFetch } from './api'

export interface PaymentOptions {
  amount: number
  orderId: string
  customerName: string
  customerEmail: string
  customerPhone: string
  description: string
  onSuccess: (payment: { paymentId: string; razorpayOrderId: string; signature: string }) => void
  onFailure: (message: string) => void
}

declare global {
  interface Window {
    Razorpay?: new (options: Record<string, unknown>) => { open: () => void }
  }
}

function loadRazorpayScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.Razorpay) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = 'https://checkout.razorpay.com/v1/checkout.js'
    script.onload = () => resolve()
    script.onerror = () => reject(new Error('Failed to load Razorpay'))
    document.body.appendChild(script)
  })
}

/** Opens dummy modal via callback — real Razorpay when dummyMode is false */
export async function initiatePayment(
  options: PaymentOptions,
  openDummyModal: (opts: PaymentOptions) => void,
): Promise<void> {
  if (RAZORPAY.dummyMode) {
    openDummyModal(options)
    return
  }

  try {
    const paymentOrder = await apiFetch<{ orderId: string }>('/payments/create-order', {
      method: 'POST',
      body: JSON.stringify({ amount: options.amount, receipt: options.orderId }),
    })

    await loadRazorpayScript()
    if (!window.Razorpay) throw new Error('Razorpay unavailable')

    const rzp = new window.Razorpay({
      key: RAZORPAY.keyId,
      amount: options.amount * 100,
      currency: 'INR',
      name: RAZORPAY.merchantName,
      description: options.description,
      order_id: paymentOrder.orderId,
      prefill: {
        name: options.customerName,
        email: options.customerEmail,
        contact: options.customerPhone,
      },
      theme: { color: '#1a2744' },
      handler: (response: { razorpay_payment_id: string; razorpay_order_id: string; razorpay_signature: string }) => {
        options.onSuccess({
          paymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          signature: response.razorpay_signature,
        })
      },
      modal: {
        ondismiss: () => options.onFailure('Payment cancelled'),
      },
    })
    rzp.open()
  } catch {
    options.onFailure('Payment could not be initiated. Please try again.')
  }
}

export function getPaymentLabel(): string {
  return RAZORPAY.dummyMode
    ? 'Pay via Razorpay (Demo Scanner)'
    : 'Pay via Razorpay'
}

export function getAdvanceNote(): string {
  return `${SITE.advancePercent}% advance required at the time of order placement.`
}
