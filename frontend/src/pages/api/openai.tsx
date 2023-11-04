import { NextApiRequest, NextApiResponse } from 'next'
import OpenAI from 'openai'

const openaiHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const openai = new OpenAI({
        apiKey: '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',
        dangerouslyAllowBrowser: true,
      })

      const { prompt } = req.body
      const response = await openai.images.generate({ prompt })

      const generatedImageURL = response.data[0].url

      res.status(200).json({ generatedImageURL })
    } catch (error) {
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(405).end()
  }
}

export default openaiHandler
