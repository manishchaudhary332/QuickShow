import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import { connect } from 'mongoose'
import connectDB from './configs/db.js'
import { clerkMiddleware } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"


const app = express()
const port = 3000


await connectDB()

// middleware
app.use(express.json())
app.use(cors())
app.use(clerkMiddleware())

// Api routes
app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.use('/api/inngest',serve({ client: inngest, functions }))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})