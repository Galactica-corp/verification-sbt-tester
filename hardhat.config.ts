import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { Wallet } from "ethers";

const config: HardhatUserConfig = {
  solidity: "0.8.28",
  networks: {
    galaAndromeda: {
      url: 'https://evm-rpc-http-andromeda.galactica.com/',
      accounts: getAccounts(),
    },
    reticulum: {
      url: 'https://evm-rpc-http-reticulum.galactica.com/',
      accounts: getAccounts(),
    },
  },
  etherscan: {
    apiKey: {
      galaAndromeda: 'something', // not needed for now
      reticulum: 'something', // not needed for now
    },
    customChains: [
      {
        network: 'galaAndromeda',
        chainId: 41238,
        urls: {
          apiURL: 'https://explorer-andromeda.galactica.com/api',
          browserURL: 'https://explorer-andromeda.galactica.com/',
        },
      },
      {
        network: 'reticulum',
        chainId: 9302,
        urls: {
          apiURL: 'https://explorer-reticulum.galactica.com/api',
          browserURL: 'https://explorer-reticulum.galactica.com/',
        },
      },
    ],
  },
};

/**
 * Gets the accounts for operation from the environment variables.
 * If they are not present, it will use random private keys (for example on the GitHub pipeline).
 * @returns Array of private keys.
 */
function getAccounts(): string[] {
  const accounts: string[] = [];
  // check if environment variables exist
  const warningMsg = ' env var not set, using random private key';

  if (process.env.GalaTestnetDeployerPrivateKey) {
    accounts.push(process.env.GalaTestnetDeployerPrivateKey);
  } else {
    console.warn(`GalaTestnetDeployerPrivateKey${warningMsg}`);
    accounts.push(Wallet.createRandom().privateKey);
  }
  return accounts;
}

export default config;
