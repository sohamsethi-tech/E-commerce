const express = require('express')
const crypto = require('crypto')
const Order = require('../models/Order')
const { sendBusinessEmail } = require('../utils/email')

const router = express.Router()

router.get('/', (req, res) => {
  const orders = req.app.locals.store.orders
  res.json(orders)
})

router.post('/', async (req, res) => {
  try {
    const { orderId, customerName, customerEmail, customerPhone, shippingAddress, notes, items, totalAmount, advanceAmount, advancePaid, paymentId, paymentVerificationToken, status } = req.body

    if (!orderId || !customerName || !customerEmail || !customerPhone || !shippingAddress || !items?.length) {
      return res.status(400).json({ message: 'Order information is incomplete.' })
    }

    if (!paymentId || !advancePaid || !paymentVerificationToken || !process.env.RAZORPAY_KEY_SECRET) {
      return res.status(400).json({ message: 'Payment must be completed before the order can be created.' })
    }

    const expectedVerificationToken = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${req.body.razorpayOrderId}|${paymentId}|${advanceAmount}`)
      .digest('hex')

    if (paymentVerificationToken !== expectedVerificationToken) {
      return res.status(400).json({ message: 'Payment verification is required before the order can be created.' })
    }

    if (req.app.locals.mongoReady) {
      const existingOrder = await Order.findOne({ orderId }).lean()
      if (existingOrder) {
        return res.status(200).json({
          message: 'Order already recorded.',
          order: existingOrder,
          duplicate: true,
        })
      }
    } else {
      const existingOrder = req.app.locals.store.orders.find((order) => order.orderId === orderId)
      if (existingOrder) {
        return res.status(200).json({
          message: 'Order already recorded.',
          order: existingOrder,
          duplicate: true,
        })
      }
    }

    const payload = {
      orderId,
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      notes: notes || '',
      items,
      totalAmount,
      advanceAmount,
      advancePaid: Boolean(advancePaid),
      paymentId: paymentId || '',
      status: status || 'pending_payment',
      createdAt: new Date().toISOString(),
    }

    let savedOrder = null

    if (req.app.locals.mongoReady) {
      savedOrder = await Order.create(payload)
    } else {
      savedOrder = payload
      req.app.locals.store.orders.unshift(savedOrder)
    }

    const emailResult = await sendBusinessEmail({
      subject: `New order received: ${payload.orderId}`,
      text: `Customer: ${payload.customerName}\nEmail: ${payload.customerEmail}\nPhone: ${payload.customerPhone}\nAddress: ${payload.shippingAddress}\n\nItems:\n${payload.items.map((item) => `- ${item.carpetName} x ${item.quantity}`).join('\n')}\n\nTotal: ${payload.totalAmount}\nAdvance: ${payload.advanceAmount}`,
      html: `<h3>New Carpets & Beyond Order</h3><p><strong>Order ID:</strong> ${payload.orderId}</p><p><strong>Customer:</strong> ${payload.customerName}</p><p><strong>Email:</strong> ${payload.customerEmail}</p><p><strong>Phone:</strong> ${payload.customerPhone}</p><p><strong>Address:</strong> ${payload.shippingAddress}</p><p><strong>Notes:</strong> ${payload.notes || 'None'}</p><p><strong>Total:</strong> ${payload.totalAmount}</p><p><strong>Advance:</strong> ${payload.advanceAmount}</p><p><strong>Status:</strong> ${payload.status}</p><ul>${payload.items.map((item) => `<li>${item.carpetName} x ${item.quantity}</li>`).join('')}</ul>`,
    })

    return res.status(201).json({
      message: emailResult.delivered ? 'Order created successfully.' : 'Order created successfully. Email notification could not be sent.',
      order: savedOrder,
      emailStatus: emailResult.delivered ? 'sent' : 'failed',
    })
  } catch (error) {
    console.error('Error creating order:', error)
    return res.status(500).json({
      message: 'Something went wrong while saving the order.',
      error: error.message,
    })
  }
})

module.exports = router
