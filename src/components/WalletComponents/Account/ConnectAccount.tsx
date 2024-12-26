import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { SxProps } from "@mui/material";

import { metaMask } from "../../../connectors/metaMask";
import { walletConnect } from "../../../connectors/walletConnect";
import { coinbaseWallet } from "../../../connectors/coinbaseWallet";
import { getEllipsisTxt } from "../../../utils/formatters";
import ConnectModal from "./ConnectModal";
import DisconnectModal from "./DisconnectModal";
import MotionButton from "../../../UI/MotionButton";

const BUTTON_STYLE: SxProps = {
  background: "transparent",
  border: "1px solid #FF49C1",
  borderRadius: 35,
  color: "#fff",
  fontFamily: "montserrat-medium",
  fontWeight: 700,
  textShadow: "0px 0px 4px rgba(0, 0, 0, 0.25)",
  px: 2,
  "&:hover": {
    background: "#000",
    border: "1px solid #FF49C1",
  },
};

interface WantedChain {
  chain?: number;
}

const ConnectAccount: React.FC<WantedChain> = () => {
  const { account } = useWeb3React();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const [selectedWallet, setSelectedWallet] = useState<
    "MetaMask" | "WalletConnect" | "Coinbase Wallet" | null
  >(null);

  const disconnect = async () => {
    const connectorMapping = {
      MetaMask: metaMask,
      WalletConnect: walletConnect,
      "Coinbase Wallet": coinbaseWallet,
    };

    if (selectedWallet) {
      const connector: any = connectorMapping[selectedWallet];
      handleClose();
      setIsAuthModalOpen(false);
      localStorage.removeItem("connectorId");
      if (connector.deactivate) {
        connector.deactivate();
      } else {
        connector.resetState();
      }
      if (connector && connector.close) {
        await connector.close();
      }
    }
  };
  const open = Boolean(anchorEl);

  const id = open ? "simple-popover" : undefined;
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      {account === undefined ? (
        <>
          <MotionButton
            color="secondary"
            customStyles={BUTTON_STYLE}
            label="Wallet Connect"
            startIcon={<AccountBalanceWalletIcon />}
            onClick={() => setIsAuthModalOpen(true)}
          />
          <ConnectModal
            isModalOpen={isAuthModalOpen}
            setIsModalOpen={setIsAuthModalOpen}
            setSelectedWallet={setSelectedWallet}
          />

          <br />
        </>
      ) : (
        <>
          <MotionButton
            color="secondary"
            customStyles={BUTTON_STYLE}
            startIcon={
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15.8827 9.73046V10.5664C15.8827 10.7921 15.7071 10.976 15.4731 10.9843H14.2526C13.8096 10.9843 13.4084 10.6583 13.3749 10.2237C13.3498 9.96452 13.4501 9.7221 13.6173 9.55492C13.7678 9.39609 13.9768 9.3125 14.2025 9.3125H15.4647C15.7071 9.32086 15.8827 9.50476 15.8827 9.73046Z"
                  fill="white"
                />
                <path
                  d="M12.9902 8.93621C12.5722 9.34581 12.3716 9.95603 12.5388 10.5913C12.7561 11.3687 13.5168 11.8619 14.3193 11.8619H15.0465C15.5063 11.8619 15.8824 12.2381 15.8824 12.6978V12.8567C15.8824 14.587 14.4697 15.9997 12.7394 15.9997H3.14306C1.4127 15.9997 0 14.587 0 12.8567V7.23093C0 6.20277 0.493192 5.29162 1.25388 4.7232C1.78051 4.32196 2.43252 4.08789 3.14306 4.08789H12.7394C14.4697 4.08789 15.8824 5.50059 15.8824 7.23093V7.59873C15.8824 8.05849 15.5063 8.43465 15.0465 8.43465H14.1939C13.7258 8.43465 13.2995 8.61856 12.9902 8.93621Z"
                  fill="white"
                />
                <path
                  d="M11.4936 2.35729C11.7193 2.58299 11.527 2.93408 11.2094 2.93408L4.78952 2.92572C4.42172 2.92572 4.22946 2.47432 4.49695 2.21519L5.85114 0.852638C6.99637 -0.284213 8.85211 -0.284213 9.99732 0.852638L11.4602 2.33221C11.4685 2.34057 11.4853 2.34893 11.4936 2.35729Z"
                  fill="white"
                />
              </svg>
            }
            fullWidth
            onClick={(e: any) => {
              setAnchorEl(e.currentTarget);
            }}
            label={getEllipsisTxt(account, 6)}
          />

          {id && (
            <DisconnectModal
              isModalOpen={open}
              handleClose={handleClose}
              disconnect={disconnect}
              anchorEl={anchorEl}
              id={id}
            />
          )}
        </>
      )}
    </>
  );
};

export default ConnectAccount;
