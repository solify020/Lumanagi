/* eslint-disable react-hooks/exhaustive-deps */
import {
  useState,
  createContext,
  useEffect,
  ReactNode,
  Dispatch,
  SetStateAction,
} from "react";
import Web3 from "web3";
import { ethers, BigNumber } from "ethers";

import EacAggregatorProxyContractAbi from "../contract/abi/EACAggregatorProxyAbi.json";
import LumanagiPredictionV1Abi from "../contract/abi/LumanagiPredictionV1Abi.json";

import {
  EAC_AGGREGATOR_PROXY_ADDRESS,
  LUMANAGI_PREDICTION_V1_ADDRESS,
  SELECTED_NETWORK_LINK_HTTPS,
  SELECTED_NETWORK_LINK_WSS,
} from "../constants/contract";
import { useWeb3React } from "@web3-react/core";

type MetamaskContextType = {
  errorMessage: null | string;
  setErrorMessage: Dispatch<SetStateAction<string | null>>;
  balance: null | BigNumber;
  setBalance: Dispatch<SetStateAction<BigNumber | null>>;
  eacAggregatorProxyContract: any;
  lumanagiPredictionV1Contract: any;
  postTransaction: (
    to: string,
    data: string,
    value?: number | BigNumber,
    from?: string,
    callback?: Function
  ) => void;
  getBalance: () => Promise<BigNumber>;
  lumanagiPredictionV1ContractSocket: any;
};

export const MetmaskContext = createContext<MetamaskContextType>({
  errorMessage: null,
  setErrorMessage: () => null,
  balance: null,
  setBalance: () => null,
  eacAggregatorProxyContract: null,
  lumanagiPredictionV1Contract: null,
  lumanagiPredictionV1ContractSocket: null,
  postTransaction: () => {},
  getBalance: () => Promise.resolve(BigNumber.from(0)),
});

const MetmaskContextProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<null | string>(null);
  const { provider } = useWeb3React();

  const [balance, setBalance] = useState<null | BigNumber>(null);

  const [eacAggregatorProxyContract, setEacAggregatorProxyContract] =
    useState<any>(null);
  const [lumanagiPredictionV1Contract, setLumanagiPredictionV1Contract] =
    useState<any>(null);
  const [
    lumanagiPredictionV1ContractSocket,
    setLumanagiPredictionV1ContractSocket,
  ] = useState<any>(null);

  const [signer, setSigner] = useState<any | ethers.providers.JsonRpcSigner>(
    null
  );

  /**
   * creates contract objects and assigs provider
   */

  const setContracts = async (web3: any, web3Socket: any) => {
    if (web3) {
      const eacContract = new web3.eth.Contract(
        EacAggregatorProxyContractAbi as any,
        EAC_AGGREGATOR_PROXY_ADDRESS
      );
      const lumangiContract = new web3.eth.Contract(
        LumanagiPredictionV1Abi as any,
        LUMANAGI_PREDICTION_V1_ADDRESS
      );

      const socketInstance = new web3Socket.eth.Contract(
        LumanagiPredictionV1Abi,
        LUMANAGI_PREDICTION_V1_ADDRESS
      );
      setEacAggregatorProxyContract(eacContract);
      setLumanagiPredictionV1Contract(lumangiContract);
      setLumanagiPredictionV1ContractSocket(socketInstance);
    }
  };

  // /**
  //  * Connects The webapp to metamsk
  //  */

  // const connectHandler = async () => {
  //   if (window.ethereum) {
  //     try {
  //       setSigner(provider?.getSigner());

  //       const res = await window.ethereum.request({
  //         method: "eth_requestAccounts",
  //       });
  //       if (res.length > 0) {
  //         await accountsChanged(res[0]);
  //       }
  //     } catch (err) {
  //       console.error(err);
  //       setErrorMessage("There was a problem connecting to MetaMask");
  //     }
  //   } else {
  //     setErrorMessage("Install MetaMask");
  //   }
  // };
  /**
   *
   */
  const getBalance = async () => {
    if (window.ethereum) {
      try {
        if (window.ethereum.selectedAddress) {
          const balance = (await provider?.getBalance(
            window.ethereum.selectedAddress
          )) as BigNumber;

          return balance;
        }
        return BigNumber.from(0);
      } catch (error) {
        console.error("LL: getBalance -> error", error);
        throw error;
      }
    } else {
      throw new Error("Install MetaMask");
    }
  };

  /**
   * Handles post call of contracts
   * @param to smart contract address
   * @param data encoded abi of function
   * @param value value to be sent[Optional]
   * @param from from account[Optional]
   */

  const postTransaction = async (
    to: string,
    data: string,
    value?: BigNumber | number,
    from?: string,
    callback?: Function
  ) => {
    let signerTemp = (provider as ethers.providers.Web3Provider).getSigner();
    if (!signer) {
      // connectHandler();
    }

    const fromTemp = from ? from : await signerTemp.getAddress();
    const tx = {
      from: fromTemp,
      to,
      value: value ? (value as BigNumber)._hex : undefined,
      data,
    };

    const txHash = await window.ethereum.request({
      method: "eth_sendTransaction",
      params: [tx],
    });
    if (txHash) {
      if (callback) {
        callback(txHash);
      }
    }
  };

  useEffect(() => {
    const web3 = new Web3(
      new Web3.providers.HttpProvider(
        `${SELECTED_NETWORK_LINK_HTTPS}${process.env.REACT_APP_ALCHEMY_API_KEY}`
      )
    );
    const socketWeb3 = new Web3(
      new Web3.providers.WebsocketProvider(
        `${SELECTED_NETWORK_LINK_WSS}${process.env.REACT_APP_ALCHEMY_API_KEY}`
      )
    );
    setContracts(web3, socketWeb3);

    // if (window.ethereum) {
    //   window.ethereum.on("accountsChanged", accountsChanged);
    //   window.ethereum.on("chainChanged", chainChanged);
    //   window.ethereum.on("disconnect", chainChanged);
    //   const provider = new ethers.providers.Web3Provider(window.ethereum);
    //   //set Web3Provider
    //   setProvider(provider);
    //   if (window.ethereum.selectedAddress) {
    //     setAccount(window.ethereum.selectedAddress);
    //     (async () => {
    //       const balace = await getBalance();
    //       setBalance(balace);
    //     })();
    //   }
    // }
    // return () => {
    //   setProvider(null);
    //   setEacAggregatorProxyContract(null);
    // };
  }, []);

  return (
    <MetmaskContext.Provider
      value={{
        errorMessage,
        setErrorMessage,
        balance,
        setBalance,
        // connectHandler,
        eacAggregatorProxyContract,
        lumanagiPredictionV1Contract,
        postTransaction,
        getBalance,
        lumanagiPredictionV1ContractSocket,
      }}
    >
      {children}
    </MetmaskContext.Provider>
  );
};

export default MetmaskContextProvider;
