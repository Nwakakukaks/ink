import { ContractIds } from '@/deployments/deployments'
import { contractTxWithToast } from '@/utils/contractTxWithToast'
import { Card, FormControl, FormLabel, Input } from '@chakra-ui/react'
import {
  contractQuery,
  decodeOutput,
  useInkathon,
  useRegisteredContract,
} from '@scio-labs/use-inkathon'
import { FC, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import 'twin.macro'
import { Web3Storage } from 'web3.storage'

async function convertUriDataToFile(uriData: any, fileName: string): Promise<File> {
  // Assuming uriData is a Blob or binary data already
  // You can create a File object directly from it
  const blob = new Blob([uriData], { type: 'plain-utf8.txt' })
  return new File([blob], `${fileName}.txt`)
}

type PromptForm = {
  prompt: string
}

type UpdateGreetingValues = { newMessage: string }

type SetPicFunction = (pic: string | undefined) => void

type GreeterContractInteractionsProps = {
  setPic: SetPicFunction
}

export const GreeterContractInteractions: FC<GreeterContractInteractionsProps> = ({ setPic }) => {
  const { api, activeAccount, activeSigner } = useInkathon()
  const { contract, address: contractAddress } = useRegisteredContract(ContractIds.Greeter)
  const [greeterMessage, setGreeterMessage] = useState<string>()
  const [fetchIsLoading, setFetchIsLoading] = useState<boolean>()
  const [updateIsLoading, setUpdateIsLoading] = useState<boolean>()
  const { register, reset, handleSubmit } = useForm<any>()

  const [generateStatus, setGenerateStatus] = useState<'progress' | 'error' | 'generated' | 'idle'>(
    'idle',
  )
  const [generatedPrompt, setGeneratedPrompt] = useState('')
  const [generatedImageURL, setGeneratedImageURL] = useState('')
  const [mintingStatus, setMintingStatus] = useState<
    'progress' | 'error' | 'ready' | 'minted' | 'idle'
  >('idle')
  const [mintedURI, setMintedURI] = useState('')

  const onSubmitGenerate = async (data: PromptForm) => {
    setGenerateStatus('progress')

    try {
      const response = await fetch('/api/openai', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: data.prompt,
        }),
      })

      if (response.ok) {
        const imageResponse = await response.json()
        const generatedImageURL = imageResponse.generatedImageURL

        setGenerateStatus('generated')
        setGeneratedPrompt(data.prompt)
        setGeneratedImageURL(generatedImageURL)
        setMintingStatus('ready')
      } else {
        setGenerateStatus('error')
        toast.error('Error generating image')
      }
    } catch (error) {
      console.error(error)
      setGenerateStatus('error')
      toast.error('Error generating image')
    }
  }

  const mintNFT = async () => {
    setMintingStatus('progress')

    try {
      const uriData = {
        b64_json: generatedImageURL,
        prompt: generatedPrompt,
      }

      const file = await convertUriDataToFile(uriData.b64_json, uriData.prompt)

      // Upload the generated image to Web3 Storage
      const client = new Web3Storage({
        token:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDdBNjFGOTQ4RkExNWM4QUZCMzU3ZDdlNGQzMjJEMjQ0MzMzZTQ0MUQiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODkyNTI4NTY1NTIsIm5hbWUiOiJhaSJ9.St6xCU6PbIKARwEBzXPYvn8pqieiQoTmee5ogLEAv8I',
      })

      const cid = await client.put([file])
      const mintedURI = `https://dweb.link/ipfs/${cid}/${generatedPrompt}`

      if (cid) {
        updateGreeting({ newMessage: uriData.b64_json })
        setMintingStatus('minted')
        setMintedURI(mintedURI)
        toast.success('NFT minted successfully')
      } else {
        setMintingStatus('error')
        toast.error('Error minting NFT')
      }
    } catch (error) {
      console.error(error)
      setMintingStatus('error')
      toast.error('Error minting NFT')
    }
  }

  // Fetch Greeting
  const fetchGreeting = async () => {
    if (!contract || !api) return

    setFetchIsLoading(true)
    try {
      const result = await contractQuery(api, '', contract, 'greet')
      const { output, isError, decodedOutput } = decodeOutput(result, contract, 'greet')
      if (isError) throw new Error(decodedOutput)
      setGreeterMessage(output)
        setPic(output)
    } catch (e) {
      console.error(e)
      toast.error('Error while fetching greeting. Try again…')
      setGreeterMessage(undefined)
    } finally {
      setFetchIsLoading(false)
    }
  }
  useEffect(() => {
    fetchGreeting()
  }, [contract])

  // Update Greeting
  const updateGreeting = async ({ newMessage }: UpdateGreetingValues) => {
    if (!activeAccount || !contract || !activeSigner || !api) {
      toast.error('Wallet not connected. Try again…')
      return
    }

    // Send transaction
    setUpdateIsLoading(true)
    try {
      await contractTxWithToast(api, activeAccount.address, contract, 'setMessage', {}, [
        newMessage,
      ])
      reset()
    } catch (e) {
      console.error(e)
    } finally {
      setUpdateIsLoading(false)
      fetchGreeting()
    }
  }

  if (!api) return null

  return (
    <>
      <div tw="flex grow flex-col space-y-4 max-w-[20rem]">
        <h2 tw="text-center font-mono text-gray-400">Minted Images</h2>

        {/* Fetched Greeting */}
        {/* <Card variant="outline" p={4} bgColor="whiteAlpha.100">
          <FormControl>
            <FormLabel>Minted Images</FormLabel>
            <Input
              placeholder={fetchIsLoading || !contract ? 'Loading…' : greeterMessage}
              disabled={true}
            />
          </FormControl>
        </Card> */}

        <div tw="p-4">
          <form onSubmit={handleSubmit(onSubmitGenerate)} tw="mb-4">
            <input
              {...register('prompt', { required: true })}
              tw="w-full rounded border text-black border-gray-300 p-2"
              placeholder="Enter a prompt"
            />
            <button type="submit" tw="mt-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-700">
              Generate Image
            </button>
          </form>

          {generateStatus === 'progress' && (
            <div tw="rounded bg-gray-100 p-2">Generating image...</div>
          )}

          {generateStatus === 'generated' && (
            <div tw="mt-4">
              <img src={generatedImageURL} alt="Generated Image" tw="max-w-full" />
            </div>
          )}

          {generateStatus === 'error' && (
            <div tw="mt-4 rounded bg-red-500 p-2 text-white">Error generating image</div>
          )}

          {mintingStatus === 'ready' && (
            <button
              onClick={mintNFT}
              tw="mt-4 rounded bg-green-500 p-2 text-white hover:bg-green-700"
            >
              Mint NFT
            </button>
          )}

          {mintingStatus === 'progress' && (
            <div tw="mt-4 rounded bg-pink-500 p-2">Minting NFT...</div>
          )}

          {mintingStatus === 'minted' && (
            <div tw="mt-4">
              <p tw="text-green-500">NFT minted successfully!</p>
              {/* <p tw="text-blue-500">
                Minted NFT URI:{' '}
                <a href={mintedURI} target="_blank" rel="noopener noreferrer">
                  {mintedURI}
                </a>
              </p> */}
            </div>
          )}
        </div>

      </div>
    </>
  )
}
