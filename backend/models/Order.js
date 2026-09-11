const mongoose = require('mongoose')

const orderItemSchema = new mongoose.Schema(
  {
    carpetId: { type: String, required: true },
    carpetName: { type: String, required: true },
    carpetSlug: { type: String },
    carpetImage: { type: String },
    quantity: { type: Number, default: 1 },
    unitPrice: { type: Number, required: true },
  },
  { _id: false },
)

const orderSchema = new mongoose.Schema(
  {
    orderId: { type: String, required: true, unique: true },
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    shippingAddress: { type: String, required: true },
    notes: { type: String, default: '' },
    items: [orderItemSchema],
    totalAmount: { type: Number, required: true },
    advanceAmount: { type: Number, required: true },
    advancePaid: { type: Boolean, default: false },
    paymentId: { type: String },
    status: {
      type: String,
      enum: ['pending_payment', 'confirmed', 'cancelled'],
      default: 'pending_payment',
    },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

module.exports = mongoose.models.Order || mongoose.model('Order', orderSchema)
