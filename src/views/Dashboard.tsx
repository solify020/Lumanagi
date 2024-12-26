/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useContext, useState, useRef } from "react";
import { BigNumber, Contract } from "ethers";
import { MetmaskContext } from "../contexts/MetmaskContextProvider";
import Timer from "../components/Timer";
import Button from "../UI/Button";
import {
  LUMANAGI_PREDICTION_V1_ADDRESS,
  PREVIOUS_ROUNDS,
  NEXT_ROUNDS,
} from "../constants/contract";
import {
  convertEpochToDate,
  getSecondsDiffrence,
  getMaticValue,
} from "../utils/index";

import {
  postBetBearAbi,
  postBetBullAbi,
  getUserRounds,
  postClaimAbi,
  getEpochDetails,
  getCurrentEpoch,
} from "../contract/functions/lumangiPredicationV1";
import {
  getLatestAnswer,
  getDescription,
} from "../contract/functions/eacAggregatorProxy";
import Prev from "../components/card/Prev";
import Live from "../components/card/Live";
import Next from "../components/card/Next";
import { ReactComponent as Back } from "../assets/images/back.svg";

import AnimatedNumber from "../common/AnimatedNumber";
import { SCROLL_AMOUNT, PRESICION_LENGTH } from "../constants/common";
import { useWeb3React } from "@web3-react/core";
import WinnerTable from "../components/winner/WinnerTable";
import WinnerCardComponent from "../components/WinnerCardComponent";
import {
  Input,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Button as Btn,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import Search from "@mui/icons-material/Search";

const Tabs = () => {
  return (
    <>
      <div className="mx-20">
        <Button
          color="default"
          label="Crypto"
          size={"sm"}
          customStyle="!text-white ml-2"
          disabled={true}
          title="Coming Soon!!"
        />
        <Button
          color="default"
          label="Stock"
          size={"sm"}
          customStyle="!text-white ml-2"
          disabled={true}
          title="Coming Soon!!"
        />
      </div>
    </>
  );
};

const Dashboard: React.FC<{}> = () => {
  const { account } = useWeb3React();
  const {
    lumanagiPredictionV1Contract,
    postTransaction,
    eacAggregatorProxyContract,
    getBalance,
    lumanagiPredictionV1ContractSocket,
  } = useContext(MetmaskContext);
  const [userRounds, setUserRounds] = useState<any>({});
  const [rounds, setRounds] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [calculating, setCalculating] = useState<boolean>(true);
  const [currentEpoch, setCurrentEpoch] = useState<number>(-1);
  const [currentEpochData, setCurrentEpochData] = useState<any>(null);
  const [disableUpDown, setDisableUpDown] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<null | number>(null);
  const [minutes, setMinutes] = useState<null | number>(null);
  const [descrition, setDescription] = useState<string>("null");
  const [oldest, setOldest] = useState<any>(null);

  const [latestAnswer, setLatestAnswer] = useState<null | number>(null);
  const [prevAnswer, setPrevAnswer] = useState<number>(0);

  const cardsContainer = useRef<HTMLDivElement>(null);

  const setDisplayData = async (selectedEpoch: number) => {
    const epochIds = [];
    const tempRounds = [];
    const prevData: any = {};
    if (rounds.length > 0) {
      rounds.forEach((round) => {
        prevData[round.epoch] = { ...round };
      });
    }
    for (let index = PREVIOUS_ROUNDS + 1; index > 0; index--) {
      tempRounds.push({
        ...(prevData[selectedEpoch - index]
          ? prevData[selectedEpoch - index]
          : {}),
        live: true,
        active: false,
        epoch: selectedEpoch - index,
      });
    }
    epochIds.push(selectedEpoch);
    tempRounds.push({
      live: true,
      active: true,
      epoch: selectedEpoch,
      ...(prevData[selectedEpoch] ? prevData[selectedEpoch] : {}),
    });
    for (let index = 1; index <= NEXT_ROUNDS; index++) {
      epochIds.push(selectedEpoch + index);
      tempRounds.push({
        live: false,
        active: index > 1 ? false : true,
        epoch: selectedEpoch + index,
      });
    }
    setRounds(tempRounds);
    const allData = await getRoundsData(tempRounds);
    setCurrentEpochData(allData[PREVIOUS_ROUNDS + 1]);
    setCurrentEpoch(selectedEpoch);
    const lockEpochDataTimpStamp = allData[PREVIOUS_ROUNDS + 1].lockTimestamp;
    const secondsData = getSecondsDiffrence(
      new Date(),
      convertEpochToDate(lockEpochDataTimpStamp)
    );
    setOldest(allData[0]);
    setRounds(allData.filter((data, index) => index !== 0));
    if (secondsData > 0) {
      setSeconds(secondsData % 60);
      setMinutes(secondsData < 60 ? 0 : Math.floor(secondsData / 60));
      setCalculating(false);
    }
    if (account) {
      const userRounds = await getUserRounds(
        lumanagiPredictionV1Contract as Contract,
        account
      );
      setUserRounds(userRounds);
    }
  };
  /**
   * Handles callback for start round event
   * @param epoch Epoch of newly started round
   */

  const startRoundCallback = async (epoch: string) => {
    const newEpoch = Number(epoch);
    setDisableUpDown(false);
    setLoading(true);
    setDisplayData(newEpoch);
    setLoading(false);
  };

  /**
   * Handles click of enter up button
   * @param amount: amount to be sent as bet
   */

  const betBearHandler = async (amount: Number) => {
    if (lumanagiPredictionV1Contract) {
      const abi = await postBetBearAbi(
        lumanagiPredictionV1Contract,
        currentEpoch
      );

      postTransaction(
        LUMANAGI_PREDICTION_V1_ADDRESS,
        abi,
        BigNumber.from(amount),
        undefined,
        () => {
          setDisableUpDown(true);
          setUserRounds({
            ...userRounds,
            [Number(currentEpoch)]: {
              claimable: false,
              claimed: false,
              amount: -getMaticValue(BigNumber.from(amount)),
            },
          });
        }
      );
    }
  };

  /**
   * Handles click of enter down button
   * @param amount: amount to be sent as bet
   */

  const betBullHandler = async (amount: Number) => {
    if (lumanagiPredictionV1Contract) {
      const abi = await postBetBullAbi(
        lumanagiPredictionV1Contract,
        currentEpoch
      );

      postTransaction(
        LUMANAGI_PREDICTION_V1_ADDRESS,
        abi,
        BigNumber.from(amount),
        undefined,
        () => {
          setDisableUpDown(true);
          setUserRounds({
            ...userRounds,
            [Number(currentEpoch)]: {
              claimable: false,
              claimed: false,
              amount: getMaticValue(BigNumber.from(amount)),
            },
          });
        }
      );
    }
  };

  /**
   * Handles claiming of the round
   * @param epoch round number to be claimed
   */

  const postClaim = async (epoch: BigNumber) => {
    if (lumanagiPredictionV1Contract) {
      const abi = await postClaimAbi(lumanagiPredictionV1Contract, [epoch]);
      postTransaction(
        LUMANAGI_PREDICTION_V1_ADDRESS,
        abi,
        undefined,
        undefined,
        () => {
          setUserRounds({
            ...userRounds,
            [Number(epoch)]: {
              claimable: true,
              claimed: true,
            },
          });
        }
      );
    }
  };

  /**
   * Gets all display round details for display
   * @param epochArray
   * @returns All display round details
   */

  const getRoundsData = (epochArray: any[]) =>
    Promise.all(
      epochArray.map(async (epochInfo: any) => {
        const epochDetails = await getEpochDetails(
          lumanagiPredictionV1Contract as Contract,
          BigNumber.from(epochInfo.epoch)
        );
        return {
          ...epochDetails,
          ...epochInfo,
        };
      })
    );

  /**
   * Gets Latest price of the currency
   */

  const getLatestPrice = async () => {
    if (eacAggregatorProxyContract) {
      const latestAnswerTemp = await getLatestAnswer(
        eacAggregatorProxyContract
      );
      setPrevAnswer(latestAnswer ? latestAnswer : 0);
      setLatestAnswer(latestAnswerTemp);
    }
  };

  /**
   * Handles betbull and betbear
   */

  const handleBetEvent = async (epoch: BigNumber) => {
    if (eacAggregatorProxyContract) {
      const epochDetails = await getEpochDetails(
        lumanagiPredictionV1Contract as Contract,
        epoch
      );
      setCurrentEpochData(epochDetails);
    }
  };

  /**
   * Intial function calls for lumangi predication contracts
   */
  useEffect(() => {
    if (lumanagiPredictionV1ContractSocket) {
      setLoading(true);
      lumanagiPredictionV1ContractSocket.events
        .StartRound()
        .on("data", function (event: any) {
          startRoundCallback(event.returnValues.epoch);
        });

      lumanagiPredictionV1ContractSocket.events
        .BetBear()
        .on("data", function (event: any) {
          handleBetEvent(event.returnValues.epoch);
        });
      lumanagiPredictionV1ContractSocket.events
        .BetBull()
        .on("data", function (event: any) {
          handleBetEvent(event.returnValues.epoch);
        });
      // lumanagiPredictionV1Contract.on("LockRound", lockRoundCallback);
      // lumanagiPredictionV1Contract.on("EndRound", endRoundCallback);
      (async () => {
        const currentEpoch = await getCurrentEpoch(
          lumanagiPredictionV1Contract
        );
        await setDisplayData(currentEpoch);
        await getBalance();

        setLoading(false);
        if (cardsContainer.current) {
          cardsContainer.current.scrollLeft =
            cardsContainer.current.offsetWidth - 750;
        }
      })();
    }
  }, [lumanagiPredictionV1ContractSocket, lumanagiPredictionV1Contract]);

  /**
   * Intial function calls for Eac contract
   */
  useEffect(() => {
    setInterval(async () => {
      getLatestPrice();
    }, 10000);
    if (eacAggregatorProxyContract) {
      (async () => {
        await getLatestPrice();
        setDescription(await getDescription(eacAggregatorProxyContract));
      })();
    }
    const element = document.getElementById("cards-data") as any;
    if (element) {
      element.addEventListener("wheel", function (e: any) {
        e.preventDefault();
        element.scrollLeft = element.scrollLeft + e.deltaY;
      });
    }
  }, [eacAggregatorProxyContract]);

  const scrollCards = (where: "left" | "right") => {
    if (cardsContainer.current) {
      if (where === "left") {
        cardsContainer.current.scrollLeft -= SCROLL_AMOUNT;
      } else {
        cardsContainer.current.scrollLeft += SCROLL_AMOUNT;
      }
    }
  };
  const [age, setAge] = React.useState("");

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
    <div className="w-full">
      <Tabs />
      <div className="flex items-center mx-20">
        <div className="justify-center w-3/5 text-center ">
          {loading ? (
            <div className="flex items-center justify-center w-48 text-white bg-[#259da822] rounded p-2 ">
              Loading...
            </div>
          ) : (
            <div className="flex items-center justify-center w-48 text-white bg-[#259da822] rounded p-2 ">
              <div className="mr-1">
                {descrition.replaceAll(" ", "").replace("/", "")}
              </div>
              <div className="text-xs">
                <AnimatedNumber
                  n={latestAnswer ? latestAnswer : 0}
                  from={prevAnswer}
                  decimals={PRESICION_LENGTH}
                />
              </div>
            </div>
          )}
        </div>

        <div className="w-2/5">
          <Timer
            seconds={seconds}
            minutes={minutes}
            setSeconds={setSeconds}
            setMinutes={setMinutes}
            setDisableUpDown={setDisableUpDown}
            setCalculating={setCalculating}
          />
        </div>
      </div>
      <div
        className="grid grid-flow-col auto-cols-[100%] grid-rows-none gap-4 mt-10  w-100 card-data sm:auto-cols-[35%] md:auto-cols-[20%] lg:auto-cols-[20%] xl:auto-cols-[20%] 2xl:auto-cols-[20%] !overflow-x-auto w-screen px-8"
        id="cards-data"
        style={{
          height: "450px",
          overflowY: "visible",
          scrollBehavior: "smooth",
        }}
        ref={cardsContainer}
      >
        {rounds.map((data, index) => {
          if (data.epoch < currentEpoch) {
            return (
              <React.Fragment key={index}>
                <Prev
                  active={data.epoch === currentEpoch - 1}
                  minutes={minutes as number}
                  seconds={seconds as number}
                  epoch={data.epoch}
                  latestAnswer={latestAnswer as number}
                  closePrice={data.closePrice}
                  prevClosePrice={
                    index > 0
                      ? rounds[index - 1]?.closePrice || latestAnswer
                      : oldest?.closePrice || latestAnswer
                  }
                  totalAmount={data.totalAmount}
                  totalAmountDisplay={data.totalAmountDisplay}
                  loading={loading}
                  bearAmount={data.bearAmount}
                  bullAmount={data.bullAmount}
                  postClaim={postClaim}
                  userRounds={userRounds}
                  lockPrice={data.lockPrice}
                  calculating={calculating}
                  prevAnswer={prevAnswer}
                />
              </React.Fragment>
            );
          } else if (data.epoch === currentEpoch) {
            return (
              <React.Fragment key={index}>
                <Live
                  epoch={data.epoch}
                  loading={loading}
                  betBearHandler={betBearHandler}
                  betBullHandler={betBullHandler}
                  bearAmount={currentEpochData.bearAmount}
                  bullAmount={currentEpochData.bullAmount}
                  disableUpDown={disableUpDown}
                  userRounds={userRounds}
                  totalAmount={currentEpochData.totalAmount}
                  totalAmountDisplay={currentEpochData.totalAmountDisplay}
                />
              </React.Fragment>
            );
          } else {
            return (
              <React.Fragment key={index}>
                <Next epoch={data.epoch} loading={loading} />
              </React.Fragment>
            );
          }
        })}
      </div>

      <div className="flex items-center mx-20 my-16">
        <div className="flex justify-center w-full gap-8">
          <Back
            className="rotate-180 cursor-pointer stroke-white fill-white"
            onClick={() => scrollCards("left")}
          />
          <Back
            className="cursor-pointer stroke-white fill-white"
            onClick={() => scrollCards("right")}
          />
        </div>
      </div>
      <div className="flex flex-col items-center w-full gap-10 mx-20 my-10">
        <div className="flex items-center justify-center w-full text-4xl text-white">
          LEADERBOARD
        </div>
        <div className="flex items-center justify-center w-full text-white">
          <div className="flex items-center w-1/2">
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value="10"
              label="Age"
              onChange={handleChange}
              sx={{
                color: "white",
                svg: {
                  fill: "white",
                },
                p: 0,
              }}
            >
              <MenuItem className="text-white" value={10}>
                Ten
              </MenuItem>
              <MenuItem value={20}>Twenty</MenuItem>
              <MenuItem value={30}>Thirty</MenuItem>
            </Select>
            <Input
              id="input-with-icon-adornment"
              startAdornment={
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              }
              endAdornment={
                <InputAdornment position="start">
                  <Btn> Abc</Btn>
                </InputAdornment>
              }
            />
          </div>
          <div className="flex items-center justify-center w-1/2"></div>
        </div>
      </div>
      <div className="flex items-center gap-10 mx-20 my-10">
        <WinnerCardComponent
          username="abc"
          imageUrl="abc"
          additionalStyles="mt-24"
        />
        <WinnerCardComponent username="abc" imageUrl="abc" />
        <WinnerCardComponent
          username="abc"
          imageUrl="abc"
          additionalStyles="mt-32"
        />
      </div>
      <div className="flex flex-col items-center mx-20">
        <WinnerTable />
      </div>
    </div>
  );
};

export default Dashboard;
