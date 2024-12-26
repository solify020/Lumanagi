import React, { Fragment, useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";

import user, { StatsTimelines } from "../../__mocks__/StrangerProfile";

import { ReactComponent as Verified } from "../../assets/images/verified.svg";
import { ReactComponent as StatsUp } from "../../assets/images/profile-stats-up.svg";
import { ReactComponent as StatsDown } from "../../assets/images/profile-stats-down.svg";
import { ReactComponent as SettingsIcon } from "../../assets/images/Setting.svg";
import { useNavigate } from "react-router";
// import Banner1 from "../../assets/images/stranger-profile-banner1.svg";
// import { ReactComponent as Banner2 } from "../../assets/images/stranger-profile-banner2.svg";

type Stats = {
  time: string;
  type: string;
  isActive: boolean;
};

const BannerSection = () => {
  const navigate = useNavigate();

  const handleEditProfile = () => {
    navigate("/edit-profile");
  };

  return (
    <>
      <div className="relative mb-14">
        <div className="flex">
          <div className={"h-[200px] w-[450px]"}>
            <img
              className="h-[200px] w-[450px]"
              src="/banner1.png"
            />
          </div>
          <div className={"h-[200px] w-[200px]"}>
            <img
              className="h-[200px] w-[200px]"
              src="/banner2.svg"
            />
          </div>
        </div>
        <div className="absolute top-[150px] left-[40px]">
          <img
            src="/default-profile.png"
            className="w-[100px] h-[100px] rounded-full border-[#000] border-[4px]"
          />
        </div>
        <div className="absolute top-2 left-2 cursor-pointer">
          <SettingsIcon onClick={handleEditProfile} />
        </div>
      </div>
    </>
  );
};

const UserIntro = () => {
  const { user } = useAuth();

  return (
    <>
      <div className="flex gap-2 items-center">
        <p className="font-roboto text-xl leading-normal font-medium text-white">
          {`${user?.firstName} ${user?.lastName}`}
        </p>
        {!user?.isVerified && <Verified />}
      </div>
      <p className="my-2 text-white inline-flex justify-center items-center rounded-lg bg-indigo-700 px-3 font-inter text-sm">
        {user?.username}
      </p>
      <p className="my-2 text-white font-heebo text-md">{user?.intro}</p>
    </>
  );
};

const UserStatsAction = () => {
  const [stats, setStats] = useState<Stats[]>([]);

  useEffect(() => {
    setStats(
      StatsTimelines.map((state, index) => {
        return { ...state, isActive: index === 0 };
      })
    );
  }, [StatsTimelines]);

  const handleSetActive = (index: number) => {
    setStats(
      stats.map((state, stateIndex) => {
        return { ...state, isActive: index === stateIndex };
      })
    );
  };

  return (
    <>
      <div className="my-4">
        <div className="grid grid-cols-6 gap-4 items-center">
          <div className="col-start-1 col-end-2">
            <span className="text-white font-inter text-2xl font-medium">
              Stats
            </span>
          </div>
          <div className="text-white col-end-4 col-span-2 flex gap-2">
            {stats.map((state, stateIndex) => (
              <Fragment key={`stats-timeline-${stateIndex}`}>
                <p
                  onClick={() => handleSetActive(stateIndex)}
                  className={`cursor-pointer font-inter text-md rounded-lg px-4 w-fit ${
                    state.isActive
                      ? "bg-indigo-700 text-white"
                      : "bg-white text-[#8E8E93]"
                  } hover:bg-indigo-700 hover:text-white`}
                >
                  {state.time === state.type
                    ? state.time
                    : `${state.time} ${state.type}`}
                </p>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const UserStatsData = () => {
  const valueDownStyles = {
    total: "text-[#FF3B30] font-inter text-lg not-italic font-bold",
    value: "text-red-600 font-inter text-lg not-italic font-[300]",
  };
  const valueUpStyles = {
    total: "text-[#34C759] font-inter text-lg not-italic font-bold",
    value: "text-green-600 font-inter text-lg not-italic font-[300]",
  };
  return (
    <>
      {user.stats.map((stats, index) => (
        <Fragment key={`stats-data-${index}`}>
          <div className="items-center my-8 grid grid-cols-4 gap-4">
            <div className="col-span-1 border-l-2 pl-6">
              <p className="text-white font-inter text-lg font-medium">
                {stats.type}
              </p>
              <div>
                <span
                  className={
                    +stats.value < 0
                      ? valueDownStyles.total
                      : valueUpStyles.total
                  }
                >
                  {stats.total}
                </span>
                <span className="mx-2 text-white">|</span>
                <span
                  className={
                    +stats.value < 0
                      ? valueDownStyles.value
                      : valueUpStyles.value
                  }
                >
                  {stats.value}%
                </span>
              </div>
            </div>
            <div className="flex justify-end grid-row-3 col-span-1">
              {+stats.value < 0 ? <StatsDown /> : <StatsUp />}
            </div>
          </div>
        </Fragment>
      ))}
    </>
  );
};

const Profile = () => {
  return (
    <>
      <div className="px-20">
        <BannerSection />
        <UserIntro />
        <UserStatsAction />
        <UserStatsData />
      </div>
    </>
  );
};

export default Profile;
