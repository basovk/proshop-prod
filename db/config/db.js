import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
  switch (mongoose.connection.readyState) {
    case 0:
      try {
        const con = await mongoose.connect(process.env.MONGO_URI, {
          useUnifiedTopology: true,
          useNewUrlParser: true,
          useCreateIndex: true
        })
        console.log(`MongoDB connected: ${con.connection.host}`)
      } catch (error) {
        console.error(`Error: ${error.message}`)
      }
      break
    case 1:
      break
    default:
      break
  }
}

export default connectDB
