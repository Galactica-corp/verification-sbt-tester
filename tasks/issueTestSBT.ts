import { ethers } from "ethers";
import { task, types } from "hardhat/config";
import { HardhatRuntimeEnvironment } from "hardhat/types";
import { VerificationSBT } from "../typechain-types";

import { getDeploymentAddr } from "./utils";

/**
 * Task for issuing a test SBT.
 * @param args - See task definition below or 'npx hardhat issueTestSBT'.
 * @param hre - Hardhat runtime environment.
 */
async function main(args: any, hre: HardhatRuntimeEnvironment) {
  const [admin] = await hre.ethers.getSigners();

  const balance = await hre.ethers.provider.getBalance(admin.address);

  console.log("Admin balance:", ethers.formatEther(balance), "ETH");

  const contractAddr = await getDeploymentAddr(hre, "TestVerificationSBTModule#VerificationSBT", args.deploymentId);
  console.log("VerificationSBT address:", contractAddr);
  const testSBT = await hre.ethers.getContractAt("VerificationSBT", contractAddr) as unknown as VerificationSBT;

  const verifierWrapperAddr = await getDeploymentAddr(hre, "TestVerificationSBTModule#AgeCitizenshipKYC", args.deploymentId);

  if (!args.expiration) {
    console.log("No expiration given, using one in 24 hours");
    args.expiration = Math.floor(Date.now() / 1000) + 24 * 60 * 60;
  }

  console.log("Minting SBT for", args.receiver);

  await testSBT["mintVerificationSBT(address,address,uint256,bytes32[],uint256[2],bytes32,uint256[2])"](
    args.receiver,
    verifierWrapperAddr,
    args.expiration,
    [], // no encrypted data attached
    [0n, 0n], // no user pubkey needed for ECDH
    ethers.zeroPadValue(args.receiver, 32), // convert address to bytes32 for human id
    [1n, 2n], // dummy provider pubkey
  );
  console.log("SBT minted successfully");
}

task("issueTestSBT", "Issues a test SBT to the admin account")
  .addParam("deploymentId", "The deployment id of the staking contract", "", types.string, true)
  .addParam("receiver", "The address to issue the SBT to", undefined, types.string, false)
  .addParam("expiration", "The expiration timestamp of the SBT", undefined, types.bigint, true)
  .setAction(async (taskArgs, hre) => {
    await main(taskArgs, hre).catch((error) => {
      console.error(error);
      process.exitCode = 1;
    });
  });