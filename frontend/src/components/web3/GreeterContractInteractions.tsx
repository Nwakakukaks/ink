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

type PromptForm = {
  prompt: string
}

type UpdateGreetingValues = { newMessage: string }

type SettodoFunction = (todo: string | undefined) => void

type GreeterContractInteractionsProps = {
  settodo: SettodoFunction
}

export const GreeterContractInteractions: FC<GreeterContractInteractionsProps> = ({ settodo }) => {
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

  const onSubmitGenerate = (data: PromptForm) => {
    // Set the generated prompt from the form data
    setGeneratedPrompt(data.prompt)
    settodo(data.prompt)
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
      settodo(output)
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
        <h2 tw="text-center font-mono text-gray-400"></h2>

        <div tw="p-4">
          <form onSubmit={handleSubmit(onSubmitGenerate)} tw="mb-4">
            <textarea
              {...register('prompt', { required: true })}
              tw="w-full rounded border border-gray-300 p-2 text-black"
              placeholder="Daily Tasks"
            />
            <button type="submit" tw="mt-2 rounded bg-blue-500 p-2 text-white hover:bg-blue-700">
              Submit Tasks
            </button>
          </form>

          {generateStatus === 'progress' && <div tw="rounded bg-gray-100 p-2">Adding todos...</div>}

          {generateStatus === 'generated' && (
            <div tw="mt-4">
              <p tw="text-black">{generatedPrompt}</p>
            </div>
          )}

          {generateStatus === 'error' && (
            <div tw="mt-4 rounded bg-red-500 p-2 text-white">Error adding todos</div>
          )}
        </div>
      </div>
    </>
  )
}
