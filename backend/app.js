import express from 'express'
import dotenv from 'dotenv'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'

import {
  notFound,
  errorHandler,
} from './src/api/v1/middlewares/errorMiddleware.js'

// Initialise Routes
import authRoute from './src/api/v1/routes/authRoutes.js'
// Load Env
dotenv.config()

// Initialise Express
const app = express()

// Using Cors
app.use(cors())

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  )
  next()
})

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

// Initialise express to use JSON
app.use(
  express.json({
    extended: false,
  })
)

// Set Static Folder Path
const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, 'public')))

// Deployment Build For Frontend React
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  })
} else {
  app.get('/', (req, res) => {
    res.send('API Running')
  })
}

// Mount Routes
app.use('/api/v1/auth', authRoute)

// Capture errors for routes that do not exist

// Middleware for routes that do not exist
app.use(notFound)

// @desc Error Handler middleware should always be below the routes to catch the errors and not cause code block
app.use(errorHandler)

export default app
