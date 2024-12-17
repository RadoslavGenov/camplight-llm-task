import dotenv from 'dotenv'

dotenv.config()

import express from 'express'

import { addToQueue, waitForJobResult } from './services/queueService.js'

const app = express()
const PORT = process.env.PORT || 3000

app.get('/improve', async (req, res) => {
  const { text } = req.query

  if (!text || typeof text !== 'string' || text.trim().length === 0) {
    return res
      .status(400)
      .json({ error: 'Please provide a valid "text" query parameter.' })
  }

  try {
    const job = await addToQueue({ text })
    const result = await waitForJobResult(job)

    res.json({ improvedText: result })
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Failed to process text improvement.' })
  }
})

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
