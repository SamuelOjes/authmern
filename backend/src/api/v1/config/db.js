// Require Mongoose
import mongoose from 'mongoose'

// require localDb connection string
import dotenv from 'dotenv'
dotenv.config({ path: '.env' })

// Setup MongoDB URI String
const localDbURI = process.env.LOCALDB_URI
const mongoURI = process.env.MONGO_URI

// Mongoose Connection Setup
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(localDbURI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })

    console.log(
      `MongoDB connected: ${conn.connection.host}`.brightYellow.underline.bold
    )
  } catch (error) {
    console.error(`Error: ${error.message}`)
    process.exit(1)
  }
}

export default connectDB
