const crypto = require('crypto')
const express = require('express')
const Razorpay = require('razorpay')

const router = express.Router()

function getRazorpay() {
  const keyId = process.env.RAZORPAY_KEY_ID
  const keySecret = process.env.RAZORPAY_KEY_SECRET

  if (!keyId || !keySecret) {
    throw new Error('Razorpay server credentials are not configured.')
  }

  return new Razorpay({ key_id: keyId, key_secret: keySecret })
}

router.post('/create-order', async (req, res) => {
  try {
    const { amount, receipt } = req.body

    if (!Number.isInteger(amount) || amount <= 0 || !receipt) {
      return res.status(400).json({ message: 'A valid payment amount and receipt are required.' })
    }

    const order = await getRazorpay().orders.create({
      amount: amount * 100,
      currency: 'INR',
      receipt,
    })

    return res.status(201).json({ orderId: order.id, amount: order.amount, currency: order.currency })
  } catch (error) {
    console.error('Payment order creation failed:', error)
    return res.status(502).json({ message: 'Unable to initialize payment with Razorpay.' })
  }
})

router.post('/verify', async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, expectedAmount } = req.body

    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature || !expectedAmount) {
      return res.status(400).json({ message: 'Payment verification details are incomplete.' })
    }

    const keySecret = process.env.RAZORPAY_KEY_SECRET
    if (!keySecret) {
      return res.status(503).json({ message: 'Payment verification is not configured.' })
    }

    const expectedSignature = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest('hex')

    const expectedSignatureBuffer = Buffer.from(expectedSignature)
    const receivedSignatureBuffer = Buffer.from(razorpaySignature)
    const signaturesMatch = expectedSignatureBuffer.length === receivedSignatureBuffer.length
      && crypto.timingSafeEqual(expectedSignatureBuffer, receivedSignatureBuffer)

    if (!signaturesMatch) {
      return res.status(400).json({ message: 'Payment verification failed.' })
    }

    const payment = await getRazorpay().payments.fetch(razorpayPaymentId)
    const expectedAmountInPaise = Number(expectedAmount) * 100

    if (payment.order_id !== razorpayOrderId || payment.amount !== expectedAmountInPaise) {
      return res.status(400).json({ message: 'Payment details do not match the order.' })
    }

    if (!['authorized', 'captured'].includes(payment.status)) {
      return res.status(400).json({ message: 'Payment has not been authorized.' })
    }

    const verificationToken = crypto
      .createHmac('sha256', keySecret)
      .update(`${razorpayOrderId}|${razorpayPaymentId}|${expectedAmount}`)
      .digest('hex')

    return res.json({
      verified: true,
      paymentId: razorpayPaymentId,
      orderId: razorpayOrderId,
      verificationToken,
    })
  } catch (error) {
    console.error('Payment verification failed:', error)
    return res.status(502).json({ message: 'Unable to verify payment with Razorpay.' })
  }
})

module.exports = router
