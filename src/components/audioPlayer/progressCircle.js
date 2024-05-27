import React, {useState} from "react";
import "./progressCircle.css";
import Controls from './controls.js';

const Circle = ({ color, percentage, size, strokeWidth, isPlaying }) => {
  const radius = size / 2 - 10;
  const circ = 2 * Math.PI * radius - 20;
  const strokePct = ((100 - Math.round(percentage)) * circ) / 100;

  return (
    <circle
      r={radius}
      cx="50%"
      cy="50%"
      fill="transparent"
      stroke={strokePct !== circ ? color : ""}
      strokeWidth={strokeWidth}
      strokeDasharray={circ}
      strokeDashoffset={isPlaying ? (percentage ? strokePct : 0) : circ}
      strokeLinecap="round"
    ></circle>
  );
};

export default function ProgressCircle({
  percentage,
  isPlaying,
  setIsPlaying,
  size,
  color,
  image,
}) {

  const togglePlayState = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="progress-circle flex" onClick={togglePlayState} >
      <svg width={size} height={size}>
        <g>
          <Circle strokeWidth={"0.4rem"} color="#3B4F73" size={size} isPlaying={isPlaying} />
          <Circle
            strokeWidth={"0.6rem"}
            color={color}
            percentage={percentage}
            size={size}
            isPlaying={isPlaying}
          />
        </g>
        <defs>
          <clipPath id="myCircle">
            <circle cx="50%" cy="50%" r={size / 2 - 30} fill="#FFFFFF" />
          </clipPath>
          <clipPath id="myInnerCircle">
            <circle cx="50%" cy="50%" r={size / 2 - 100} fill="#FFFFFF" />
          </clipPath>
        </defs>
        <image
          className={isPlaying ? "active" : ""}
          x={30}
          y={30}
          width={2 * (size / 2 - 30)}
          height={2 * (size / 2 - 30)}
          href="https://pngimg.com/uploads/vinyl/vinyl_PNG107.png"
          clipPath="url(#myCircle)"
        />
        <image
          className={isPlaying ? "active" : ""}
          x={100}
          y={100}
          width={2 * (size / 2 - 100)}
          height={2 * (size / 2 - 100)}
          href={image}
          clipPath="url(#myInnerCircle)"
        />
      </svg>
    </div>
  );
}
