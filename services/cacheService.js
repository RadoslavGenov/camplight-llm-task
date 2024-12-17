import { createClient } from 'redis'

// use redis client to store key value pairs for caching
const redisClient = createClient({ url: process.env.REDIS_URL })
await redisClient.connect()

export const getCachedValue = async (key) => {
  return await redisClient.get(key)
}

export const setCachedValue = async (key, value) => {
  try {
    return await redisClient.set(key, value)
  } catch (error) {
    console.log(error)
  }
}
