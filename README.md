# Pooley's ERC20 Token

## Description
A basic ERC20 Token inheriting from OpenZeppelin's ERC20 contract, developed with Hardhat and Solidity, deployed to the Ethereum Sepolia Testnet.

## Etherscan
- [Contract deployment tx on Etherscan](https://sepolia.etherscan.io/tx/0x1fa5433b745054f0a9f92701a9c8a3633e9782ddb6a2c23010cb736dbab7e864)
- [Deployed token contract on Etherscan](https://sepolia.etherscan.io/address/0x242def03bf69103efa66fe8933b8fcd6c45c1c85)  
- [Etherscan Token Tracker](https://sepolia.etherscan.io/token/0x242def03bf69103efa66fe8933b8fcd6c45c1c85)  

## Scripts
Includes scripts to deploy to Sepolia, and to transfer tokens to a list of recipients.

Deploy:  
`npx hardhat run 'scripts/deploy.js' --network sepolia`

Transfer:  
`npx hardhat run 'scripts/transfer.js' --network sepolia`
