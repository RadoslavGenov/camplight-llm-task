import { Queue, Worker, QueueEvents } from 'bullmq'
import { improveText } from './llmService.js'
import { getCachedValue, setCachedValue } from './cacheService.js'

import dotenv from 'dotenv'

dotenv.config()

const queueName = 'text_improvement_queue'
const connection = { url: process.env.REDIS_URL }

// initialize queue and queue events
const queue = new Queue(queueName, { connection })
const queueEvents = new QueueEvents(queueName, { connection })

// initialize Worker to process jobs
new Worker(
  queueName,
  async (job) => {
    const { text } = job.data

    // check if result is cached
    const cachedValue = await getCachedValue(text)

    if (cachedValue) {
      return cachedValue
    }

    // else call gpt service
    const reworkedText = await improveText(text)

    // then cache value - key: text, value: improvedText
    await setCachedValue(text, reworkedText)

    return reworkedText
  },
  { connection }
)

queueEvents.on('completed', ({ jobId, returnvalue }) => {
  console.log(`Job ${jobId} completed. Result: ${returnvalue}`)
})

queueEvents.on('failed', ({ jobId, failedReason }) => {
  console.error(`Job ${jobId} failed with reason: ${failedReason}`)
})

// add a job to the queue
export const addToQueue = async (data) => {
  return await queue.add('improveText', data)
}

// wait for a job to complete
export const waitForJobResult = async (job) => {
  try {
    return await job.waitUntilFinished(queueEvents)
  } catch (error) {
    console.error(`Error waiting for job ${job.id}: ${error.message}`)
    throw error
  }
}
