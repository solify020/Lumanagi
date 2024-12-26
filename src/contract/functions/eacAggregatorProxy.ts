import { BigNumber, Contract } from "ethers";
import { PRESICION_LENGTH } from "../../constants/common";

export const getLatestRound = async (contract: Contract) => {
  try {
    const latestRound = await contract.methods.latestRound().call();
    return Number(latestRound);
  } catch (error) {
    console.error("LL: getLatestRound -> error", error);
    throw error;
  }
};

export const getLatestRoundData = async (contract: Contract) => {
  try {
    const latestRoundData = await contract.methods.latestRoundData().call();
    return {
      answer: Number(latestRoundData.answer),
      answeredInRound: Number(latestRoundData.answeredInRound),
      roundId: Number(latestRoundData.roundId),
      startedAt: Number(latestRoundData.startedAt),
      updatedAt: Number(latestRoundData.updatedAt),
    };
  } catch (error) {
    console.error("LL: getLatestRoundData -> error", error);
    throw error;
  }
};

export const getRoundData = async (contract: Contract, roundId: BigNumber) => {
  try {
    const roundData = await contract.methods
      .getRoundData(BigNumber.from(roundId))
      .call();
    return {
      answer: Number(roundData.answer),
      answeredInRound: Number(roundData.answeredInRound),
      roundId: Number(roundData.roundId),
      startedAt: Number(roundData.startedAt),
      updatedAt: Number(roundData.updatedAt),
    };
  } catch (error) {
    console.error("LL: getRoundData -> error", error);
    throw error;
  }
};

export const getLatestAnswer = async (contract: Contract) => {
  try {
    const latestAnswer = await contract.methods.latestAnswer().call();
    return Number((Number(latestAnswer) / 100000000).toFixed(PRESICION_LENGTH));
  } catch (error) {
    console.error("LL: getLatestAnswer -> error", error);
    throw error;
  }
};

export const getDescription = async (contract: Contract) => {
  try {
    const description = await contract.methods.description().call();
    return description;
  } catch (error) {
    console.error("LL: getDescription -> error", error);
    throw error;
  }
};
