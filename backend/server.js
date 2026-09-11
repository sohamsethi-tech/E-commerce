const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const { connectDB } = require('./config/db')
const { verifyEmailTransport } = require('./utils/email')

dotenv.config({ path: path.join(__dirname, '.env') })

const app = express()
const PORT = process.env.PORT || 5000
const allowedOrigins = (process.env.FRONTEND_URL || 'http://localhost:5173,http://127.0.0.1:5173')
  .split(',')
  .map((origin) => origin.trim())
  .filter(Boolean)

if (process.env.VERCEL_URL) {
  allowedOrigins.push(`https://${process.env.VERCEL_URL}`)
}

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      return callback(null, true)
    }

    return callback(new Error('Origin is not allowed by CORS.'))
  },
  credentials: true,
}))
app.use(express.json({ limit: '1mb' }))

app.locals.store = {
  enquiries: [],
  orders: [],
}

app.locals.mongoReady = false
let servicesPromise

function initializeServices() {
  if (!servicesPromise) {
    servicesPromise = connectDB().then((mongoReady) => {
      app.locals.mongoReady = mongoReady
      if (!mongoReady) {
        console.log('MongoDB not configured. Using in-memory data store for local development.')
      }
      verifyEmailTransport()
    })
  }

  return servicesPromise
}

app.use(async (req, res, next) => {
  try {
    await initializeServices()
    next()
  } catch (error) {
    console.error('Service initialization failed:', error)
    res.status(503).json({ message: 'Backend services are temporarily unavailable.' })
  }
})

app.get('/api/health', (req, res) => {
  res.json({
    ok: true,
    app: 'Carpets & Beyond API',
    mongoReady: app.locals.mongoReady,
    timestamp: new Date().toISOString(),
  })
})

app.use('/api/enquiries', require('./routes/enquiries'))
app.use('/api/orders', require('./routes/orders'))
app.use('/api/admin', (req, res, next) => {
  const adminToken = process.env.ADMIN_TOKEN

  if (!adminToken || req.get('x-admin-token') !== adminToken) {
    return res.status(401).json({ message: 'Admin authentication required.' })
  }

  return next()
}, require('./routes/admin'))

function bootstrap() {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

  connectDB().then((mongoReady) => {
    app.locals.mongoReady = mongoReady
    if (!mongoReady) {
      console.log('MongoDB not configured. Using in-memory data store for local development.')
    }
  })

  verifyEmailTransport()
}

if (require.main === module) {
  bootstrap()
}

module.exports = app
