const express = require('express')
const Enquiry = require('../models/Enquiry')
const Order = require('../models/Order')

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    if (req.app.locals.mongoReady) {
      const [enquiries, orders] = await Promise.all([
        Enquiry.find().sort({ createdAt: -1 }).lean(),
        Order.find().sort({ createdAt: -1 }).lean(),
      ])

      return res.json({ enquiries, orders })
    }

    return res.json({
      enquiries: req.app.locals.store.enquiries,
      orders: req.app.locals.store.orders,
    })
  } catch (error) {
    console.error('Admin fetch failed:', error)
    return res.status(500).json({
      message: 'Failed to load admin data.',
      error: error.message,
    })
  }
})

module.exports = router
