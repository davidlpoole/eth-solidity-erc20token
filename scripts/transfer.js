const hre = require("hardhat");

function parsePoo(_amount, unitsFrom, _decimals) {
    //ensure parameters are all BigInt
    const amount = BigInt(_amount);
    const power10decimals = BigInt(10) ** _decimals;

    // convert
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

async function printDetails(signerOrAddress, contract) {
    // get address from either the signer object or address string
    let address;
    if (typeof signerOrAddress == "string") {
        address = signerOrAddress;          // its already an address string
    } else {
        address = signerOrAddress.address;  // its a signer object with an address property
    }

    // get the token details and balance
    const tokenSymbol = await contract.symbol();
    const tokenDecimals = await contract.decimals();
    const balance = await contract.balanceOf(address);

    // convert from wei to token
    const tokenBalance = parsePoo(balance, "wei", tokenDecimals);

    console.log(`${address} has ${tokenBalance} ${tokenSymbol}`);
}

async function transfer(signer, to_address, tokenAmount, contract) {
    // output the current balance of the recipient
    await printDetails(to_address, contract);

    // get the token symbol and decimal place
    const tokenDecimals = await contract.decimals();
    const tokenSymbol = await contract.symbol();
    // display what transfer is going to happen
    console.log(`sending ${tokenAmount} ${tokenSymbol} from ${signer.address} to ${to_address}`);

    // convert the token amount to 'wei'
    const parsedAmount = parsePoo(tokenAmount.toString(), "POO", tokenDecimals);
    // perform the transfer
    const tx = await contract.connect(signer).transfer(to_address, parsedAmount);
    // wait for mining
    await tx.wait();

    // display recipient balance after transfer
    await printDetails(to_address, contract);
}

async function main() {
    // get the signer wallet/s from hardhat config
    const [deployer, other] = await ethers.getSigners();

    // get the details of the deployed token contract
    const deployedContract = '0x242DEf03BF69103efA66Fe8933b8fcD6c45C1C85';
    const contract = await ethers.getContractAt('Pooley', deployedContract);

    // display the sender's balance before transactions
    await printDetails(deployer, contract);

    // a list of addresses to send tokens to
    const recipient_list = [
        other.address,
        other.address,
        other.address,
    ];

    // iterate over the list of recipients, and send an amount of the token to each
    for (const recipient of recipient_list) {
        await transfer(deployer, recipient, 1, contract);
    }

    // display the senders final balance
    await printDetails(deployer, contract);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
