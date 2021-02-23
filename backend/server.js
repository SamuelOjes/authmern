// Require MongoDB database connection
import connectDB from './src/api/v1/config/db.js'

// Initialise DB connection to Database
connectDB()

// Require express config file
import app from './app.js'

// Setup Port Listener for server
const PORT = process.env.PORT || 5001
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.brightBlue.bold
  )
})

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  // Close server and exit process
  process.exit(1)
})
