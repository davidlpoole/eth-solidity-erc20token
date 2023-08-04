const hre = require("hardhat");

function parsePoo(_amount, unitsFrom, _decimals) {
  const amount = BigInt(_amount);
  const power10decimals = BigInt(10) ** _decimals;

  switch (unitsFrom.toUpperCase()) {
    case "POO":
      return amount * power10decimals
      break
    case "WEI":
      return amount / power10decimals
      break
    default:
      return amount;
  }
}

async function printDetails(signer, contract) {
  const address = signer.address;
  const tokenSymbol = await contract.symbol();
  const tokenDecimals = await contract.decimals();
  const balance = await contract.balanceOf(address);
  const tokenBalance = parsePoo(balance, "wei", tokenDecimals);
  console.log(`${address} has ${tokenBalance} ${tokenSymbol}`);
}

async function transfer(from, to, tokenAmount, contract) {
  const tokenDecimals = await contract.decimals();
  const tokenSymbol = await contract.symbol();
  console.log(`sending ${tokenAmount} ${tokenSymbol} from ${from.address} to ${to.address}`);
  const parsedAmount = parsePoo(tokenAmount.toString(), "POO", tokenDecimals);
  const tx = await contract.connect(from).transfer(to.address, parsedAmount);
  return tx.wait();
}

async function main() {

  const [deployer, other] = await ethers.getSigners();

  const deployedContract = '0x242DEf03BF69103efA66Fe8933b8fcD6c45C1C85';
  const contract = await ethers.getContractAt('Pooley', deployedContract);

  await printDetails(deployer, contract);
  await printDetails(other, contract);

  await transfer(other, deployer, 1, contract);

  await printDetails(deployer, contract);
  await printDetails(other, contract);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
