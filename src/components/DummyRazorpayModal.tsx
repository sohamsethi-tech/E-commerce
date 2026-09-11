import { useState } from 'react'
import { X, Smartphone, CheckCircle2, Loader2, Phone, Mail } from 'lucide-react'
import { formatINR, RAZORPAY } from '../config/site'
import type { PaymentOptions } from '../lib/razorpay'

// Dummy checkout ke liye contact details — real UPI ID mil jaaye to "pa=" replace kar dena
const MERCHANT_PHONE = '+91 9729177599'
const MERCHANT_EMAIL = 'carpetsandbeyond2018@gmail.com'
const UPI_INTENT = `upi://pay?pa=9729177599@upi&pn=${encodeURIComponent('Soham Sethi')}&cu=INR`
const QR_CODE_URL = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(UPI_INTENT)}`

interface Props {
  options: PaymentOptions
  onClose: () => void
}

export default function DummyRazorpayModal({ options, onClose }: Props) {
  const [step, setStep] = useState<'scan' | 'processing' | 'done'>('scan')

  function simulatePay() {
    setStep('processing')
    setTimeout(() => {
      setStep('done')
      setTimeout(() => {
        options.onSuccess(`pay_dummy_${Date.now()}`)
        onClose()
      }, 1200)
    }, 1800)
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4">
      <div className="relative w-full max-w-md overflow-hidden bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between bg-[#072654] px-5 py-4 text-white">
          <div>
            <p className="text-xs text-white/60">Secured by</p>
            <p className="text-lg font-semibold tracking-wide">Razorpay</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white" aria-label="Close">
            <X size={22} />
          </button>
        </div>

        <div className="p-6">
          <p className="text-center text-sm text-charcoal/60">{RAZORPAY.merchantName}</p>
          <p className="mt-1 text-center font-serif text-3xl text-navy">
            {formatINR(options.amount)}
          </p>
          <p className="mt-1 text-center text-xs text-charcoal/50">{options.description}</p>

          {step === 'scan' && (
            <>
              <div className="mx-auto mt-6 flex h-56 w-56 items-center justify-center border-2 border-charcoal/10 bg-white p-2">
                <img
                  src={QR_CODE_URL}
                  alt="UPI QR Code"
                  className="h-full w-full object-contain"
                />
              </div>

              <div className="mt-6 flex items-center gap-3 rounded bg-cream px-4 py-3">
                <Smartphone size={18} className="shrink-0 text-gold" />
                <p className="text-xs text-charcoal/70">
                  Scan with any UPI app — PhonePe, Google Pay, Paytm, or BHIM
                </p>
              </div>

              <div className="mt-3 space-y-2 rounded bg-cream px-4 py-3">
                <div className="flex items-center gap-3">
                  <Phone size={16} className="shrink-0 text-gold" />
                  <p className="text-xs text-charcoal/70">{MERCHANT_PHONE}</p>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={16} className="shrink-0 text-gold" />
                  <p className="text-xs text-charcoal/70">{MERCHANT_EMAIL}</p>
                </div>
              </div>

              <p className="mt-4 text-center text-[11px] text-amber-600">
                Demo mode — no real payment. Click below to simulate success.
              </p>

              <button
                onClick={simulatePay}
                className="mt-4 w-full bg-[#072654] py-3.5 text-sm font-medium tracking-widest text-white uppercase hover:bg-navy-light"
              >
                Simulate Payment ✓
              </button>
            </>
          )}

          {step === 'processing' && (
            <div className="flex flex-col items-center py-12">
              <Loader2 size={40} className="animate-spin text-gold" />
              <p className="mt-4 text-sm text-charcoal/70">Processing payment...</p>
            </div>
          )}

          {step === 'done' && (
            <div className="flex flex-col items-center py-12">
              <CheckCircle2 size={48} className="text-green-600" />
              <p className="mt-4 font-serif text-xl text-navy">Payment Successful</p>
            </div>
          )}
        </div>

        <div className="border-t border-cream-dark bg-cream px-5 py-3 text-center text-[10px] text-charcoal/40">
          Order ID: {options.orderId}
        </div>
      </div>
    </div>
  )
}