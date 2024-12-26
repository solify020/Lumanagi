import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

import { coinbaseWallet } from "../../connectors/coinbaseWallet";
import { metaMask } from "../../connectors/metaMask";
import { walletConnect } from "../../connectors/walletConnect";

import Metamask from "../../assets/wallet/Metamask.svg";
import Phantom from "../../assets/wallet/Phantom.svg";
import Coinbase from "../../assets/wallet/Coinbase.svg";
import WalletConnect from "../../assets/wallet/WalletConnect.svg";
import { SxProps } from "@mui/material";

interface ConnectModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedWallet: React.Dispatch<
    React.SetStateAction<"MetaMask" | "WalletConnect" | "Coinbase" | null>
  >;
}
const ConnectWallet: React.FC<ConnectModalProps> = ({
  isModalOpen,
  setIsModalOpen,
  setSelectedWallet,
}) => {
  const activateConnector = async (label: string) => {
    switch (label) {
      case "MetaMask":
        await metaMask.activate();
        setSelectedWallet(label);
        window.localStorage.setItem("connectorId", "injected");
        break;

      case "WalletConnect":
        await walletConnect.activate();
        setSelectedWallet(label);
        window.localStorage.setItem("connectorId", "wallet_connect");
        break;

      case "Coinbase":
        await coinbaseWallet.activate();
        setSelectedWallet(label);
        window.localStorage.setItem("connectorId", "injected");

        break;

      default:
        break;
    }
  };
  const style: SxProps = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 450,
    boxShadow: 24,
  };
  return (
    <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
      <Box sx={style} className="p-6 bg-custom-gradient w-fit rounded-2xl">
        <div className="text-3xl font-semibold text-white font-poppins">
          Connect a wallet
        </div>
        <div>
          <p className="self-start text-base leading-10 text-gray-300 font-inter">
            Don't have an account?
            <a
              href="#aa"
              className="ml-1 font-semibold text-primary-900-high-emphasis"
            >
              Register here
            </a>
          </p>
          <div className="flex flex-col gap-4 mt-6">
            <button className="flex items-center w-full p-2 border border-gray-600 border-solid">
              <img src={Metamask} alt="Metamask" />
              <div
                className="px-10 text-lg font-semibold text-center text-white font-inter"
                onClick={() => activateConnector("MetaMask")}
              >
                Continue with Metamask
              </div>
            </button>
            <button className="flex items-center w-full p-2 border border-gray-600 border-solid">
              <img src={Phantom} alt="Phantom" />
              <div className="px-10 text-lg font-semibold text-center text-white font-inter">
                Continue with Phantom
              </div>
            </button>
            <button className="flex items-center w-full p-2 border border-gray-600 border-solid">
              <img src={Coinbase} alt="Coinbase" />
              <div
                className="px-10 text-lg font-semibold text-center text-white font-inter"
                onClick={() => activateConnector("Coinbase")}
              >
                Continue with Coinbase
              </div>
            </button>
            <button className="flex items-center w-full p-1 border border-gray-600 border-solid">
              <img src={WalletConnect} alt="WalletConnect" />
              <div
                className="px-10 text-lg font-semibold text-center text-white font-inter"
                onClick={() => activateConnector("WalletConnect")}
              >
                Continue with WalletConnect
              </div>
            </button>
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ConnectWallet;
