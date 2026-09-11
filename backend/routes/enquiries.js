const express = require('express')
const Enquiry = require('../models/Enquiry')
const { sendBusinessEmail } = require('../utils/email')

const router = express.Router()

router.get('/', (req, res) => {
  const enquiries = req.app.locals.store.enquiries
  res.json(enquiries)
})

router.post('/', async (req, res) => {
  try {
    const { firstName, lastName, email, phone, enquiryType, message } = req.body

    if (!firstName || !lastName || !email || !message) {
      return res.status(400).json({
        message: 'First name, last name, email, and message are required.',
      })
    }

    const payload = {
      firstName,
      lastName,
      email,
      phone: phone || '',
      enquiryType: enquiryType || 'General Enquiry',
      message,
      createdAt: new Date().toISOString(),
    }

    let savedEnquiry = null

    if (req.app.locals.mongoReady) {
      savedEnquiry = await Enquiry.create(payload)
    } else {
      savedEnquiry = payload
      req.app.locals.store.enquiries.unshift(savedEnquiry)
    }

    const emailResult = await sendBusinessEmail({
      subject: `New enquiry: ${payload.enquiryType}`,
      text: `Name: ${payload.firstName} ${payload.lastName}\nEmail: ${payload.email}\nPhone: ${payload.phone || 'Not provided'}\nEnquiry Type: ${payload.enquiryType}\n\nMessage:\n${payload.message}`,
      html: `<h3>New Carpets & Beyond Enquiry</h3><p><strong>Name:</strong> ${payload.firstName} ${payload.lastName}</p><p><strong>Email:</strong> ${payload.email}</p><p><strong>Phone:</strong> ${payload.phone || 'Not provided'}</p><p><strong>Type:</strong> ${payload.enquiryType}</p><p><strong>Message:</strong></p><p>${payload.message.replace(/\n/g, '<br />')}</p>`,
    })

    return res.status(201).json({
      message: emailResult.delivered ? 'Enquiry saved successfully.' : 'Enquiry saved successfully. Email notification could not be sent.',
      enquiry: savedEnquiry,
      emailStatus: emailResult.delivered ? 'sent' : 'failed',
    })
  } catch (error) {
    console.error('Error creating enquiry:', error)
    return res.status(500).json({
      message: 'Something went wrong while saving the enquiry.',
      error: error.message,
    })
  }
})

module.exports = router
