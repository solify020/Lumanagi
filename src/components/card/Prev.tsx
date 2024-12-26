import { useMemo } from "react";

import { MAX_TIMER_IN_MINUTES, PRESICION_LENGTH } from "../../constants/common";
import { ReactComponent as Down } from "../../assets/images/down.svg";
import { ReactComponent as Loader } from "../../assets/images/loader.svg";
import { ReactComponent as Claim } from "../../assets/images/Claim.svg";

import upSideSvg from "../../assets/images/UpSide.svg";
import downSideSvg from "../../assets/images/DownSide.svg";
import calculatingGif from "../../assets/images/calculating.gif";
import AnimatedNumber from "../../common/AnimatedNumber";

const Header = ({
  loading,
  epoch,
  active,
  minutes,
  seconds,
}: {
  loading: boolean;
  epoch: number;
  active: boolean;
  minutes: number;
  seconds: number;
}) => {
  const progress = useMemo(() => {
    const secondsVal = minutes > 0 ? minutes * 60 + seconds : seconds;
    return 100 - Math.round((secondsVal * 100) / (MAX_TIMER_IN_MINUTES * 60));
  }, [minutes, seconds]);

  let label = !active ? "expired" : "live";

  return (
    <>
      <div
        className={`flex justify-between px-4 py-2
        ${active ? "" : "opacity-30"}`}
      >
        <div
          className={`text-2xl ${
            active ? "text-[#FD073A]" : "text-white"
          } uppercase`}
        >
          {label}
        </div>
        {loading ? (
          <div className="flex items-center justify-center text-black">
            <Loader className="w-12 h-12 mr-3 -ml-1 text-white animate-spin" />
          </div>
        ) : (
          <div className="text-2xl text-white font-poppins">#{epoch}</div>
        )}
      </div>
      {active ? (
        <div className="bg-[#06076E] bg-opacity-50 w-full h-4">
          <div
            className="bg-[#06076E] rounded-tr-3xl h-4 rounded-br-3xl transition-width transition-slowest ease duration-500"
            style={{ width: `${progress}%` }}
          >
            &nbsp;
          </div>
        </div>
      ) : (
        <div className="bg-[#06076E] w-full h-4">&nbsp;</div>
      )}
    </>
  );
};

const Body = ({
  epoch,
  userRounds,
  loading,
  diff,
  upPerc,
  downPerc,
  active,
  postClaim,
  latestAnswer,
  closePrice,
  lockPrice,
  prevAnswer,
  calculating,
  totalAmount,
}: {
  epoch: number;
  userRounds: any;
  loading: boolean;
  diff: number;
  upPerc: number;
  downPerc: number;
  lockPrice: number;
  active: boolean;
  postClaim: Function;
  latestAnswer: number;
  prevAnswer: number;
  closePrice: number;
  calculating: boolean;
  totalAmount: number;
}) => {
  const epochPresent = userRounds[epoch];

  return (
    <>
      {loading ? (
        <div className="flex items-center justify-center py-8 mx-1 h-80">
          <Loader className="w-12 h-12 mr-3 -ml-1 text-white animate-spin" />
        </div>
      ) : (
        <div className="w-full py-8 mx-1">
          <div
            className={`flex flex-col items-center justify-center py-4 text-sm text-white bg-no-repeat w-full ${
              diff < 0 && !calculating ? "opacity-50" : ""
            }`}
            style={{
              backgroundImage: `url(${upSideSvg})`,
              backgroundSize: "90% 120%",
              backgroundPositionY: "-1px",
              backgroundPositionX: "15px",
            }}
          >
            <div className="text-xs font-medium uppercase">up</div>
            <div className="text-xs opacity-70"> {upPerc}x Payout</div>
          </div>
          <div className="space-y-4 h-48 border-[#3D8DFF] border-[1px] border-solid p-2 mx-2 !mt-0 rounded-lg text-white ">
            {calculating && active ? (
              <div className="flex flex-col items-center justify-center w-full h-full">
                <img src={calculatingGif} alt="calculating" className="h-40" />
                <div>Calclulating...</div>
              </div>
            ) : (
              <>
                <div className="flex w-100">
                  <div
                    className={`text-xs font-bold  ${
                      active ? "opacity-90" : "opacity-30"
                    }`}
                  >
                    Last Price
                  </div>
                </div>
                <div className={`${active ? "" : "opacity-30"}`}>
                  <div className="flex items-center justify-between text-xl font-bold">
                    <div className="flex text-xl font-semibold font-poppins">
                      $
                      {active ? (
                        <AnimatedNumber
                          n={latestAnswer ? latestAnswer : 0}
                          from={prevAnswer}
                          decimals={PRESICION_LENGTH}
                        />
                      ) : (
                        closePrice
                      )}
                    </div>
                    <div className="bg-[#596CC4] rounded-lg px-4 py-2">
                      <div className="flex items-center justify-between gap-1 text-xs font-bold ">
                        <Down className={`${diff < 0 ? "rotate-180" : ""}`} />$
                        {diff.toFixed(PRESICION_LENGTH)}
                      </div>
                    </div>
                  </div>
                  <div className="flex !mt-6 justify-between opacity-70 text-xs font-medium">
                    <div>Locked Price</div>
                    <div>${lockPrice}</div>
                  </div>
                  <div className="flex !mt-6 justify-between font-bold text-xs">
                    <div>Prize Pool</div>
                    <div>
                      MATIC {Number(totalAmount).toFixed(PRESICION_LENGTH)}
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            className={`flex flex-col items-center justify-center py-4 text-sm text-white bg-no-repeat rotate-180 ${
              diff > 0 && !calculating ? "opacity-50" : ""
            }`}
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
          {epochPresent && epochPresent.claimable && !epochPresent.claimed && (
            <Claim
              className="absolute cursor-pointer"
              style={{ top: "379px", left: "10px" }}
              onClick={() => postClaim(epoch)}
            />
          )}
        </div>
      )}
    </>
  );
};
export function Prev({
  active = false,
  minutes = 0,
  seconds = 0,
  epoch,
  latestAnswer,
  closePrice,
  prevClosePrice,
  totalAmount,
  loading,
  bearAmount,
  bullAmount,
  postClaim,
  userRounds,
  lockPrice,
  calculating,
  prevAnswer,
  totalAmountDisplay,
}: {
  latestAnswer: number;
  totalAmount: number;
  closePrice: number;
  prevClosePrice: number;
  active: boolean;
  minutes: number;
  seconds: number;
  epoch: number;
  loading: boolean;
  bearAmount: number;
  bullAmount: number;
  lockPrice: number;
  postClaim: Function;
  userRounds: any;
  calculating: boolean;
  prevAnswer: number;
  totalAmountDisplay: number;
}) {
  let diff = 0;
  let downPerc = 0;
  let upPerc = 0;
  let total = totalAmount || 0;
  if (!loading) {
    const price: number = (active ? latestAnswer : closePrice) as number;
    diff = price - prevClosePrice;
  }

  if (total > 0) {
    downPerc = bearAmount === 0 ? bearAmount : total / bearAmount;
    upPerc = bullAmount === 0 ? bullAmount : total / bullAmount;
  }

  return (
    <div className="h-full flip-card">
      <div className="flip-card-inner ">
        <div className="flip-card-front rounded-3xl bg-[#283573] border-slate-600 border-[1px] backdrop-blur-lg w-full">
          <Header
            loading={loading}
            epoch={epoch}
            active={active}
            minutes={minutes}
            seconds={seconds}
          />
          <Body
            epoch={epoch}
            active={active}
            upPerc={upPerc}
            downPerc={downPerc}
            diff={diff}
            userRounds={userRounds}
            loading={loading}
            postClaim={postClaim}
            closePrice={closePrice}
            lockPrice={lockPrice}
            latestAnswer={latestAnswer}
            prevAnswer={prevAnswer}
            calculating={calculating}
            totalAmount={totalAmountDisplay}
          />
        </div>
      </div>
    </div>
  );
}

export default Prev;
