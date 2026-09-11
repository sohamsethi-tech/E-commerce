const nodemailer = require('nodemailer')

function createTransporter() {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 587),
    secure: Number(process.env.SMTP_PORT || 587) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

async function verifyEmailTransport() {
  const smtpHost = process.env.SMTP_HOST
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log('SMTP is not configured. Email sending is disabled.')
    return false
  }

  try {
    await createTransporter().verify()
    console.log('SMTP connection verified successfully.')
    return true
  } catch (error) {
    console.error('SMTP connection failed:', error.message)
    return false
  }
}

async function sendBusinessEmail({ subject, text, html }) {
  const smtpHost = process.env.SMTP_HOST
  const smtpUser = process.env.SMTP_USER
  const smtpPass = process.env.SMTP_PASS

  if (!smtpHost || !smtpUser || !smtpPass) {
    console.log('Email not configured. Skipping email send.')
    console.log('Subject:', subject)
    console.log('Body:', text)
    return { skipped: true, delivered: false, reason: 'not_configured' }
  }

  const transporter = createTransporter()

  try {
    await transporter.sendMail({
      from: process.env.FROM_EMAIL || smtpUser,
      to: process.env.TO_EMAIL || smtpUser,
      subject,
      text,
      html,
    })

    return { skipped: false, delivered: true }
  } catch (error) {
    console.error('Email send failed:', error.message)
    return { skipped: false, delivered: false, reason: 'send_failed', error: error.message }
  }
}

module.exports = { sendBusinessEmail, verifyEmailTransport }
