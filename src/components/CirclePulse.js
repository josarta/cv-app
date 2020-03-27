import React from "react";



const CirclePulse = ({ color, pulseColor , r }) => {
  return (
    <>
      <g transform="translate(-50, -50)">
        <svg height="100px" width="100px">
          <circle
            style={{ stroke: pulseColor }}
            className="circle-pulse"
            cx="50%"
            cy="50%"
            r={r}
            fill={color}
          />
          <circle
            style={{ stroke: pulseColor }}
            className="circle-pulse pulse"
            cx="50%"
            cy="50%"
            r="25px"
          />
        </svg>
      </g>
    </>
  );
};

export default CirclePulse;