const hre = require("hardhat");

async function main() {

  const [deployer] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", deployer.address);

  const weiAmount = await ethers.provider.getBalance(deployer);
  console.log("Account balance:", (await ethers.formatEther(weiAmount)));

  const pooley = await hre.ethers.deployContract("Pooley");
  await pooley.waitForDeployment();
  console.log(`Token address: ${pooley.target}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
