import React, { useEffect } from "react";
import { useRef } from "react";
export default function RangeSlider({
  value,
  setValue,
}: {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
}) {
  const bubbleRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (bubbleRef && bubbleRef.current) {
      if (value.length === 1) {
        bubbleRef.current.style.left = `${Number(value)}%`;
      } else if (value.length === 2) {
        bubbleRef.current.style.left = `${Number(value) - 6}%`;
      } else {
        bubbleRef.current.style.left = `${Number(value) - 14}%`;
      }
    }
  });
  return (
    <div className="relative w-full mb-3 slider-parent w-100">
      <input
        className="w-full"
        type="range"
        min="1"
        max="100"
        value={value}
        onChange={({
          target: { value: radius },
        }: {
          target: { value: string };
        }) => {
          setValue(radius);
        }}
      />
      <div className="absolute w-full mt-1 text-xs " ref={bubbleRef}>
        <span className="p-2 mt-1 bg-black rounded-full opacity-70">
          {value}%
        </span>
      </div>
    </div>
  );
}
