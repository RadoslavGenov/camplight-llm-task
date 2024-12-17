import OpenAI from 'openai'
import dotenv from 'dotenv'

dotenv.config()

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY // I used personal open ai key to run my tests
})

// service to call open ai
export const improveText = async (inputText) => {
  // prompt gpt to improve the text
  const prompt = `Improve the grammar and style of the following text: ${inputText}`

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }]
    })

    return response.choices[0].message.content
  } catch (error) {
    console.error('OpenAI API error:', error)
  }
}
