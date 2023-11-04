import { NextApiRequest, NextApiResponse } from 'next'
import { Web3Storage } from 'web3.storage'
import axios from 'axios'

async function convertUriDataToFile(uriData: any, fileName: string): Promise<File> {
  const response = await axios.get(uriData, { responseType: 'arraybuffer' })
  console.log(response);
  const blob = new Blob([response.data], { type: 'image/jpeg' })
  return new File([blob], `${fileName}.jpg`)
}


const mintNFTHandler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { generatedImageURL, generatedPrompt } = req.body

      // Handle the response and generate a File object using axios
      const file = await convertUriDataToFile(generatedImageURL, generatedPrompt)

      // Upload the generated image to Web3 Storage
      const client = new Web3Storage({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdBNjFGOTQ4RkExNWM4QUZCMzU3ZDdlNGQzMjJEMjQ0MzMzZTQ0MUQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODkyNTI4NTY1NTIsIm5hbWUiOiJhaSJ9.St6xCU6PbIKARwEBzXPYvn8pqieiQoTmee5ogLEAv8I',
      })

      const cid = await client.put([file])
      const mintedURI = `https://dweb.link/ipfs/${cid}`

      res.status(200).json({ mintedURI })
    } catch (error) {
      console.error(error)
      res.status(500).json({ error: 'Internal Server Error' })
    }
  } else {
    res.status(405).end()
  }
}

export default mintNFTHandler
