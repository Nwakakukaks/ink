# Image Minter Dapp

Create and mint your own unique images using the Image Minter Dapp, built from the ink!athon Boilerplate.

## Overview

The Image Minter Dapp is a decentralized application (Dapp) that allows users to create and mint their unique images as non-fungible tokens (NFTs) on a blockchain. This Dapp is built using the ink!athon Boilerplate, which provides a full-stack solution for smart contract development and an integrated frontend. With this Dapp, users can unleash their creativity and turn their digital art into blockchain-based NFTs.

## Features

- **Image Creation:** Users can create and design their own images using an intuitive and user-friendly interface within the Dapp.

- **Minting as NFT:** After creating an image, users can choose to mint it as an NFT. This process involves generating a unique token associated with the image and storing it on the blockchain.

- **Ownership and Provenance:** Each minted NFT has a clear ownership history and provenance recorded on the blockchain, providing transparency and security.

- **Transfer and Trading:** Users can transfer their NFTs to others, trade them on NFT marketplaces, or even auction them to the highest bidder.(Future)

## Getting Started

To get started with the Image Minter Dapp, follow these steps:

1. **Run the Frontend:** Start the frontend of the Dapp to access the image creation and minting features.

2. **Create and Design Images:** Use the Dapp's image creation tool to design and customize your own unique images.

3. **Mint NFTs:** Choose your favorite images and mint them as NFTs on the blockchain. Each image becomes a unique digital collectible.

4. **Ownership and Trading:** View your NFT collection, track ownership history, and trade your NFTs with others on NFT marketplaces.

## Customization

The Image Minter Dapp is highly customizable, and you can tailor it to your specific needs:

- **Project Name:** Replace the default project name with your preferred title.

- **Custom Contracts:** If you want to add more functionality or change the default contracts, you can do so by modifying the contracts in the `contracts/src/` directory.

- **Custom Scripts:** Extend the Dapp's functionality by adding custom scripts to interact with your contracts or implement additional features.

## Stack

The Image Minter Dapp is built using the following technologies:

- **Smart Contract Development:** Rust, ink!, `cargo-contract`, `substrate-contracts-node`.

- **Frontend:** Next.js, React, TypeScript.

- **Contract Interactions:** `polkadot-js`, `useInkathon` React Hooks & Utility Library.

- **Styling:** Chakra UI, TailwindCSS, twin.macro, Emotion.

- **Linting & Formatting:** ESLint, Prettier, simple-git-hooks, lint-staged.

## Image Generation with AI

AI technology is used to generate the images within the Dapp, allowing users to create unique and personalized digital art.

## Live Examples

Check out live examples of Dapps built using the ink!athon Boilerplate and similar setups:

- [inkathon.xyz](https://inkathon.xyz) – A live demo deployment of the Image Minter Dapp.

- [Other NFT Marketplaces](insert link) – Explore various NFT marketplaces and platforms that utilize the ink!athon Boilerplate.

## Deployment

Deploying the Image Minter Dapp is straightforward, and you can do so using platforms like Vercel. The necessary settings are already configured in `vercel.json`. Simply follow the deployment instructions to make your Dapp accessible to users.

## Environment Variables

The Image Minter Dapp uses environment variables to configure the active network in the frontend. You can set the `NEXT_PUBLIC_DEFAULT_CHAIN` variable in the `frontend/.env.local` file to specify the default blockchain network. You can also define other environment variables to customize the Dapp's behavior further.

## Conclusion

The Image Minter Dapp is a powerful and versatile tool for creators and artists who want to turn their digital art into NFTs on the blockchain. Built on the solid foundation of the ink!athon Boilerplate, it provides a reliable and flexible solution for Dapp development. Whether you're looking to create your own NFT marketplace or offer image minting services, this Dapp can be customized to suit your needs. Get started today and join the NFT revolution!