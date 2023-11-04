import React from 'react'
import { ConnectButton } from '../web3/ConnectButton'
import Link from 'next/link'
import 'twin.macro'
import tw, { styled } from 'twin.macro'

export const Index = () => {
  return (
    <div>
      <header tw="fixed w-full">
        <nav tw="border-gray-200 bg-white py-2.5 dark:bg-gray-900">
          <div tw="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between px-4">
            <Link href="/" tw="flex items-center">
              <span tw="self-center whitespace-nowrap font-semibold text-xl text-pink-500 dark:text-white">
                Task-Tracker
              </span>
            </Link>
            <div tw="flex items-center lg:order-2">
              <ConnectButton />

              <button
                data-collapse-toggle="mobile-menu-2"
                type="button"
                tw="ml-1 inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:(outline-none ring-2 ring-gray-200) dark:(text-gray-400 hover:bg-gray-700 focus:ring-gray-600) lg:hidden"
                aria-controls="mobile-menu-2"
                aria-expanded="false"
              >
                <span tw="sr-only">Open main menu</span>
                <svg
                  tw="h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <svg
                  tw="hidden h-6 w-6"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <div
              tw="hidden w-full items-center justify-between lg:(order-1 flex w-auto)"
              id="mobile-menu-2"
            >
              <ul tw="mt-4 flex flex-col font-medium lg:(mt-0 flex-row space-x-8)">
                <li>
                  <Link
                    href="/"
                    tw="block rounded bg-pink-400 py-2 pl-3 pr-4 text-white dark:text-white lg:(bg-transparent p-0 text-pink-400)"
                    aria-current="page"
                  >
                    Home
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>
    </div>
  )
}
