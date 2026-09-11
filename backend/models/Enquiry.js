const mongoose = require('mongoose')

const enquirySchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phone: { type: String, default: '' },
    enquiryType: { type: String, default: 'General Enquiry' },
    message: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
)

module.exports = mongoose.models.Enquiry || mongoose.model('Enquiry', enquirySchema)
