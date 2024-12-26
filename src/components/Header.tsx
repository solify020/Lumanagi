import React, { useContext, useEffect, useState } from "react";

import LumangiLogo from "../assets/images/LumangiLogo.svg";
import RewardWheel from "../assets/images/RewardWheel.svg";

import Button from "../UI/Button";
import { useWeb3React } from "@web3-react/core";
import ConnectWallet from "./auth/ConnectWallet";
import { AuthContext, ActionTypes } from "../contexts/AuthContext";
// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   // width: 400,
//   p: 4,
// };

export function Header() {
  const { updateAuthAction, isAuthenticated } = useContext(AuthContext);
  const { account } = useWeb3React();

  const handleLogin = () => {
    updateAuthAction(ActionTypes.Login);
  }; //TODO
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);

  const [selectedWallet, setSelectedWallet] = useState<
    "MetaMask" | "WalletConnect" | "Coinbase" | null
  >(null);
  useEffect(() => {
    if (account && selectedWallet) {
      setIsAuthModalOpen(false);
    }
  }, [account, selectedWallet]);

  return (
    <>
      <div className="flex items-center justify-between w-screen px-20 mt-5 mb-10">
        <div className="flex items-center">
          <div
            className="rounded-lg"
            style={{
              background: "linear-gradient(135deg, #414593 0%, #00022E 100%)",
              backgroundBlendMode: "hard-light",
            }}
          >
            {isAuthenticated && (
              <div className="flex h-full px-4 py-1">
                <img src={RewardWheel} alt="RewardWheel" className="" />

                <div className="self-end mx-2 text-xl text-white">
                  Bright Mba
                </div>
                <div className="px-1 text-xs text-white bg-[#5856D6] rounded-full h-fit">
                  Beginner
                </div>
              </div>
            )}
            <div className="w-full h-1 rounded-full bg-neutral-200 dark:bg-neutral-600">
              <div
                className="h-1 bg-[#FF073A] rounded-full "
                style={{ width: "45%" }}
              ></div>
            </div>
          </div>
          {isAuthenticated && (
            <div className="flex items-center justify-end px-2 py-1 ml-40 bg-white rounded-lg h-fit">
              <img src={RewardWheel} alt="RewardWheel" className="w-10 h-10" />
              <div className="flex flex-col w-full text-xs">
                <div>Next Roll:</div>
                <div>8h 13m 22s</div>
              </div>
            </div>
          )}
        </div>
        <div className="flex items-center self-center justify-self-center">
          <a className="w-full h-full" href="https://lumanagi.com">
            <img
              src={LumangiLogo}
              alt="logo"
              className="max-w-full ml-4 w-60 "
            />
          </a>
        </div>
        <div className="flex self-center justify-end space-x-4 justify-self-end ">
          {!isAuthenticated && (
            <Button
              color="default"
              onClick={handleLogin}
              label="Register/Login"
              customStyle="!text-white border-white border border-opacity-50"
              title="Coming Soon!!"
            />
          )}
          <Button
            onClick={() => setIsAuthModalOpen(true)}
            label={!!account ? account : "Connect Wallet"}
            color="dangerText"
            disabled={!!account}
            customStyle=" w-40 text-ellipsis overflow-hidden whitespace-nowrap "
            title={account ? account : ""}
          />
          <ConnectWallet
            isModalOpen={isAuthModalOpen}
            setIsModalOpen={setIsAuthModalOpen}
            setSelectedWallet={setSelectedWallet}
          />
        </div>
      </div>
    </>
  );
}

export default Header;
