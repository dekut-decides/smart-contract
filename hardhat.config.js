require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */


const {API_URL ,PRIVATE_KEY} = process.env;



module.exports = {
  defaultNetwork: "hardhat",
  paths:{
    artifacts:"./src/artifacts",
  },
  networks:{
    hardhat:{
      chainId:1337
    },
    goerli:{
      url:API_URL,
      accounts: [ `0x${PRIVATE_KEY  }`]
    }
  },
  solidity: "0.8.9",
};
