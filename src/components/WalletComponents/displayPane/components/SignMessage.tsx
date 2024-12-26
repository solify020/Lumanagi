import { MouseEvent, ReactElement, SetStateAction, useState } from "react";

import { useWeb3React } from "@web3-react/core";
import { useSnackbar } from "notistack";
import Input from "@mui/material/Input";
import Button from "@mui/material/Button";

const styles = {
  buttonSign: {
    margin: "15px auto",
  },
} as const;

const SignMessage: React.FC = (): ReactElement => {
  const { account, provider, chainId } = useWeb3React();
  const [messageAuth, setMessageAuth] = useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const handleMessageChange = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setMessageAuth(e.target.value);
  };

  function handleSignMessage(event: MouseEvent<HTMLButtonElement>): void {
    event.preventDefault();

    if (!provider || !account) {
      window.alert("Wallet not connected");
      return;
    }

    const domain = {
      // Give a user friendly name to the specific contract you are signing for
      name: "Motion",
      // Just let's you know the latest version.
      version: "1",
      // Define the chain
      chainId: chainId,
      // Add verifying contract to make sure you are establishing contracts with the proper entity
      verifyingContract: `${process.env.REACT_APP_VERIFYING_CONTRACT}`,
    };

    const types = {
      Message: [{ name: "Title", type: "string" }],
    };

    async function signMessage(account: string): Promise<void> {
      const authMessage =
        messageAuth.length > 0
          ? { Title: `${messageAuth}` }
          : { Title: "Hello Web3!" };
      if (provider) {
        try {
          const signature = await provider
            .getSigner(account)
            ._signTypedData(domain, types, authMessage);
          enqueueSnackbar(`Success!\n\n${signature}`, {
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

    signMessage(account);
  }

  return (
    <div style={{ width: "40%", minWidth: "250px" }}>
      <Input
        value={messageAuth}
        onChange={handleMessageChange}
        type="textarea"
        placeholder="Input message to sign"
      />
      <Button
        variant="contained"
        style={styles.buttonSign}
        onClick={handleSignMessage}
      >
        Sign Message
      </Button>
    </div>
  );
};

export default SignMessage;
