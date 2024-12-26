import { BigNumber, Contract } from "ethers";
import { PRESICION_LENGTH } from "../../constants/common";
import { getMaticValue } from "../../utils/index";
export const getMinBetAmount = async (contract: Contract) => {
  try {
    const betAmount: BigNumber = await contract.methods.minBetAmount().call();
    return betAmount;
  } catch (error) {
    console.error("LL: getLatestRound -> error", error);
    throw error;
  }
};

export const postBetBearAbi = async (contract: Contract, epoch: number) => {
  try {
    return contract.methods.betBear(epoch).encodeABI();
  } catch (error) {
    console.error("LL: getLatestRound -> error", error);
    throw error;
  }
};

export const postBetBullAbi = async (contract: Contract, epoch: number) => {
  try {
    return contract.methods.betBull(epoch).encodeABI();
  } catch (error) {
    console.error("LL: getLatestRoundData -> error", error);
    throw error;
  }
};

export const getCurrentEpoch = async (contract: Contract) => {
  try {
    const latestRoundData: BigNumber = await contract.methods
      .currentEpoch()
      .call();
    return Number(latestRoundData);
  } catch (error) {
    console.error("LL: getCurrentEpoch -> error", error);
    throw error;
  }
};
export const getUserRoundsLength = async (contract: Contract) => {
  try {
    const latestRoundData: BigNumber = await contract.methods
      .currentEpoch()
      .call();
    return Number(latestRoundData);
  } catch (error) {
    console.error("LL: getCurrentEpoch -> error", error);
    throw error;
  }
};

export const getClaimable = async (
  contract: Contract,
  epoch: number,
  user: string
) => {
  try {
    const isClaimable: boolean = await contract.methods
      .claimable(BigNumber.from(epoch), user)
      .call();
    return isClaimable;
  } catch (error) {
    console.error("LL: error", error);
    throw error;
  }
};

export const getUserRounds = async (
  contract: Contract,
  user: string,
  cursor: Number = 0,
  size: Number = 1000
) => {
  try {
    const allRounds = await contract.methods
      .getUserRounds(user, cursor, size)
      .call();
    const allRoundsData = await allRounds[0].reduce(
      async (prev: any, epoch: BigNumber, index: number) => {
        const newPrev = await prev;
        const claimable = await getClaimable(contract, Number(epoch), user);
        const { amount, claimed, position } = allRounds[1][index];
        newPrev[Number(epoch)] = {
          amount: getMaticValue(amount),
          claimed,
          position,
          claimable,
        };
        return newPrev;
      },
      Promise.resolve({})
    );
    return allRoundsData;
  } catch (error) {
    console.error("LL: getCurrentEpoch -> error", error);
    throw error;
  }
};

export const getEpochDetails = async (
  contract: Contract,
  roundId: BigNumber
) => {
  try {
    const roundData = await contract.methods.rounds(roundId).call();
    const rewardAmount = Number(roundData.rewardAmount);
    const totalAmount = Number(roundData.totalAmount);
    return {
      bearAmount: Number(roundData.bearAmount),
      bullAmount: Number(roundData.bullAmount),
      closeOracleId: Number(roundData.closeOracleId),
      closePrice: (Number(roundData.closePrice) / 100000000).toFixed(
        PRESICION_LENGTH
      ),
      closeTimestamp: Number(roundData.closeTimestamp),
      epoch: Number(roundData.epoch),
      lockOracleId: Number(roundData.lockOracleId),
      lockPrice: (Number(roundData.lockPrice) / 100000000).toFixed(
        PRESICION_LENGTH
      ),
      lockTimestamp: Number(roundData.lockTimestamp),
      oracleCalled: roundData.oracleCalled,
      rewardAmount:
        rewardAmount > 0 ? getMaticValue(roundData.rewardAmount) : rewardAmount,
      rewardBaseCalAmount: Number(roundData.rewardBaseCalAmount),
      startTimestamp: Number(roundData.startTimestamp),
      totalAmount,
      totalAmountDisplay:
        totalAmount > 0 ? getMaticValue(roundData.totalAmount) : totalAmount,
    };
  } catch (error) {
    console.error("LL: getEpochDetails -> error", error);
    throw error;
  }
};

export const postClaimAbi = async (contract: Contract, epochs: BigNumber[]) => {
  try {
    return contract.methods.claim(epochs).encodeABI();
  } catch (error) {
    console.error("LL: getLatestRound -> error", error);
    throw error;
  }
};
