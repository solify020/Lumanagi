import React from "react";
import Button from "../../UI/Button";
import { ReactComponent as Loader } from "../../assets/images/loader.svg";
import upSideSvg from "../../assets/images/UpSide.svg";
import downSideSvg from "../../assets/images/DownSide.svg";
import { PRESICION_LENGTH } from "../../constants/common";

interface LiveCardHeader {
  loading: boolean;
  epoch: number;
}

const Header = ({ loading, epoch }: LiveCardHeader) => {
  return (
    <>
      <div className="flex justify-between px-4 py-2 bg-[#06076E] bg-opacity-50 rounded-tl-3xl rounded-tr-3xl opacity-50">
        <div className="text-2xl text-white uppercase">Later</div>
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

const Body = ({ loading }: { loading: boolean }) => {
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
            }}
          >
            <div className="text-xs font-medium uppercase">up</div>
            <div className="text-xs opacity-70"> 0x Payout</div>
          </div>

          <div className="space-y-2 h-48 border-[#3D8DFF] border-[1px] border-solid p-2 mx-2 rounded-lg text-white opacity-50">
            <div className="flex justify-between mb-4 text-xs font-bold">
              <div>Prize Pool</div>
              <div className="text-xs font-bold">
                MATIC {Number(0).toFixed(PRESICION_LENGTH)}
              </div>
            </div>
            <Button
              size={"sm"}
              label="Enter Up"
              color={"success"}
              customStyle="!w-full !py-3 !text-xs !font-bold"
              disabled={true}
            />
            <Button
              size={"sm"}
              label="Enter Down"
              color={"danger"}
              customStyle="!w-full !py-3 !mb-8 !text-xs !font-bold"
              disabled={true}
            />
          </div>
          <div
            className="flex flex-col items-center justify-center py-4 text-sm text-white rotate-180 bg-no-repeat "
            style={{
              backgroundImage: `url(${downSideSvg})`,
              backgroundSize: "90% 120%",
              backgroundPositionX: "15px",
            }}
          >
            <div className="text-xs font-medium uppercase rotate-180">down</div>
            <div className="text-xs rotate-180 opacity-70">0x Payout</div>
          </div>
        </div>
      )}
    </>
  );
};

export function Next({
  loading = false,
  epoch,
}: {
  loading: boolean;
  epoch: number;
}) {
  return (
    <div className="h-full flip-card">
      <div className="flip-card-inner ">
        <div className="flip-card-front rounded-3xl bg-[#283573] border-slate-600 border-[1px] backdrop-blur-lg w-full">
          <Header loading={loading} epoch={epoch} />
          <Body loading={loading} />
        </div>
      </div>
    </div>
  );
}

export default Next;
