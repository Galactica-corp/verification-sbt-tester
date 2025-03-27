# Sample Project for testing with Galactica Verification SBTs

## Setup

```shell
yarn install
```

## Deploying

```shell
yarn hardhat ignition deploy ./ignition/modules/TestVerificationSBT.m.ts --network reticulum
```

## Issue a test SBT

```shell
yarn hardhat issueTestSBT --receiver 0x018448224e6bf248da52e4693886955e023e0737 --network reticulum
```
