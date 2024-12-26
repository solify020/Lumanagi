/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState, useRef, useContext } from "react";
import { BigNumber } from "@ethersproject/bignumber";

import Button from "../../UI/Button";
import RangeSlider from "../../common/RangeSlider";
import { ReactComponent as Down } from "../../assets/images/down.svg";
import { ReactComponent as Loader } from "../../assets/images/loader.svg";
import { ReactComponent as Back } from "../../assets/images/back.svg";
import upSideSvg from "../../assets/images/UpSide.svg";
import downSideSvg from "../../assets/images/DownSide.svg";
import Tick from "../../assets/images/Tick.gif";

import { MetmaskContext } from "../../contexts/MetmaskContextProvider";
import {
  getMaticValue,
  getGweiValue,
  getPercentValue,
} from "../../utils/index";
import { PRESICION_LENGTH } from "../../constants/common";
import { useWeb3React } from "@web3-react/core";

interface LiveCardHeader {
  loading: boolean;
  epoch: number;
}

const Header = ({ loading, epoch }: LiveCardHeader) => {
  return (
    <>
      <div className="flex justify-between px-4 py-2 bg-[#06076E]  rounded-tl-3xl rounded-tr-3xl">
        <div className="text-2xl text-white uppercase">next</div>
        {loading ? (
          <div className="flex items-center justify-center text-black">
            <Loader className="w-12 h-12 mr-3 -ml-1 text-white animate-spin" />
          </div>
        ) : (
          <div className="text-2xl text-white font-poppins">#{epoch}</div>
        )}
      </div>

      <div className="w-full h-4 bg-opacity-50 "></div>
    </>
  );
};

const Body = ({
  loading,
  totalAmount,
  upPerc,
  downPerc,
  betBullHandler,
  betBearHandler,
  disableUpDown,
  userRound,
}: {
  loading: boolean;
  totalAmount: number;
  upPerc: number;
  downPerc: number;
  betBullHandler: Function;
  betBearHandler: Function;
  disableUpDown: boolean;
  userRound: any;
}) => {
  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-8 mx-1 h-80">
          <Loader className="w-12 h-12 mr-3 -ml-1 text-white animate-spin" />
        </div>
      ) : (
        <div className="py-8 mx-1">
          <div
            className="flex flex-col items-center justify-center py-4 text-sm text-white bg-no-repeat"
            style={{
              backgroundImage: `url(${upSideSvg})`,
              backgroundSize: "90% 120%",
              backgroundPositionX: "15px",
              backgroundPositionY: "-1px",
            }}
          >
            <div className="text-xs font-medium uppercase">up</div>
            <div className="text-xs opacity-70"> {upPerc}x Payout</div>
          </div>

          {userRound ? (
            <div className="space-y-2 h-48 border-[#3D8DFF] border-[1px] border-solid p-2 mx-2 rounded-lg text-white ">
              <div className="flex flex-col items-center justify-center h-full text-sm">
                <img src={Tick} alt="tick" className="h-32 opacity-70" />
                <div className="flex items-center justify-center gap-1 text-xxs">
                  YOU HAVE ENTERED:
                  <div className="bg-[#596CC4] rounded-lg px-2 py-1">
                    <div className="flex items-center justify-between gap-1 font-bold text-xxs ">
                      <Down
                        className={userRound.amount < 0 ? "rotate-180" : ""}
                      />
                      MATIC {Number(userRound.amount).toFixed(PRESICION_LENGTH)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-1 text-xxs">
                  PRIZE POOL TOTAL:
                  <div className="flex items-center justify-between gap-1 font-bold text-xxs ">
                    MATIC {Number(totalAmount).toFixed(PRESICION_LENGTH)}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div
              className={`space-y-2 h-48 border-[#3D8DFF] border-[1px] border-solid p-2 mx-2 rounded-lg text-white ${
                disableUpDown ? "opacity-40" : ""
              }`}
            >
              <div className="flex justify-between mb-4 text-xs font-bold">
                <div>Prize Pool</div>
                <div className="text-xs font-bold">
                  MATIC {Number(totalAmount).toFixed(PRESICION_LENGTH)}
                </div>
              </div>
              <Button
                size={"sm"}
                label="Enter Up"
                color={"success"}
                customStyle="!w-full !py-3 !text-xs !font-bold"
                onClick={betBullHandler}
                disabled={disableUpDown}
              />
              <Button
                size={"sm"}
                label="Enter Down"
                color={"danger"}
                customStyle="!w-full !py-3 !mb-8 !text-xs !font-bold"
                onClick={betBearHandler}
                disabled={disableUpDown}
              />
            </div>
          )}
          <div
            className="flex flex-col items-center justify-center py-4 text-sm text-white rotate-180 bg-no-repeat"
            style={{
              backgroundImage: `url(${downSideSvg})`,
              backgroundSize: "90% 120%",
              backgroundPositionX: "15px",
            }}
          >
            <div className="text-xs font-medium uppercase rotate-180">down</div>
            <div className="text-xs rotate-180 opacity-70">
              {downPerc}x Payout
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const FlipCardBack = ({
  innerRef,
  direction,
  setDirection,
  setShowBack,
  betBearHandler,
  betBullHandler,
  disabled,
}: {
  innerRef: any;
  direction: string;
  setDirection: Function;
  setShowBack: Function;
  betBearHandler: Function;
  betBullHandler: Function;
  disabled: boolean;
}) => {
  const flipCard = () => {
    if (innerRef && innerRef.current) {
      innerRef.current.style.transform = "rotateY(0deg)";
      setShowBack(false);
    }
  };
  const [rangeValue, setRangeValue] = useState("0");
  const [inputVal, setInputVal] = useState<number | string>("");

  const percentages = [10, 25, 50, 75, 100];
  //TODO here
  const { balance, getBalance, setBalance } = useContext(MetmaskContext);

  useEffect(() => {
    (async () => {
      setBalance(await getBalance());
    })();
  }, []);

  useEffect(() => {
    if (balance) {
      setInputVal(
        getMaticValue(
          getPercentValue(BigNumber.from(balance), Number(rangeValue))
        )
      );
    }
  }, [rangeValue]);

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    // TODO here

    if (!disabled) {
      const formatedInput = getGweiValue(inputVal);
      if (direction === "UP") {
        betBullHandler(formatedInput);
      } else {
        betBearHandler(formatedInput);
      }
      flipCard();
    }
  };
  const balanceStr =
    typeof balance === "string"
      ? balance
      : getMaticValue(balance || BigNumber.from(0));

  return (
    <div className="flip-card-back rounded-3xl bg-[#283573] border-slate-600 border-[1px] backdrop-blur-lg w-full">
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center px-3 py-2 text-xl w-100">
          <Back
            onClick={flipCard}
            height="20"
            width="30"
            className="rotate-180"
          />
          <div className="text-red-500">Set Position</div>

          {direction === "UP" ? (
            <div
              className="float-right px-2 ml-auto bg-[#84FF90] bg-opacity-30 rounded text-sm flex justify-between items-center gap-1 cursor-pointer"
              onClick={() => setDirection("DOWN")}
            >
              UP
              <Down />
            </div>
          ) : (
            <div
              className="float-right px-2 ml-auto bg-[#C3C3C3] bg-opacity-30 rounded text-sm flex justify-between items-center gap-1 cursor-pointer"
              onClick={() => setDirection("UP")}
            >
              DOWN
              <Down className="rotate-180" />
            </div>
          )}
        </div>
        <div
          className="bg-[#fd073a80] rounded-tr-3xl h-4 rounded-br-3xl transition-width   transition-slowest ease duration-500"
          style={{ width: "100%" }}
        ></div>
        <div className="mt-4 h-4/5">
          <div
            className={`flex px-4 py-2 w-100 ${disabled ? "opacity-50" : ""}`}
          >
            Commit:
          </div>
          <div className={`flex flex-col ${disabled ? "opacity-50" : ""}`}>
            <div className="flex px-4 py-2 w-100">
              <input
                type="number"
                className="block w-full px-3 py-3 m-0 text-base font-normal text-gray-700 transition ease-in-out bg-white border border-gray-300 border-solid rounded-2xl form-control bg-clip-padding focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                id="amount"
                placeholder="Enter Amount"
                max={Number(balanceStr)}
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                required
                disabled={disabled}
              />
            </div>
            <div className="px-4 py-2 text-xs text-right w-100">
              Balance : <span>{balanceStr}</span>
            </div>
            <div className="py-2 mx-4">
              <RangeSlider value={rangeValue} setValue={setRangeValue} />
            </div>
            <div className="flex justify-between gap-1 px-4 py-2 w-100 ">
              {percentages.map((percentage) => (
                <button
                  className="flex px-3 text-xs transition duration-300 bg-[#FF073A] rounded-full align-center w-max text-white ease py-1"
                  onClick={() => setRangeValue(percentage.toString())}
                  type="button"
                  disabled={disabled}
                  key={percentage}
                >
                  {percentage}%
                </button>
              ))}
            </div>
          </div>

          <div className="flex flex-col px-4 mt-10 w-100">
            <Button
              label={disabled ? "Connect Wallet" : "Predict"}
              customStyle="mb-2"
              type="submit"
            />
            <div className="text-xs">
              You won't be able to remove or change your position once you enter
              it.
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export function Live({
  betBearHandler,
  betBullHandler,
  loading = false,
  epoch,
  disableUpDown = false,
  userRounds,
  totalAmount,
  totalAmountDisplay,
  bullAmount,
  bearAmount,
}: {
  betBearHandler: Function;
  betBullHandler: Function;
  loading: boolean;
  epoch: number;
  disableUpDown: boolean;
  userRounds: any[];
  totalAmount: number;
  totalAmountDisplay: number;
  bullAmount: number;
  bearAmount: number;
}) {
  const { account } = useWeb3React();
  const innerRef = useRef<HTMLDivElement>(null);

  const [direction, setDirection] = useState("UP");
  const [showBack, setShowBack] = useState(false);
  const [disabledBack, setDisabledBack] = useState(false);

  let downPerc = 0;
  let upPerc = 0;
  let total = totalAmount || 0;

  if (total > 0) {
    downPerc = bearAmount === 0 ? bearAmount : total / bearAmount;
    upPerc = bullAmount === 0 ? bullAmount : total / bullAmount;
  }

  const betBullClickHandler = () => {
    if (innerRef && innerRef.current) {
      innerRef.current.style.transform = "rotateY(180deg)";
      setDirection("UP");
      setShowBack(true);
      if (!window.ethereum || !account) {
        setDisabledBack(true);
      }
    }
  };
  const betBearClickHandler = () => {
    if (innerRef && innerRef.current) {
      innerRef.current.style.transform = "rotateY(180deg)";
      setDirection("DOWN");
      setShowBack(true);
      if (!window.ethereum || !account) {
        setDisabledBack(true);
      }
    }
  };

  useEffect(() => {
    if (disabledBack && account) {
      setDisabledBack(false);
    }
  }, [account]);

  return (
    <div className="h-full flip-card">
      <div className="flip-card-inner" ref={innerRef}>
        <div className="flip-card-front rounded-3xl bg-[#283573] border-slate-600 border-[1px] backdrop-blur-lg w-full">
          <Header loading={loading} epoch={epoch} />
          <Body
            totalAmount={totalAmountDisplay}
            userRound={userRounds[epoch]}
            disableUpDown={disableUpDown || !!userRounds[epoch]}
            loading={loading}
            betBearHandler={betBearClickHandler}
            betBullHandler={betBullClickHandler}
            upPerc={upPerc}
            downPerc={downPerc}
          />
        </div>
        {showBack && (
          <FlipCardBack
            innerRef={innerRef}
            direction={direction}
            setDirection={setDirection}
            setShowBack={setShowBack}
            betBearHandler={betBearHandler}
            betBullHandler={betBullHandler}
            disabled={disabledBack}
          />
        )}
      </div>
    </div>
  );
}

export default Live;
