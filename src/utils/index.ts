import { BigNumber } from "ethers";
import { parseUnits, formatEther } from "ethers/lib/utils";
export const convertEpochToDate = (utcSeconds: number) => {
  const date = new Date(0);
  date.setUTCSeconds(utcSeconds);
  return date;
};

export const getSecondsDiffrence = (startDate: Date, endDate: Date) => {
  return Math.floor((endDate.getTime() - startDate.getTime()) / 1000);
};

export const getMaticValue = (amount: BigNumber) =>
  formatEther(amount.toString());

export const getGweiValue = (amount: any) => {
  return parseUnits(amount);
};

export const getPercentValue = (amount: BigNumber, percent: number) =>
  amount.mul(percent).div(100);

export const getValueFromPercentage = (
  amount: BigNumber,
  numberVal: number
) => {
  return amount.div(100 * numberVal);
};
