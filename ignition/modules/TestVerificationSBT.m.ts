// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

const TestVerificationSBTModule = buildModule("TestVerificationSBTModule", (m) => {
  const uri = m.getParameter("metadataUri", "https://example.com");
  const name = m.getParameter("name", "Test Verification SBT");
  const symbol = m.getParameter("symbol", "TEST");
  const issuer = m.getParameter("issuer", m.getAccount(0));


  const testSBT = m.contract("VerificationSBT", [uri, name, symbol, issuer]);
  const verifierWrapper = m.contract("AgeCitizenshipKYC", [
    issuer,
    testSBT, // just some random contract that has a codehash to look like a versioned ZK verifier
    ethers.ZeroAddress,
    [], [],
    0
  ]);

  return { testSBT, verifierWrapper };
});

export default TestVerificationSBTModule;
