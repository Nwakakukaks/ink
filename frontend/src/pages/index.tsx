import { Index } from '@/components/header/Index'
import { CenterBody } from '@/components/layout/CenterBody'
import { ChainInfo } from '@/components/web3/ChainInfo'
import { GreeterContractInteractions } from '@/components/web3/GreeterContractInteractions'
import { useInkathon } from '@scio-labs/use-inkathon'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import 'twin.macro'
import Gallery from '../components/gallery/Gallery'

type SettodoFunction = React.Dispatch<React.SetStateAction<string | undefined>>

const HomePage: NextPage = () => {
  // Display `useInkathon` error messages (optional)
  const [todo, settodo] = useState<string | undefined>(undefined)
  const { error } = useInkathon()
  useEffect(() => {
    if (!error) return
    toast.error(error.message)
  }, [error])

  const todos = todo

  return (
    <>
      {/* Top Bar */}
      {/* <HomeTopBar /> */}
      <Index />

      <CenterBody tw="mt-20 mb-10 px-5">
        {/* Title */}
        {/* <HomePageTitle /> */}
        <Gallery todos={todos} />

        <div tw="mt-10 flex w-full flex-wrap items-start justify-center gap-4">
          {/* Chain Metadata Information
          <ChainInfo /> */}

          {/* Greeter Read/Write Contract Interactions */}
          <GreeterContractInteractions settodo={settodo} />
        </div>
      </CenterBody>
    </>
  )
}

export default HomePage
