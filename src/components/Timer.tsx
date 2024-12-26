/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useCallback, useMemo } from "react";

interface TimerType {
  seconds: number | null;
  minutes: number | null;
  setSeconds: any;
  setMinutes: any;
  setDisableUpDown: any;
  setCalculating: any;
}

const Timer = ({
  seconds,
  minutes,
  setSeconds = () => {},
  setMinutes = () => {},
  setDisableUpDown,
  setCalculating,
}: TimerType) => {
  const setTimer = useCallback(() => {
    if (typeof minutes === "number" && typeof seconds === "number") {
      const _seconds = seconds === 0 ? 59 : seconds - 1;
      setSeconds(_seconds);
      if (seconds === 0) {
        const _minutes = minutes - 1;
        setMinutes(_minutes);
        setSeconds(_minutes >= 0 ? 59 : 0);
      }
    }
  }, [seconds, minutes, setSeconds, setMinutes]);

  useEffect(() => {
    let timeoutObject: any;
    if (typeof minutes === "number" && typeof seconds === "number") {
      if (minutes >= 0) {
        timeoutObject = setTimeout(() => setTimer(), 1000);
      }
      if (seconds === 5 && minutes <= 0) {
        setDisableUpDown(true);
      }
      if (seconds === 0 && minutes === 0) {
        setSeconds(null);
        setMinutes(null);
        setCalculating(true);
      }
    }

    return () => {
      clearTimeout(timeoutObject);
    };
  }, [seconds, minutes]);

  const displayTimer = useMemo(() => {
    if (typeof minutes === "number" && typeof seconds === "number") {
      const _minutes = minutes > 0 ? minutes : 0;
      return `${_minutes >= 10 ? _minutes : `0${_minutes}`}:${
        seconds >= 10 ? seconds : `0${seconds}`
      }`;
    }
    return "Calculating";
  }, [seconds, minutes]);

  return (
    <div className="flex justify-end">
      <div className="bg-[#259da814] border-slate-600 border-solid border-[1px] rounded-xl text-white flex py-4 px-8 justify-center items-center">
        <div className="text-2xl font-semibold">{displayTimer}</div>
      </div>
    </div>
  );
};

export default Timer;
