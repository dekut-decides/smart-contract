// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
const hre = require("hardhat");

async function main() {
  // const currentTimestampInSeconds = Math.round(Date.now() / 1000);
  // const ONE_YEAR_IN_SECS = 365 * 24 * 60 * 60;
  // const unlockTime = currentTimestampInSeconds + ONE_YEAR_IN_SECS;

  // const lockedAmount = hre.ethers.utils.parseEther("1");
  const signer = await ethers.getSigner();

  const Ballot = await hre.ethers.getContractFactory("Ballot",signer);
  const ballot = await Ballot.deploy("Class rep election",20);

  await ballot.deployed();
  

  console.log(
    `Ballot deployed to ${ballot.address} by ${signer.address}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});




  // async function addCandidate(value) {
  //   if (!value) return;
  //   if (!typeof window.ethereum !== "undefined") {
  //     await requestAccount();
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     const signer = provider.getSigner();
  //     let factory = new ethers.ContractFactory(
  //       Ballot.abi,
  //       {
  //         /*bytecoce,*/
  //       },
  //       signer
  //     );
  //     let contract = await factory.deploy(value);
  //     // const contract = new ethers.Contract(ballotAddress, Ballot.abi, signer);
  //     //check on how to pass values to the smart contract constructor from ehers js(to front end)
  //     // const transaction = await contract.setGreeting(value);
  //     // await transaction.wait();
  //   }
  // }