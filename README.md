# Sample Project for testing with Galactica Verification SBTs

## Setup

```shell
yarn install
```

Set the environment variable `GalaTestnetDeployerPrivateKey` to the private key of the account that you want to use for testing.

Get some testnet funds from the faucet: https://faucet-reticulum.galactica.com/

## Deploying

```shell
yarn hardhat ignition deploy ./ignition/modules/TestVerificationSBT.m.ts --network reticulum
```

## Issue a test SBT

```shell
yarn hardhat issueTestSBT --receiver 0x018448224e6bf248da52e4693886955e023e0737 --network reticulum
```
