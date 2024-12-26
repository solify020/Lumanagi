import { useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { parseEther } from "ethers/lib/utils";

import { useNativeBalance } from "../../../../hooks/useNativeBalance";
import { parseBigNumberToFloat } from "../../../../utils/formatters";
import AddressInput from "../../AddressInput";

const styles = {
  buttonTransfer: {
    display: "flex",
    margin: "15px 0",
  },
} as const;

const TransferEth: React.FC = () => {
  const { account, provider } = useWeb3React();
  const { enqueueSnackbar } = useSnackbar();
  const balance = useNativeBalance(provider, account);
  const [amount, setAmount] = useState<number | null>();
  const [receiver, setReceiver] = useState<string>();

  function handleSignMessage(event: { preventDefault: () => void }): void {
    event.preventDefault();

    if (!provider || !account) {
      window.alert("Wallet not connected");
      return;
    }

    async function transfer(amt: number): Promise<void> {
      const amtStrg = amt.toString();
      const tx = {
        to: receiver,
        value: parseEther(amtStrg),
      };

      if (provider) {
        try {
          const receipt = await provider.getSigner(account).sendTransaction(tx);
          enqueueSnackbar(`Success!\n\nTx Hash: ${receipt.hash}`, {
            variant: "success",
          });
        } catch (error) {
          if (typeof error === "string") {
            enqueueSnackbar(`Error! \n\n${error}`, {
              variant: "error",
            });
          } else if (error instanceof Error) {
            enqueueSnackbar(`Error! \n\n${error.message}`, {
              variant: "error",
            });
          }
        }
      }
    }

    if (amount) transfer(amount);
  }

  return (
    <div style={{ width: "40%", minWidth: "250px" }}>
      <AddressInput onChange={setReceiver} address={receiver} />
      <div style={{ display: "inline-flex", gap: "10px", width: "100%" }}>
        <TextField
          type={"number"}
          value={amount}
          onChange={(e) => setAmount(parseFloat(e.target.value))}
          placeholder="Amount to transfer"
          inputProps={{
            min: 0,
            max: balance ? parseBigNumberToFloat(balance) : 0,
          }}
          style={{ width: "100%", height: "80%", marginBlock: "auto" }}
        />

        <div style={styles.buttonTransfer}>
          <Button variant="contained" onClick={handleSignMessage}>
            Transfer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TransferEth;
