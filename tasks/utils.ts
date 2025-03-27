import { HardhatRuntimeEnvironment } from "hardhat/types";

// Read the deployment journal to get the staking contract address
import fs from 'fs';
import path from 'path';

/**
 * Get the address of a deployed contract from the ignition deployed addresses file.
 * @param hre - Hardhat runtime environment.
 * @param futureID - The ignition deployment ID of the contract.
 * @param deploymentId - The ignition deployment ID of the contract (chain-<chainId> by default).
 * @returns The address of the deployed contract.
 */
export async function getDeploymentAddr(hre: HardhatRuntimeEnvironment, futureID: string, deploymentId: string = "") {
  const chainId = (await hre.ethers.provider.getNetwork()).chainId;
  if (deploymentId == "") {
    deploymentId = `chain-${chainId}`;
  }
  const journalPath = path.join(__dirname, `../ignition/deployments/${deploymentId}/deployed_addresses.json`);

  if (!fs.existsSync(journalPath)) {
    throw new Error('Deployment addresses not found. Please deploy the contracts first.');
  }

  const deployment = JSON.parse(fs.readFileSync(journalPath, 'utf8'));
  const contractAddr = deployment[futureID];
  return contractAddr;
}
