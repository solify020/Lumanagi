import { parseEther } from "ethers/lib/utils";

export const sendTransaction = async (
  provider: any,
  to: string,
  amt: number | undefined,
  data: any,
  account: string
) => {
  const tx = {
    to,
    value: amt ? parseEther(amt.toString()) : undefined,
    data,
  };
  if (provider) {
    try {
      const receipt = await provider.getSigner(account).sendTransaction(tx);

      return receipt.hash;
    } catch (error: any) {
      if (error.code) {
        throw error.code;
      }
      if (typeof error === "string") {
        throw error;
      } else if (error instanceof Error) {
        throw error.message;
      }
    }
  }
};
