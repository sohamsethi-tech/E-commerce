const mongoose = require('mongoose')

async function connectDB() {
  const mongoUri = process.env.MONGODB_URI

  if (!mongoUri) {
    console.log('MONGODB_URI is not configured. Falling back to in-memory data storage.')
    return false
  }

  try {
    await mongoose.connect(mongoUri)
    console.log('MongoDB connected successfully.')
    return true
  } catch (error) {
    console.error('MongoDB connection failed:', error.message)
    console.log('Falling back to in-memory data storage.')
    return false
  }
}

module.exports = { connectDB }
